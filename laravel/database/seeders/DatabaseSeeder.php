<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Categorie;
use App\Models\Photo;
use App\Models\Photographe;
use Illuminate\Database\Seeder;

use function Pest\Laravel\call;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AvoirSeeder::class);
        $categorie = $this->call(CategorieSeeder::class);
        $photographes = Photographe::factory(50)->create();
        Photo::factory(50)->create();

        Categorie::all()->each(function ($categorie) use ($photographes) {
            $categorie->photographes()->attach(
                $photographes->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

    }
}
