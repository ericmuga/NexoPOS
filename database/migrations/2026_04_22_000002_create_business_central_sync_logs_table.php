<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if ( ! Schema::hasTable( 'business_central_sync_logs' ) ) {
            Schema::create( 'business_central_sync_logs', function ( Blueprint $table ) {
                $table->id();
                $table->nullableMorphs( 'syncable' );
                $table->string( 'direction' );
                $table->string( 'operation' );
                $table->string( 'external_reference' )->nullable();
                $table->string( 'status' )->default( 'pending' );
                $table->json( 'payload' )->nullable();
                $table->json( 'response' )->nullable();
                $table->text( 'error' )->nullable();
                $table->timestamp( 'attempted_at' )->nullable();
                $table->timestamp( 'synced_at' )->nullable();
                $table->timestamps();
            } );
        }
    }

    public function down()
    {
        Schema::dropIfExists( 'business_central_sync_logs' );
    }
};
