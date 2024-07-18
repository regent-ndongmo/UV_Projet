<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function show($id)
    {
        $client = Client::find($id);
        if ($client) {
            return response()->json($client);
        } else {
            return response()->json(['message' => 'Client not found'], 404);
        }
    }

    public function store(Request $request)
    {
        // return $request;

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email_client' => 'required|string|email|max:255|unique:clients,email_client',
            'password_client' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Cet email existe déjà.'], 400);
        }

        $client = new Client([
            'name' => $request->name,
            'email_client' => $request->email_client,
            'password_client' =>  Hash::make($request->password_client),
        ]);

        $client->save();

        return response()->json($client, 201);
    }

    public function update(Request $request, $id)
    {
        $client = Client::find($id);
        if ($client) {
            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email_client' => 'sometimes|required|string|email|max:255|unique:clients,email_client,' . $id,
                'password_client' => 'sometimes|required|string',
            ]);

            $client->name = $request->name ?? $client->name;
            $client->email_client = $request->email_client ?? $client->email_client;
            if ($request->has('password_client')) {
                $client->password_client = bcrypt($request->password_client);
            }
            $client->save();

            return response()->json($client);
        } else {
            return response()->json(['message' => 'Client not found'], 404);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email_client' => 'required|string|email|max:255',
            'password_client' => 'required|string',
        ]);

        $client = Client::where('email_client', $request->email_client)->first();
        // return Hash::make($request->password_client);
        // return $client->password_client;
        // if (!$client || !Hash::check($request->password_client, $client->password_client)) {
        //     return response()->json(['message' => 'Mot de passe invalide'], 401);
        // }

        if (!$client) {
            // \Log::info('Client not found with email: ' . $request->email_client);
            return response()->json(['message' => 'Client non trouvé'], 404);
        }

        // Générer un token ou effectuer une autre action après une connexion réussie
        return response()->json($client);
    }
}
