<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class PrimeHubCreateTokenCommand extends Command
{
    protected $signature = 'primehub:create-token {username=admin} {name=testing}';

    protected $description = 'Create a Sanctum API token for a local user.';

    public function handle()
    {
        $user = User::where( 'username', $this->argument( 'username' ) )->first();

        if ( ! $user instanceof User ) {
            $this->error( 'User not found.' );

            return self::FAILURE;
        }

        $token = $user->createToken( $this->argument( 'name' ) )->plainTextToken;

        $this->line( $token );

        return self::SUCCESS;
    }
}
