<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class DomainAuthService
{
    public function enabled(): bool
    {
        return (bool) config( 'services.domain_auth.enabled' ) && filled( config( 'services.domain_auth.url' ) );
    }

    public function authenticate( string $username, string $password ): ?User
    {
        if ( ! $this->enabled() ) {
            return null;
        }

        $response = Http::timeout( (int) config( 'services.domain_auth.timeout', 10 ) )
            ->acceptJson()
            ->post( config( 'services.domain_auth.url' ), [
                'username' => $username,
                'password' => $password,
                'domain' => config( 'services.domain_auth.domain' ),
            ] );

        if ( ! $response->successful() ) {
            return null;
        }

        $body = $response->json() ?: [];

        if ( ! $this->isSuccessful( $body ) ) {
            return null;
        }

        return $this->syncUser( $username, $body );
    }

    private function isSuccessful( array $body ): bool
    {
        foreach ( [ 'authenticated', 'success', 'valid', 'ok' ] as $key ) {
            if ( array_key_exists( $key, $body ) ) {
                return filter_var( $body[ $key ], FILTER_VALIDATE_BOOLEAN );
            }
        }

        return true;
    }

    private function syncUser( string $username, array $payload ): User
    {
        $profile = $payload[ 'user' ] ?? $payload[ 'data' ] ?? $payload;
        $email = $profile[ 'email' ] ?? $profile[ 'mail' ] ?? $username . '@domain.local';
        $displayName = $profile[ 'displayName' ] ?? $profile[ 'name' ] ?? $username;
        $parts = preg_split( '/\s+/', trim( $displayName ), 2 );

        $user = User::firstOrNew( [ 'username' => $profile[ 'sAMAccountName' ] ?? $username ] );
        $user->email = $email;
        $user->first_name = $profile[ 'firstName' ] ?? $parts[0] ?? $username;
        $user->last_name = $profile[ 'lastName' ] ?? $parts[1] ?? null;
        $user->active = true;

        if ( empty( $user->password ) ) {
            $user->password = Hash::make( Str::random( 40 ) );
        }

        $user->save();

        if ( method_exists( app( UsersService::class ), 'createAttribute' ) && ! $user->attribute ) {
            app( UsersService::class )->createAttribute( $user );
        }

        $role = Role::namespace( config( 'services.domain_auth.default_role', Role::STORECASHIER ) );

        if ( $role instanceof Role ) {
            $user->assignRole( $role->namespace );
        }

        return $user;
    }
}
