<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Photographe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Avoir>
 */
class AvoirFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'categorie_id' => Categorie::factory(), // Génère une catégorie aléatoire
            'photographe_id' => Photographe::factory(), // Génère un photographe aléatoire
        ];
    }
}
