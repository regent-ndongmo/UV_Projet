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
        $categories = Categorie::all();
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

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
    //     $request->validate([
    //         'photographe_id' => 'required|exists:photographes,id',
    //         'categorie' => 'required|string|max:255|unique:categories,categorie,NULL,id,photographe_id,' . $request->photographe_id,

    //     ]);
    //     $categorie = Categorie::create($request->all());
    //     return response()->json([$categorie, "message"=>"regent"]);
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
        return response()->json(null, 204);
    }

    //Recuperer les categorie en fonction du nom des utilisateur
    public function getByPhotographe($photographe_id)
    {
        $categories = Categorie::where('photographe_id', $photographe_id)->get();
        return response()->json($categories);
    }
}
