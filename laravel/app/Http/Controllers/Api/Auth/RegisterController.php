<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Définition des messages d'erreur personnalisés
            $messages = [
                'required' => 'Le champ :attribute est obligatoire.',
                'email' => 'Le champ :attribute doit être une adresse email valide.',
                'unique' => 'Le champ :attribute existe déjà dans notre base de données.',
                'confirmed' => 'Le champ :attribute doit être confirmé.'
            ];

            // Validation des données entrées par l'utilisateur avec les messages personnalisés
            $validator = Validator::make($request->all(), [
                "name" => "required",
                "email" => "required|email|unique:users",
                "password" => "required|confirmed",
            ], $messages);

            // Vérification des erreurs de validation
            if ($validator->fails()) {
                return response()->json([
                    "message" => "Erreur de validation.",
                    'errors' => $validator->errors(),
                ], 400);
            }

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



// {
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "password": "ffffffff",
//     "password_confirmation": "ffffffff"
// }