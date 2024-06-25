<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthentificationController extends Controller
{
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
