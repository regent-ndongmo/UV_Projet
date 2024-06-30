<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('valid_time_format', function ($attribute, $value, $parameters, $validator) {
            // Vérifiez si $value est un format de temps valide (HH:MM:SS par exemple)
            return preg_match('/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/', $value);
        });

        Validator::replacer('valid_time_format', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, 'Le champ :attribute doit être au format HH:MM:SS.');
        });
    }
}
