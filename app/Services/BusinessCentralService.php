<?php

namespace App\Services;

use App\Models\BusinessCentralSyncLog;
use App\Models\Order;
use App\Models\PrimeHubShop;
use App\Models\ProductHistory;
use App\Models\Unit;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Http;

class BusinessCentralService
{
    public function __construct( private ProductService $productService )
    {
        // ...
    }

    public function enabled(): bool
    {
        return (bool) config( 'services.business_central.enabled' );
    }

    public function syncSalesInvoice( Order $order, PrimeHubShop $shop ): BusinessCentralSyncLog
    {
        $order->loadMissing( 'products.product', 'customer' );

        $payload = $this->salesInvoicePayload( $order, $shop );
        $log = $this->createLog( $order, 'outbound', 'sales_invoice', $payload, $order->code );

        try {
            $invoice = $this->request()->post( $this->apiUrl( 'salesInvoices' ), $payload[ 'header' ] )->throw()->json();
            $invoiceId = $invoice[ 'id' ] ?? null;

            foreach ( $payload[ 'lines' ] as $line ) {
                $this->request()
                    ->post( $this->apiUrl( sprintf( 'salesInvoices(%s)/salesInvoiceLines', $invoiceId ) ), $line )
                    ->throw();
            }

            if ( config( 'services.business_central.auto_post_sales_invoices', true ) && $invoiceId ) {
                $this->request()
                    ->post( $this->apiUrl( sprintf( 'salesInvoices(%s)/Microsoft.NAV.post', $invoiceId ) ), [] )
                    ->throw();
            }

            $log->update( [
                'status' => BusinessCentralSyncLog::STATUS_SUCCESS,
                'response' => $invoice,
                'synced_at' => now(),
            ] );
        } catch ( Exception $exception ) {
            $log->update( [
                'status' => BusinessCentralSyncLog::STATUS_FAILED,
                'error' => $exception->getMessage(),
            ] );
        }

        return $log;
    }

    public function importTransferOrder( PrimeHubShop $shop, ?string $orderNumber = null ): BusinessCentralSyncLog
    {
        $path = config( 'services.business_central.transfer_orders_path' );

        if ( blank( $path ) ) {
            throw new Exception( 'BC_TRANSFER_ORDERS_PATH is not configured.' );
        }

        $path = str_replace(
            [ '{location}', '{shop}', '{order}' ],
            [ $shop->business_central_location_code, $shop->code, $orderNumber ],
            $path
        );

        $response = $this->request()->get( $this->absoluteOrApiUrl( $path ) )->throw()->json();
        $lines = collect( $response[ 'value' ] ?? $response[ 'lines' ] ?? $response[ 'transferOrderLines' ] ?? [] );
        $payload = [
            'shop' => $shop->only( [ 'code', 'business_central_location_code' ] ),
            'order' => $orderNumber,
            'lines' => $lines->values()->all(),
        ];
        $log = $this->createLog( $shop, 'inbound', 'transfer_order', $payload, $orderNumber );

        try {
            $imported = $lines->map( function ( array $line ) {
                $sku = $line[ 'itemNo' ] ?? $line[ 'itemNumber' ] ?? $line[ 'number' ] ?? $line[ 'no' ] ?? null;
                $quantity = (float) ( $line[ 'quantity' ] ?? $line[ 'quantityToReceive' ] ?? 0 );

                if ( blank( $sku ) || $quantity <= 0 ) {
                    return null;
                }

                $product = $this->productService->getProductUsingSKUOrFail( $sku );
                $unit = $this->resolveUnit( $line, $product->unit_group );

                $history = $this->productService->stockAdjustment( ProductHistory::ACTION_TRANSFER_IN, [
                    'unit_id' => $unit->id,
                    'product_id' => $product->id,
                    'unit_price' => (float) ( $line[ 'unitCost' ] ?? $line[ 'directUnitCost' ] ?? 0 ),
                    'quantity' => $quantity,
                    'total_price' => (float) ( $line[ 'amount' ] ?? 0 ),
                    'description' => 'Business Central transfer order import',
                ] );

                return [
                    'sku' => $sku,
                    'quantity' => $quantity,
                    'history_id' => $history?->id,
                ];
            } )->filter()->values();

            $log->update( [
                'status' => BusinessCentralSyncLog::STATUS_SUCCESS,
                'response' => [ 'imported' => $imported->all() ],
                'synced_at' => now(),
            ] );
        } catch ( Exception $exception ) {
            $log->update( [
                'status' => BusinessCentralSyncLog::STATUS_FAILED,
                'error' => $exception->getMessage(),
            ] );
        }

        return $log;
    }

