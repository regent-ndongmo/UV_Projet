<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthentificationController extends Controller
{
    public function login(Request $request)
    {
        // Définition des messages d'erreur personnalisés
        $messages = [
            'required' => 'Le champ :attribute est obligatoire.',
            'max' => 'Le champ :attribute ne peut pas dépasser :max caractères.',
        ];

        // Validation des données entrées par l'utilisateur avec les messages personnalisés
        $this->validate($request, [
            'email' => 'required|max:255',
            'password' => 'required|max:8',
        ], $messages);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            // Retourner une réponse JSON pour une authentification invalide
            return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }

        /**
         * @var User $user
         */
        $user = Auth::user();
        $tokenResult = $user->createToken('LaravelPassportToken');
        $token = $tokenResult->accessToken;

        // Retourner les informations de l'utilisateur et le token d'accès
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'token' => $token,
        ], 200);
    }
}
