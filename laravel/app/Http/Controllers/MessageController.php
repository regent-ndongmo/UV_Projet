<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator ;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $message = Message::with('photographe')->orderBy('created_at', 'desc')->get();
            return response()->json($message);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error d\'affichage des messages', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'photographe_id' => 'required|exists:photographes,id',
            'nom_client' => 'required|string',
            'ville_client' => 'required|string',
            'libellé' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $message = Message::create($request->all());
            return response()->json(['message' => 'votre message a été prise en compte il sera envoyés au photographes après validation des données fournies', 'comment' => $message], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'une erreur est survenu lors de l\'ajout de votre message veuillez reessayer!', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        $validator = Validator::make($request->all(), [
            // 'nom_client' => 'nullable|string',
            // 'ville_client' => 'nullable|string',
            'libellé' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $message->update($request->all());
            return response()->json(['message' => 'la modification de votre commentaire a été prise en compte!', 'comment' => $message], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'erreur lors de la modification de votre comment veuillez ressayer!', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        try {
            $message->delete();
            return response()->json(['message' => 'vous avez supprimer votre commentaire'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'erreur lors de la suppresion de votre commentaire veuillez ressayer!', 'error' => $e->getMessage()], 500);
        }
    }
}