    private function salesInvoicePayload( Order $order, PrimeHubShop $shop ): array
    {
        return [
            'header' => array_filter( [
                'customerNumber' => $shop->business_central_default_customer_no,
                'externalDocumentNumber' => $order->code,
                'postingDate' => Carbon::parse( $order->created_at ?: now() )->format( 'Y-m-d' ),
                'salespersonCode' => $shop->business_central_salesperson_code,
                'locationCode' => $shop->business_central_location_code,
            ] ),
            'lines' => $order->products->map( function ( $product ) {
                return array_filter( [
                    'lineType' => 'Item',
                    'lineObjectNumber' => $product->product?->sku,
                    'description' => $product->name,
                    'quantity' => (float) $product->quantity,
                    'unitPrice' => (float) $product->unit_price,
                ] );
            } )->values()->all(),
        ];
    }

    private function resolveUnit( array $line, int $unitGroupId ): Unit
    {
        $identifier = $line[ 'unitOfMeasureCode' ] ?? $line[ 'unitCode' ] ?? null;

        if ( filled( $identifier ) ) {
            $unit = Unit::identifier( $identifier )->first();

            if ( $unit instanceof Unit ) {
                return $unit;
            }
        }

        return Unit::where( 'group_id', $unitGroupId )->where( 'base_unit', true )->firstOrFail();
    }

    private function createLog( $model, string $direction, string $operation, array $payload, ?string $externalReference ): BusinessCentralSyncLog
    {
        return BusinessCentralSyncLog::create( [
            'syncable_type' => $model::class,
            'syncable_id' => $model->id,
            'direction' => $direction,
            'operation' => $operation,
            'external_reference' => $externalReference,
            'status' => BusinessCentralSyncLog::STATUS_PENDING,
            'payload' => $payload,
            'attempted_at' => now(),
        ] );
    }

    private function request()
    {
        return Http::timeout( (int) config( 'services.business_central.timeout', 30 ) )
            ->acceptJson()
            ->withToken( $this->accessToken() );
    }

    private function accessToken(): string
    {
        $tenantId = config( 'services.business_central.tenant_id' );
        $response = Http::asForm()
            ->post( "https://login.microsoftonline.com/{$tenantId}/oauth2/v2.0/token", [
                'client_id' => config( 'services.business_central.client_id' ),
                'client_secret' => config( 'services.business_central.client_secret' ),
                'scope' => 'https://api.businesscentral.dynamics.com/.default',
                'grant_type' => 'client_credentials',
            ] )
            ->throw()
            ->json();

        return $response[ 'access_token' ];
    }

    private function apiUrl( string $path ): string
    {
        $tenantId = config( 'services.business_central.tenant_id' );
        $environment = config( 'services.business_central.environment' );
        $version = config( 'services.business_central.api_version', 'v2.0' );
        $companyId = config( 'services.business_central.company_id' );

        return "https://api.businesscentral.dynamics.com/{$version}/{$tenantId}/{$environment}/api/{$version}/companies({$companyId})/{$path}";
    }

    private function absoluteOrApiUrl( string $path ): string
    {
        if ( str_starts_with( $path, 'http://' ) || str_starts_with( $path, 'https://' ) ) {
            return $path;
        }

        return $this->apiUrl( ltrim( $path, '/' ) );
    }
}
