<?php

namespace App\Listeners;

use App\Events\OrderAfterCreatedEvent;
use App\Jobs\SyncOrderToBusinessCentralJob;
use App\Models\Order;

class SyncOrderToBusinessCentralListener
{
    public function handle( OrderAfterCreatedEvent $event )
    {
        if ( $event->order->payment_status === Order::PAYMENT_PAID ) {
            SyncOrderToBusinessCentralJob::dispatch( $event->order->id );
        }
    }
}
