<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validation des données entrées par l'utilisateur
            $this->validate($request, [
                "name" => "required",
                "email" => "required|email|unique:users",
                "password" => "required|confirmed",
            ]);

            // Création d'un nouvel utilisateur
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Réponse JSON en cas de succès
            return response()->json([
                "message" => "Utilisateur enregistré avec succès.",
                'id' => $user->id
            ], 200);

        } catch (ValidationException $e) {
            // Gestion des erreurs de validation
            return response()->json([
                "message" => "Erreur de validation.",
                'errors' => $e->validator->errors(),
            ], 400);

        } catch (\Exception $e) {
            // Gestion des autres erreurs
            return response()->json([
                "message" => "Une erreur est survenue lors de l'inscription de l'utilisateur.",
                "error" => $e->getMessage(),
            ], 500);
        }
    }
}

