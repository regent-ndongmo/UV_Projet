<?php

namespace Database\Factories;

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
            "nom" => $this->faker->lastName(),
            "ville" => $this->faker->city(),
            "pays" => $this->faker->country(),
            "numero" => $this->faker->phoneNumber(),
            "photo" => $this->faker->imageUrl(),
            "email" => $this->faker->email(),
            "description" => $this->faker->text(),
            "password" => $this->faker->password(),


        ];
    }
}
