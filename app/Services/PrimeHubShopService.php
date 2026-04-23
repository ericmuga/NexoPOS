<?php

namespace App\Services;

use App\Models\PrimeHubShop;
use Illuminate\Http\Request;

class PrimeHubShopService
{
    public function current( ?Request $request = null ): ?PrimeHubShop
    {
        $request = $request ?: request();
        $domain = $request?->getHost();

        if ( $domain ) {
            $shop = PrimeHubShop::active()->where( 'domain', $domain )->first();

            if ( $shop instanceof PrimeHubShop ) {
                return $shop;
            }
        }

        return PrimeHubShop::active()->where( 'is_default', true )->first()
            ?: PrimeHubShop::active()->first();
    }
}
