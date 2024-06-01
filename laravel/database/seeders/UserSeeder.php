<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => "admin",
            'email' => "admin@gmail.com",
            'password' => bcrypt('regent'),
        ]);

        $user = User::factory()->count(10)->create();

    }
}
