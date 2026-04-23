<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrimeHubShop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'domain',
        'business_central_location_code',
        'business_central_default_customer_no',
        'business_central_salesperson_code',
        'is_default',
        'active',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'active' => 'boolean',
    ];

    public function scopeActive( $query )
    {
        return $query->where( 'active', true );
    }
}
