<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Photographe;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;

class AvoirController extends Controller
{
    /**
     * Associer un photographe à une catégorie (CRUD - Create).
     */
    public function associerPhotographeACategorie(Request $request)
    {
        try {
            // Validation des données
            $request->validate([
                'photographe_id' => 'required|exists:photographes,id',
                'categorie_id' => 'required|exists:categories,id',
            ]);

            // Associer le photographe à la catégorie
            $categorie = Categorie::findOrFail($request->categorie_id);
            $categorie->photographes()->syncWithoutDetaching([$request->photographe_id]);

            return response()->json(['message' => 'Photographe associé à la catégorie avec succès']);

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ressource non trouvée'], 404);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur interne du serveur'], 500);
        }
    }

    /**
     * Désassocier un photographe d'une catégorie (CRUD - Delete).
     */
    public function desassocierPhotographeDeCategorie(Request $request)
    {
        try {
            // Validation des données
            $request->validate([
                'photographe_id' => 'required|exists:photographes,id',
                'categorie_id' => 'required|exists:categories,id',
            ]);

            // Désassocier le photographe de la catégorie
            $categorie = Categorie::findOrFail($request->categorie_id);
            $categorie->photographes()->detach($request->photographe_id);

            return response()->json(['message' => 'Photographe désassocié de la catégorie avec succès']);

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Ressource non trouvée'], 404);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur interne du serveur'], 500);
        }
    }

    /**
     * Afficher tous les photographes d'une catégorie spécifique (CRUD - Read).
     */
    public function photographesParCategorie($categorie_id)
    {
        try {
            // Récupérer les photographes de la catégorie spécifiée
            $categorie = Categorie::with('photographes')->findOrFail($categorie_id);

            return response()->json($categorie->photographes);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Catégorie non trouvée'], 404);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur interne du serveur'], 500);
        }
    }

    /**
     * Afficher toutes les catégories d'un photographe spécifique (CRUD - Read).
     */
    public function categoriesParPhotographe($photographe_id)
    {
        try {
            // Récupérer les catégories du photographe spécifié
            $photographe = Photographe::with('categories')->findOrFail($photographe_id);

            return response()->json($photographe->categories);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Photographe non trouvé'], 404);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur interne du serveur'], 500);
        }
    }
}
