<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Photo::with(["photographe", "categorie"])->paginate(2000), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'categorie_id' => 'required|exists:categories,id',
            'photographe_id' => 'required|exists:photographes,id',
            'titre' => 'required|string|max:255',
            'url_image' => 'required|string|max:255',
            'nombre_likes' => 'required|integer',
        ]);
        $photo = Photo::create($request->all());
        return response($photo, 201);
    }

    public function getPhotoById($id)
    {
        $photo = Photo::with(["photographe", "categorie"])->find($id);
        if (is_null($photo)) {
            return response()->json(['message' => 'Photo not found'], 404);
        }
        return response()->json($photo, 200);
    }

    public function updatePut(Request $request, $id)
    {
        $photo = Photo::find($id);
        if (is_null($photo)) {
            return response()->json(['message' => 'Photo not found'], 404);
        }

        $validatedData = $request->validate([
            'categorie_id' => 'sometimes|exists:categories,id',
            'photographe_id' => 'sometimes|exists:photographes,id',
            'titre' => 'sometimes|string|max:255',
            'url_image' => 'sometimes|string|max:255',
            'nombre_likes' => 'sometimes|integer',
        ]);

        $photo->update($validatedData);
        return response($photo, 200);
    }
    public function updatePatch(Request $request, $id)
    {
        $photo = Photo::find($id);
        if(is_null($photo)){
            return response()->json(['message'=>'photo not found'], 404);
        }

        $validatedData = $request->validate([
            'categorie_id' => 'sometimes|exists:categories,id',
            'photographe_id' => 'sometimes|exists:photographes,id',
            'titre' => 'sometimes|string|max:255',
            'url_image' => 'sometimes|string|max:255',
            'nombre_likes' => 'sometimes|integer',
        ]);

        $photo->fill($validatedData);
        $photo->save();

        return response($photo, 200);
    }

    public function delete(Request $request, $id)
    {
        $photo = Photo::find($id);
        if (is_null($photo)) {
            return response()->json(['message' => 'Photo not found'], 404);
        }
        $photo->delete();
        return response()->json(["message" => "Photo supprime avec succes"], 204);
    }
}

// {
//     "categorie_id": 1,
//     "photographe_id": 1,
//     "titre": "Titre de la photo",
//     "url_image": "http://example.com/image.jpg",
//     "nombre_likes": 10
// }
