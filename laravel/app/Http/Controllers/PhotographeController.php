<?php

namespace App\Http\Controllers;

use App\Models\Photographe;
use Illuminate\Http\Request;

class PhotographeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Photographe::with(["photo", "commentaire", "disponibilite", "categories"])->get();
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Photographe $photographe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Photographe $photographe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Photographe $photographe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Photographe $photographe)
    {
        //
    }
}
