<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request){
        $this->validate($request, [
            "name" => "required",
            "email" => "required|unique:users",
            "password" => "required|confirmed",

        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),

        ]);

        return response([
            "message"=>"user successfuly register.",
            'id' => $user->id
        ], 200 );
    }
}
