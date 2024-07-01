<?php

namespace App\Http\Controllers;

use App\Models\Disponibilite;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DisponibiliteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $disponibilites = Disponibilite::all();
        return response()->json($disponibilites);
    }

    /**
     * Store a newly created disponibilite in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'libele' => 'required|string',
        ]);

        try {
            $user = Auth::user(); // Récupère l'utilisateur authentifié

            // Validation de l'existence de l'utilisateur (optionnel)
            if (!$user) {
                throw new \Exception("Utilisateur non authentifié.");
            }

            $validatedData = $request->all();
            $validatedData['photographe_id'] = $user->id; // Associe l'ID du photographe connecté

            $disponibilite = Disponibilite::create($validatedData);

            return response()->json($disponibilite, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de créer la disponibilité.',
                'errors' => $e,
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de la disponibilité.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Display the specified disponibilite.
     *
     * @param  \App\Models\Disponibilite  $disponibilite
     * @return \Illuminate\Http\Response
     */
    public function show(Disponibilite $disponibilite)
    {
        return response()->json($disponibilite);
    }

    /**
     * Update the specified disponibilite in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Disponibilite  $disponibilite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Disponibilite $disponibilite)
    {
        $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'libele' => 'required|string',
        ]);

        // Vérifier que le photographe connecté est bien celui qui a créé la disponibilité
        if ($disponibilite->photographe_id !== Auth::id()) {
            return response()->json(['error' => 'Accès non autorisé.'], 403);
        }

        $disponibilite->update([
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'libele' => $request->libele,
        ]);

        return response()->json($disponibilite, 200);
    }

    /**
     * Remove the specified disponibilite from storage.
     *
     * @param  \App\Models\Disponibilite  $disponibilite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Disponibilite $disponibilite)
    {
        $disponibilite->delete();

        return response()->json(null, 204);
    }
}

// {
//     "date_debut": "2024-07-01",
//     "date_fin": "2024-07-15",
//     "photographe_id": 1,
//     "libele": "Disponibilité été"
//   }
  