<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if ( ! Schema::hasTable( 'prime_hub_shops' ) ) {
            Schema::create( 'prime_hub_shops', function ( Blueprint $table ) {
                $table->id();
                $table->string( 'name' );
                $table->string( 'code' )->unique();
                $table->string( 'domain' )->nullable()->unique();
                $table->string( 'business_central_location_code' )->nullable();
                $table->string( 'business_central_default_customer_no' )->nullable();
                $table->string( 'business_central_salesperson_code' )->nullable();
                $table->boolean( 'is_default' )->default( false );
                $table->boolean( 'active' )->default( true );
                $table->timestamps();
            } );
        }
    }

    public function down()
    {
        Schema::dropIfExists( 'prime_hub_shops' );
    }
};
