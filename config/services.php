<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'domain_auth' => [
        'enabled' => env( 'DOMAIN_AUTH_ENABLED', false ),
        'url' => env( 'DOMAIN_AUTH_URL' ),
        'timeout' => env( 'DOMAIN_AUTH_TIMEOUT', 10 ),
        'domain' => env( 'DOMAIN_AUTH_DOMAIN' ),
        'default_role' => env( 'DOMAIN_AUTH_DEFAULT_ROLE', 'nexopos.store.cashier' ),
    ],

    'business_central' => [
        'enabled' => env( 'BC_ENABLED', false ),
        'tenant_id' => env( 'BC_TENANT_ID' ),
        'environment' => env( 'BC_ENVIRONMENT', 'Production' ),
        'company_id' => env( 'BC_COMPANY_ID' ),
        'client_id' => env( 'BC_CLIENT_ID' ),
        'client_secret' => env( 'BC_CLIENT_SECRET' ),
        'api_version' => env( 'BC_API_VERSION', 'v2.0' ),
        'timeout' => env( 'BC_TIMEOUT', 30 ),
        'transfer_orders_path' => env( 'BC_TRANSFER_ORDERS_PATH' ),
        'auto_post_sales_invoices' => env( 'BC_AUTO_POST_SALES_INVOICES', true ),
    ],

    'mailgun' => [
        'domain' => env( 'MAILGUN_DOMAIN' ),
        'secret' => env( 'MAILGUN_SECRET' ),
        'endpoint' => env( 'MAILGUN_ENDPOINT', 'api.mailgun.net' ),
    ],

    'postmark' => [
        'token' => env( 'POSTMARK_TOKEN' ),
    ],

    'ses' => [
        'key' => env( 'AWS_ACCESS_KEY_ID' ),
        'secret' => env( 'AWS_SECRET_ACCESS_KEY' ),
        'region' => env( 'AWS_DEFAULT_REGION', 'us-east-1' ),
    ],

];
