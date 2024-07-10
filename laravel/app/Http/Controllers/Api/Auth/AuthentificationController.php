<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthentificationController extends Controller
{
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
        // return "Login";
        $this->validate($request, [
            'email' => 'required|max:255',
            'password' => 'required|max:8',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Invalid login credentials'], 401);
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
}
