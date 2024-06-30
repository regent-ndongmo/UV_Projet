<?php

namespace App\Http\Controllers;

use App\Models\Contrat;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Schema;

class ContratController extends Controller
{
    public function index()
    {
        return Contrat::all();
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'montant' => 'required|numeric',
                'date' => 'required|date',
                'status_paiement' => 'required|string',
            ]);

            $contrat = Contrat::create($validatedData);

            return response()->json([
                'message' => 'Le contrat a été créé avec succès.',
                'contrat' => $contrat,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de créer le contrat.',
                'errors' => $e->validator->errors(),
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du contrat.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $contrat = Contrat::findOrFail($id);
            return response()->json([
                'contrat' => $contrat,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Contrat non trouvé.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la recherche du contrat.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'montant' => 'required|numeric',
                'date' => 'required|date',
                'status_paiement' => 'required|string',
            ]);

            $contrat = Contrat::findOrFail($id);
            $contrat->update($validatedData);

            return response()->json([
                'message' => 'Le contrat a été mis à jour avec succès.',
                'contrat' => $contrat,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de mettre à jour le contrat.',
                'errors' => $e->validator->errors(),
            ], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Contrat non trouvé.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du contrat.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $contrat = Contrat::findOrFail($id);
            $contrat->delete();

            return response()->json([
                'message' => 'Le contrat a été supprimé avec succès.',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Contrat non trouvé.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du contrat.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

// {
//     "montant": 100.50,
//     "date": "2024-06-30",
//     "status_paiement": "en attente"
//   }