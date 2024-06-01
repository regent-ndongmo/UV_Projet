<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Photographe>
 */
class PhotographeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Create a new user for each photographer
            'nom' => $this->faker->name,
            'ville' => $this->faker->city,
            'pays' => $this->faker->country,
            'numero' => $this->faker->phoneNumber,
            'photo' => $this->faker->imageUrl(),
            'signature' => $this->faker->unique()->md5,
            'description' => $this->faker->text(255),
        ];
    }
}
