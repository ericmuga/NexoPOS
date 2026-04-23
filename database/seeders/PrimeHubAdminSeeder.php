<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PrimeHubAdminSeeder extends Seeder
{
    public function run()
    {
        $user = User::firstOrNew( [ 'username' => 'primehubadmin' ] );
        $user->email = 'primehubadmin@example.com';
        $user->password = Hash::make( 'password' );
        $user->active = true;
        $user->author = $user->author ?: 1;
        $user->save();

        if ( ! $user->attribute ) {
            $user->attribute()->create( [ 'language' => 'en' ] );
        }

        if ( Role::namespace( Role::ADMIN ) instanceof Role ) {
            $user->assignRole( Role::ADMIN );
        }
    }
}
