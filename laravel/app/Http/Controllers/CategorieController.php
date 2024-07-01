<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategorieController extends Controller
{
    public function index()
    {
        return Categorie::all();
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'categorie' => 'required|string|max:255',
                //'description' => 'nullable|string',
            ]);

            $categorie = Categorie::create($validatedData);

            return response()->json([
                'message' => 'La catégorie a été créée avec succès.',
                'categorie' => $categorie,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de créer la catégorie.',
                'errors' => $e->validator->errors(),
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de la catégorie.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $categorie = Categorie::findOrFail($id);
            return response()->json([
                'categorie' => $categorie,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Catégorie non trouvée.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la recherche de la catégorie.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'categorie' => 'required|string|max:255',
                //'description' => 'nullable|string',
            ]);

            $categorie = Categorie::findOrFail($id);
            $categorie->update($validatedData);

            return response()->json([
                'message' => 'La catégorie a été mise à jour avec succès.',
                'categorie' => $categorie,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de mettre à jour la catégorie.',
                'errors' => $e->validator->errors(),
            ], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Catégorie non trouvée.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de la catégorie.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $categorie = Categorie::findOrFail($id);
            $categorie->delete();

            return response()->json([
                'message' => 'La catégorie a été supprimée avec succès.',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Catégorie non trouvée.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression de la catégorie.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function search(Request $request)
    {
        $searchQuery = $request->input('query');

        $photographers = Categorie::where('categorie', 'like', "%$searchQuery%")
                                     ->get();

        if ($photographers->isEmpty()) {
            return response()->json(['message' => 'Aucune categorie  trouvé pour cette recherche.'], 404);
        }

        return response()->json($photographers);
    }
}
