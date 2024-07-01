<?php

namespace App\Http\Controllers;

use App\Models\RendezVous;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class RendezVousController extends Controller
{
    public function index()
    {
        return RendezVous::all();
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'date' => 'required|date',
                'heure_debut' => 'required|date_format:H:i:s',
                'heure_fin' => 'required|date_format:H:i:s',
                'status' => 'required|string',
                // 'photographe_id' => 'required|exists:photographes,id',
                'contrat_id' => 'required|exists:contrats,id',
                'nom_client' => 'required|string',
                'lieux' => 'required|string',
            ]);

            $user = Auth::user(); // Récupère l'utilisateur authentifié

            // Validation de l'existence de l'utilisateur (optionnel)
            if (!$user) {
                throw new \Exception("Utilisateur non authentifié.");
            }
            // Récupérer l'ID du photographe actuellement authentifié
            $photographe_id = Auth::id();

            $rendezVous = RendezVous::create(array_merge($validatedData, [
                'photographe_id' => $photographe_id,
            ]));

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
                'heure_debut' => 'required|date_format:H:i:s',
                'heure_fin' => 'required|date_format:H:i:s',
                'status' => 'required|string',
                // 'photographe_id' => 'required|exists:photographes,id',
                'contrat_id' => 'required|exists:contrats,id',
                'nom_client' => 'required|string',
                'lieux' => 'required|string',
            ]);

            // Récupérer l'ID du photographe actuellement authentifié
            $photographe_id = Auth::id();

            $rendezVous = RendezVous::findOrFail($id);

            // Vérifier si le photographe qui modifie le rendez-vous est bien celui qui l'a créé
            if ($rendezVous->photographe_id !== $photographe_id) {
                return response()->json([
                    'message' => 'Vous n\'êtes pas autorisé à modifier ce rendez-vous.',
                ], 403); // Code d'erreur 403 pour l'accès interdit
            }

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
  