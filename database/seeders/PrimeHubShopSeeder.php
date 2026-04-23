<?php

namespace Database\Seeders;

use App\Models\PrimeHubShop;
use Illuminate\Database\Seeder;

class PrimeHubShopSeeder extends Seeder
{
    public function run()
    {
        PrimeHubShop::updateOrCreate(
            [ 'code' => 'MAIN' ],
            [
                'name' => 'Default Shop',
                'domain' => null,
                'business_central_location_code' => env( 'BC_DEFAULT_LOCATION_CODE', 'MAIN' ),
                'business_central_default_customer_no' => env( 'BC_DEFAULT_CUSTOMER_NO', 'CASH' ),
                'business_central_salesperson_code' => env( 'BC_DEFAULT_SALESPERSON_CODE', 'POS' ),
                'is_default' => true,
                'active' => true,
            ]
        );
    }
}
