<?php

namespace App\Jobs;

use App\Models\Order;
use App\Services\BusinessCentralService;
use App\Services\PrimeHubShopService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SyncOrderToBusinessCentralJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct( public int $orderId )
    {
        // ...
    }

    public function uniqueId(): string
    {
        return (string) $this->orderId;
    }

    public function handle( BusinessCentralService $businessCentralService, PrimeHubShopService $shopService )
    {
        if ( ! $businessCentralService->enabled() ) {
            return;
        }

        $order = Order::with( 'products.product', 'customer' )->find( $this->orderId );
        $shop = $shopService->current();

        if ( $order instanceof Order && $shop ) {
            $businessCentralService->syncSalesInvoice( $order, $shop );
        }
    }
}
