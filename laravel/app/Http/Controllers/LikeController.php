<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function likePhoto($id)
    {
        try {
            $photo = Photo::findOrFail($id);
            $photo->nombre_likes++;
            $photo->save();

            return response()->json(['message' => 'merci d\'avoir liké!', 'photo' => $photo]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'la photo n\'existe pas'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'erreur lors de l\'ajout de votre like veuillez ressayer!'], 500);
        }
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
