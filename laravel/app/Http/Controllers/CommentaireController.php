<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentaireController extends Controller
{
    /**
     * Display a listing of the resource.
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
     * Display the specified resource.
     */
    public function show(Commentaire $commentaire)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commentaire $commentaire)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commentaire $commentaire)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
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
//     "photographe_id": 2,
//     "nom_client": "John Doe",
//     "ville_client": "Paris",
//     "description": "je vous conseille ce photographe! !"
//   }
