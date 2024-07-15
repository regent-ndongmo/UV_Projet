<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthentificationController extends Controller
{
    //
    public function index(){
        $user = User::all();
        return response()->json([$user], 200);
    }
    public function updateUserRole(Request $request)
    {
        $userId = $request->input('userId');
        $newRole = $request->input('newRole');

        // Valider les entrées
        $validator = Validator::make(
            ['userId' => $userId, 'newRole' => $newRole],
            [
                'userId' => 'required|integer|exists:users,id',
                'newRole' => 'string|in:admin,photographe,bloquer', // Adapté aux rôles disponibles
            ]
        );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        try {
            $user = User::findOrFail($userId);
            $user->role = $newRole;
            $user->save();

            return response()->json(['message' => 'User role updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update user role', 'details' => $e->getMessage()], 500);
        }
    }


    public function login(Request $request)
    {

         // Vérifier d'abord si l'utilisateur est déjà authentifié
    if (Auth::check()) {
        return response(['message' => 'Vous êtes déjà connecté'], 200);
    }

        // return "Login";
        $this->validate($request, [
            'email' => 'required|max:255',
            'password' => 'required|max:8',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response(['message' => 'mot de passe ou adresse mail invalide'], 401);
        }

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


    public function forgotPassword(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
        ]);

        $email = $request->input('email');

        // Vérifier si l'utilisateur existe
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response(['message' => 'User not found'], 404);
        }

        // Générer et sauvegarder le code de réinitialisation
        //$reset_code = rand(100000000, 999999999);
        $reset_code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $user->reset_code = $reset_code;
        $user->save();

        // Envoyer le code par email
        Mail::raw("Votre code de réinitialisation est : $reset_code", function ($message) use ($email) {
            $message->to($email)->subject('Code de réinitialisation de mot de passe');
        });

        return response(['message' => 'Code de réinitialisation envoyé par email'], 200);
    }


    public function verifyResetCode(Request $request)
{
    $this->validate($request, [
        'reset_code' => 'required|digits:6',
    ]);

    $email = $request->input('email');
    $reset_code = $request->input('reset_code');

    // Vérifier si le code est correct pour cet utilisateur
    $user = User::where('reset_code', $reset_code)
                ->first();

    if (!$user) {
        return response(['message' => 'Invalid reset code'], 401);
    }

    // Vérifier si le code n'a pas expiré (dans une minute)
    $codeCreatedAt = $user->updated_at;
    $expiryTime = now()->subMinutes(1); // Définir l'expiration à 1 minute
    if ($codeCreatedAt->lt($expiryTime)) {
        return response(['message' => 'Reset code has expired. Please request a new one.'], 401);
    }
    // Code correct, retourner vers le formulaire pour changer le mot de passe
    return response(['message' => 'Code de réinitialisation valide'], 200);
}


public function resetPassword(Request $request)
{
    $this->validate($request, [
        'email' => 'required|email',
        'new_password' => 'required',
        'confirm_password' => 'required|same:new_password',
    ]);

    $email = $request->input('email');
    $new_password = $request->input('new_password');

    // Vérifier les anciens identifiants et changer le mot de passe
    $user = User::where('email', $email)->first();

    // Mettre à jour le mot de passe
    $user->password = bcrypt($new_password);
    $user->save();

    return response(['message' => 'Mot de passe mis à jour avec succès'], 200);
}


}

// forgot-password
// {

//     "email": "franclain@gmail.com"
// }
// verify-reset-code
// {
//     "email": "franclain@gmail.com",
//     "reset_code": "123456789"  // Utilisez le code réellement envoyé par email
// }
// reset-password
// {
//     "email": "franclain@gmail.com",
//     "old_password": "ancienMotDePasse",
//     "new_password": "nouveauMotDePasse",
//     "confirm_password": "nouveauMotDePasse"
// }


// {
//     "email":"franclain@gmail.com",
//     "password":"rrrrrrrr"

// }
