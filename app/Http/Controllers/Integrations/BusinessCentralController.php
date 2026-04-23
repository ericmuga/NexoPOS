<?php

namespace App\Http\Controllers\Integrations;

use App\Http\Controllers\Controller;
use App\Exceptions\NotAllowedException;
use App\Models\PrimeHubShop;
use App\Services\BusinessCentralService;
use App\Services\PrimeHubShopService;
use Illuminate\Http\Request;

class BusinessCentralController extends Controller
{
    public function pullTransferOrder(
        Request $request,
        BusinessCentralService $businessCentralService,
        PrimeHubShopService $shopService
    ) {
        if ( ! $businessCentralService->enabled() ) {
            throw new NotAllowedException( __( 'Business Central integration is disabled.' ) );
        }

        $shop = $request->input( 'shop_code' )
            ? PrimeHubShop::where( 'code', $request->input( 'shop_code' ) )->firstOrFail()
            : $shopService->current( $request );

        $log = $businessCentralService->importTransferOrder(
            $shop,
            $request->input( 'order_number' )
        );

        return [
            'status' => $log->status,
            'message' => __( 'Business Central transfer order import has completed.' ),
            'data' => [
                'log' => $log,
            ],
        ];
    }
}
