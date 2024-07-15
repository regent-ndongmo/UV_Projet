<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TempUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        // Validate user input
        $this->validate($request, [
            "name" => "required",
            "email" => "required|email|unique:users|unique:temp_users",
            "password" => "required|confirmed",
        ]);

        // Generate random verification code
        $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Create a new temp user record
        $tempUser = TempUser::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_code' => $verificationCode,
            'verification_code_expires_at' => Carbon::now()->addMinute(),
        ]);

        // Check if temp user was created successfully
        if (!$tempUser) {
            return response()->json(['message' => 'Failed to create user'], 500);
        }

        // Send verification code via email
        $this->sendVerificationCode($tempUser);

        return response()->json([
            "message" => "User registered successfully. A verification code has been sent to your email.",
            'id' => $tempUser->id,
            'email' => $tempUser->email,
        ], 200);
    }

    protected function sendVerificationCode($user)
    {
        $to_email = $user->email;
        $verificationCode = $user->verification_code;

        Mail::send('emails.verify', ['verificationCode' => $verificationCode], function ($message) use ($to_email) {
            $message->to($to_email)->subject('Verification Code');
        });
    }

    public function verify(Request $request)
    {
        // Validate user input
        $this->validate($request, [
            'verification_code' => 'required|digits:6',
        ]);

        // Find temp user by verification code
        $tempUser = TempUser::where('verification_code', $request->verification_code)->first();

        if (!$tempUser || $tempUser->verification_code_expires_at < Carbon::now()) {
            return response()->json(['message' => 'Invalid or expired verification code'], 400);
        }

        // Create a new user record
        $user = User::create([
            'name' => $tempUser->name,
            'email' => $tempUser->email,
            'password' => $tempUser->password,
        ]);

        // Check if user was created successfully
        if (!$user) {
            return response()->json(['message' => 'Failed to create user'], 500);
        }

        // Delete the temp user record
        $tempUser->delete();
        return response()->json([
            'message' => 'Your email has been verified successfully',
            'user_id'=>$user->id,
            'user'=>$user
        ], 200);


    }

    public function resendVerification(Request $request)
    {
        // Validate user input
        $this->validate($request, [
            'email' => 'required|email',
        ]);

        // Find temp user by email
        $tempUser = TempUser::where('email', $request->email)->first();

        if (!$tempUser) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Generate a new verification code
        $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // Update temp user's verification code and expiration time
        $tempUser->verification_code = $verificationCode;
        $tempUser->verification_code_expires_at = Carbon::now()->addMinute();
        $tempUser->save();

        // Resend verification code via email
        $this->sendVerificationCode($tempUser);

        return response()->json(['message' => 'Verification code has been resent to your email'], 200);
    }
}


// {
//     "name": "John Doe",
//     "email": "johndoe@example.com",
//     "password": "password",
//     "password_confirmation": "password"
// }


// {
//     "verification_code": "123456"
// }


// {
//     "email": "johndoe@example.com"
// }
