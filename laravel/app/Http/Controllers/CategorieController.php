<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCategorieRequest;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categorie::select('categorie')
            ->distinct()
            ->get();
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        // return $request;
        try {
            $request->validate([
                'photographe_id' => 'required|exists:photographes,id',
                'categorie' => 'required|string|max:255|unique:categories,categorie,NULL,id,photographe_id,' . $request->photographe_id,
            ]);

            $categorie = Categorie::create($request->all());

            return response()->json(['categorie' => $categorie, 'message' => 'success'], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()->all()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $categorie = Categorie::findOrFail($id);
        return response()->json($categorie);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, $id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->update($request->validated());
        return response()->json($categorie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->delete();
        return response()->json(["message"=>"Categorie supprime avec succes"], 204);
    }

    //Recuperer les categorie en fonction du nom des utilisateur
    public function getByPhotographe($photographe_id)
    {
        $categories = Categorie::where('photographe_id', $photographe_id)->get();
        return response()->json($categories);
    }


    public function getCategoryIdsByName($name)
    {
        // Récupérer les IDs des catégories ayant le même nom
        $categories = Categorie::where('categorie', $name)->pluck('id');

        return response()->json($categories);
    }

    public function search(Request $request)
    {
        // Valider l'entrée utilisateur
        $request->validate([
            'query' => 'required|string', // Assurez-vous que 'query' correspond à votre clé d'entrée dans la requête
        ]);

        // Récupérer la requête de recherche de l'utilisateur
        $searchQuery = $request->input('query');

        try {
            // Rechercher les catégories correspondantes dans la base de données
            $categories = Categorie::where('categorie', 'like', "%$searchQuery%")->get();

            // Vérifier s'il y a des résultats
            if ($categories->isEmpty()) {
                return response()->json(['message' => 'Aucune catégorie trouvée pour cette recherche.'], 404);
            }

            // Retourner les résultats sous forme de JSON
            return response()->json($categories);
        } catch (\Exception $e) {
            // Gérer les erreurs de base de données ou autres exceptions
            return response()->json(['message' => 'Une erreur est survenue lors de la recherche.', 'error' => $e->getMessage()], 500);
        }
    }
}
