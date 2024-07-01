<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentaireController extends Controller
{
    /**
     * Display a listing of the comments.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $commentaires = Commentaire::with('photographe')->orderBy('created_at', 'desc')->get();
            return response()->json($commentaires);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error retrieving comments', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created comment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'photographe_id' => 'required|exists:photographes,id',
            'nom_client' => 'nullable|string',
            'ville_client' => 'nullable|string',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $commentaire = Commentaire::create($request->all());
            return response()->json(['message' => 'Comment created', 'comment' => $commentaire], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating comment', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified comment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Commentaire  $commentaire
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Commentaire $commentaire)
    {
        $validator = Validator::make($request->all(), [
            'nom_client' => 'nullable|string',
            'ville_client' => 'nullable|string',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $commentaire->update($request->all());
            return response()->json(['message' => 'Comment updated', 'comment' => $commentaire], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating comment', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified comment from storage.
     *
     * @param  \App\Models\Commentaire  $commentaire
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Commentaire $commentaire)
    {
        try {
            $commentaire->delete();
            return response()->json(['message' => 'Comment deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting comment', 'error' => $e->getMessage()], 500);
        }
    }
}
