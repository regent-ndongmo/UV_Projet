<?php

namespace App\Http\Controllers;

use App\Models\Disponibilite;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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
        try{
            $request->validate([
                'date_debut' => 'required|date',
                'date_fin' => 'required|date',
                'libele' => 'required|string',
                'photographe_id' => 'required|exists:photographes,id',
            ]);

            $disponibilite = Disponibilite::create($request->all());

            return response()->json($disponibilite, 201);
        }catch (ValidationException $e) {
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
     * Display the specified resource.
     */
    public function show(Disponibilite $disponibilite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Disponibilite $disponibilite)
    {
        return response()->json($disponibilite);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Disponibilite $disponibilite)
    {
        $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'libele' => 'required|string',
            'photographe_id' => 'required|exists:photographes,id',
        ]);

        $disponibilite->update($request->all());

        return response()->json($disponibilite, 200);
    }

    /**
     * Remove the specified resource from storage.
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
