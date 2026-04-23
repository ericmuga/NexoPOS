<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessCentralSyncLog extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';

    const STATUS_SUCCESS = 'success';

    const STATUS_FAILED = 'failed';

    protected $fillable = [
        'syncable_type',
        'syncable_id',
        'direction',
        'operation',
        'external_reference',
        'status',
        'payload',
        'response',
        'error',
        'attempted_at',
        'synced_at',
    ];

    protected $casts = [
        'payload' => 'array',
        'response' => 'array',
        'attempted_at' => 'datetime',
        'synced_at' => 'datetime',
    ];

    public function syncable()
    {
        return $this->morphTo();
    }
}
