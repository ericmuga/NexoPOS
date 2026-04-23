<?php

use App\Http\Controllers\Integrations\BusinessCentralController;
use Illuminate\Support\Facades\Route;

Route::prefix( 'integrations' )->group( function () {
    Route::post( 'business-central/transfer-orders/pull', [ BusinessCentralController::class, 'pullTransferOrder' ] );
} );
