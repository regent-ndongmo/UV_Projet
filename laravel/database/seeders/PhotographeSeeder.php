<?php

namespace Database\Seeders;

use App\Models\Photographe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PhotographeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Photographe::factory(50)->create();
    }
}
