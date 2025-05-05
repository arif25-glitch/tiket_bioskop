<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'username' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'role' => 1, // 1 = admin
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'user',
                'email' => 'user@example.com',
                'password' => Hash::make('user123'),
                'role' => 0, // 0 = user
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
