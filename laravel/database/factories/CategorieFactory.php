<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categorie>
 */
class CategorieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ["Evenement", "mariage", "portrait", "dote"];
        return [
            //"categorie" => $categories[array_rand($categories)],
            //"categorie" => array_rand(["Evenement", "mariage", "portrait", "dote"], 1)
        ];
    }
}
