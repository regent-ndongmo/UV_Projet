<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Photo>
 */
class PhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "titre" => $this->faker->title(),
            "url_image" => $this->faker->imageUrl(),
            "nombre_likes" => $this->faker->text(),
            "photographe_id" => rand(1, 4),
            "categorie_id" => rand(1, 4),
        ];
    }
}
