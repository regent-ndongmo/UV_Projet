<?php

namespace App\Http\Controllers;

use App\Models\Like;
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
    // app/Http/Controllers/LikeController.php
    public function getUserLikes($client_id)
    {
        $likes = Like::where('client_id', $client_id)->get();
        return response()->json($likes);
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
        // return $request;
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'photo_id' => 'required',
        ]);

        // Vérifier si le client a déjà liké cette photo
        $existingLike = Like::where('client_id', $request->client_id)
                            ->where('photo_id', $request->photo_id)
                            ->first();

        if ($existingLike) {
            return response()->json(['message' => 'Vous avez déjà liké cette image.'], 400);
        }

        $like = Like::create([
            'client_id' => $request->client_id,
            'photo_id' => $request->photo_id,
        ]);

        return response()->json($like, 201);
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
    public function destroy(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'photo_id' => 'required',
        ]);

        $like = Like::where('client_id', $request->client_id)
                    ->where('photo_id', $request->photo_id)
                    ->first();

        if (!$like) {
            return response()->json(['message' => 'Vous n\'avez pas liké cette image.'], 400);
        }

        $like->delete();

        return response()->json(['message' => 'Like supprimé avec succès.'], 200);
    }
}
