# Prime Hub Integration Notes

## Local Access

- URL: `http://127.0.0.1:8000/sign-in`
- Admin login: `admin` / `password`
- Seeded fallback login: `primehubadmin` / `password`

## Domain Authentication

The existing sign-in form now falls back to the configured domain authentication service when local username/password authentication fails.

Required `.env` values:

```dotenv
DOMAIN_AUTH_ENABLED=true
DOMAIN_AUTH_URL=https://your-node-service.example.com/auth
DOMAIN_AUTH_DOMAIN=your-domain
DOMAIN_AUTH_DEFAULT_ROLE=nexopos.store.cashier
```

Expected request to the Node service:

```json
{
  "username": "emuga",
  "password": "secret",
  "domain": "your-domain"
}
```

Accepted successful response fields are flexible. Any of these booleans may be returned: `authenticated`, `success`, `valid`, or `ok`. User profile fields may be returned at the top level or under `user` / `data`.

## Shops

Shop-specific Business Central values are stored in `prime_hub_shops`:

- `code`
- `domain`
- `business_central_location_code`
- `business_central_default_customer_no`
- `business_central_salesperson_code`

The default seeded shop code is `MAIN`.

## Business Central

Required `.env` values:

```dotenv
BC_ENABLED=true
BC_TENANT_ID=
BC_ENVIRONMENT=Production
BC_COMPANY_ID=
BC_CLIENT_ID=
BC_CLIENT_SECRET=
BC_API_VERSION=v2.0
BC_DEFAULT_LOCATION_CODE=MAIN
BC_DEFAULT_CUSTOMER_NO=CASH
BC_DEFAULT_SALESPERSON_CODE=POS
BC_TRANSFER_ORDERS_PATH=transferOrders?$filter=transfer-to-code eq '{location}'
```

Paid POS orders dispatch `SyncOrderToBusinessCentralJob`, which creates and optionally posts a Business Central sales invoice. Sync attempts are recorded in `business_central_sync_logs`.

Transfer orders can be pulled into local inventory with:

```http
POST /api/integrations/business-central/transfer-orders/pull
Authorization: Bearer <token>
Content-Type: application/json

{
  "shop_code": "MAIN",
  "order_number": "TO-0001"
}
```

Create a local testing token with:

```bash
php artisan primehub:create-token admin testing
```
