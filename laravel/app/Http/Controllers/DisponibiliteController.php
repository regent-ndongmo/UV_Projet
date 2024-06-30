<?php

namespace App\Http\Controllers;

use App\Models\Disponibilite;
use Illuminate\Http\Request;

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
            'photographe_id' => 'required|exists:photographes,id',
        ]);

        $disponibilite = Disponibilite::create($request->all());

        return response()->json($disponibilite, 201);
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
            'photographe_id' => 'required|exists:photographes,id',
        ]);

        $disponibilite->update($request->all());

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
  