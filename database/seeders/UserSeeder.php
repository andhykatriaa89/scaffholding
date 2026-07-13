<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Rina Kusuma',
            'username' => 'admin',
            'email' => 'admin@sucootscaform.com',
            'password' => Hash::make('admin123'),
            'role' => 'Admin',
        ]);

        User::create([
            'name' => 'Dedi Firmansyah',
            'username' => 'staff',
            'email' => 'staff@sucootscaform.com',
            'password' => Hash::make('staff123'),
            'role' => 'Staff Gudang',
        ]);
    }
}
