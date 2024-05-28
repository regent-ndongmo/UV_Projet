<?php

namespace Database\Seeders;

use App\Models\Avoir;
use App\Models\Categorie;
use App\Models\Photographe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvoirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Associe chaque catégorie à des photographes de manière aléatoire
        // Categorie::all()->each(function ($categorie) use ($photographes) {
        //     $categorie->photographes()->attach(
        //         $photographes->random(rand(1, 3))->pluck('id')->toArray()
        //     );
        // });
    }
}
