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
     * Display a listing of comments by photographer ID.
     *
     * @param int $photographe_id
     * @return \Illuminate\Http\Response
     */
    public function findAllByIdPhotographe($photographe_id)
    {
        // Find comments by photographer ID
        $comments = Commentaire::where('photographe_id', $photographe_id)->get();

        // Return comments as JSON response
        return response()->json($comments);
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
            'nom_client' => 'required|string',
            'ville_client' => 'required|string',
            'email_client' => 'required|string|email',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $commentaire = Commentaire::create($request->all());
            return response()->json(['message' => 'votre commentaire a été prise en compte il sera afficher après validation des données fournies', 'comment' => $commentaire], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'une erreur est survenu lors de l\'ajout de votre commentaire veuillez reessayer!', 'error' => $e->getMessage()], 500);
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
            // 'nom_client' => 'nullable|string',
            // 'ville_client' => 'nullable|string',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $commentaire->update($request->all());
            return response()->json(['message' => 'la modification de votre commentaire a été prise en compte!', 'comment' => $commentaire], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'erreur lors de la modification de votre comment veuillez ressayer!', 'error' => $e->getMessage()], 500);
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
            return response()->json(['message' => 'vous avez supprimer votre commentaire'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'erreur lors de la suppresion de votre commentaire veuillez ressayer!', 'error' => $e->getMessage()], 500);
        }
    }
}




// {
//     "photographe_id": 1,
//     "nom_client": "John ",
//     "ville_client": "Paris",
//     "description": "excelent!",
//     "email_client":"franclain@gmail.com"
//   }
