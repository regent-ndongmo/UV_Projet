<?php

namespace App\Http\Controllers\Api\Auth;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthentificationController extends Controller
{
    public function login(Request $request)
    {
       // Validation des données entrées par l'utilisateur
       $validatedData = $request->validate([
        'email' => 'required|email|max:255',
        'password' => 'required|string|max:255',
    ], [
        'email.required' => 'L\'adresse email est obligatoire.',
        'email.email' => 'L\'adresse email doit être valide.',
        'email.max' => 'L\'adresse email ne peut pas dépasser :max caractères.',
        'password.required' => 'Le mot de passe est obligatoire.',
        'password.string' => 'Le mot de passe doit être une chaîne de caractères.',
        'password.max' => 'Le mot de passe ne peut pas dépasser :max caractères.',
    ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Invalid login credentials'], 401);
        }
        // return "Bonsoir";

        /**
         * @var User $user
         */
        $user = Auth::user();
        $tokenResult = $user->createToken('LaravelPassportToken');
        $token = $tokenResult->accessToken;

        return response([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
            'token' => $token,
        ], 200);
    }


    public function logout(Request $request)
    {
        // Récupération de l'utilisateur actuellement authentifié
        $user = $request->user();

        // Révocation de tous les jetons d'accès de l'utilisateur
        $user->tokens()->delete();

        // Retourner une réponse JSON indiquant que l'utilisateur a été déconnecté avec succès
        return response()->json(['message' => 'Déconnexion réussie'], 200);
    }
}
