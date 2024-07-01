<?php

namespace App\Http\Controllers;

use App\Models\RendezVous;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RendezVousController extends Controller
{
    public function index()
    {
        // return response()->json(Photo::with(["photographe", "categorie"])->paginate(2000), 200);
        // return RendezVous::all();
        return response()->json(RendezVous::with(["contrat"])->get());
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'date' => 'required|date',
                'heure_debut' => 'required|date_format:H:i',
                'heure_fin' => 'required|date_format:H:i',
                'status' => 'required|string',
                'photographe_id' => 'required|exists:photographes,id',
                'contrat_id' => 'required|exists:contrats,id',
                'nom_client' => 'required|string',
                'lieux' => 'required|string',
            ]);

            $rendezVous = RendezVous::create($validatedData);

            return response()->json([
                'message' => 'Le rendez-vous a été créé avec succès.',
                'rendezVous' => $rendezVous,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de créer le rendez-vous.',
                'errors' => $e->validator->errors(),
            ], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Impossible de trouver le photographe ou le contrat correspondant.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du rendez-vous.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $rendezVous = RendezVous::findOrFail($id);
            return response()->json([
                'rendezVous' => $rendezVous,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Rendez-vous non trouvé.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la recherche du rendez-vous.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'date' => 'required|date',
                'heure_debut' => 'required|date_format:H:i',
                'heure_fin' => 'required|date_format:H:i',
                'status' => 'required|string',
                'photographe_id' => 'required|exists:photographes,id',
                'contrat_id' => 'required|exists:contrats,id',
                'nom_client' => 'required|string',
                'lieux' => 'required|string',
            ]);

            $rendezVous = RendezVous::findOrFail($id);
            $rendezVous->update($validatedData);

            return response()->json([
                'message' => 'Le rendez-vous a été mis à jour avec succès.',
                'rendezVous' => $rendezVous,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de mettre à jour le rendez-vous.',
                'errors' => $e->validator->errors(),
            ], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Rendez-vous non trouvé.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du rendez-vous.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $rendezVous = RendezVous::findOrFail($id);
            $rendezVous->delete();

            return response()->json([
                'message' => 'Le rendez-vous a été supprimé avec succès.',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Rendez-vous non trouvé.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du rendez-vous.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getByPhotographe($photographe_id)
    {
        $rendezVous = RendezVous::with(["contrat"])->where('photographe_id', $photographe_id)->get();
        return response()->json($rendezVous);
    }
}


// {
//     "date": "2024-06-30",
//     "heure_debut": "09:00:00",
//     "heure_fin": "17:00:00",
//     "status": "confirmé",
//     "photographe_id": 1,
//     "contrat_id": 123,
//     "nom_client": "John Doe",
//     "lieux": "Paris, France"
//   }

