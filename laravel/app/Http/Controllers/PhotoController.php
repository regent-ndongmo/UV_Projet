<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Dotenv\Exception\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Photo::with(["photographe", "categorie"])->paginate(2000), 200);
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
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'categorie_id' => 'required|exists:categories,id',
                'photographe_id' => 'required|exists:photographes,id',
                'titre' => 'required|string|max:255',
                'url_image' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'prix' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
                'nombre_likes' => 'integer|min:0',
            ]);
            
            $photo = Photo::create($validatedData);
            
            return response()->json([
                'message' => 'Photo créée avec succès.',
                'photo' => $photo,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de créer la photo.',
                'errors' => $e,
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de la photo.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getPhotoById($id)
    {
        try {
            $photo = Photo::with(["photographes", "categories"])->findOrFail($id);
            
            return response()->json($photo, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Photo non trouvée.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la recherche de la photo.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
            'description' => 'required|string|max:255',
            'prix' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'nombre_likes' => 'sometimes|integer',
        ]);

        $photo->update($validatedData);
        return response($photo, 200);
    }
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'titre' => 'required|string|max:255',
                'url_image' => 'required|string',
                'nombre_likes' => 'integer|min:0',
                'description' => 'required|string|max:255',
                'prix' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
                'categorie_id' => 'required|exists:categories,id',
                'photographe_id' => 'required|exists:photographes,id',
            ]);

            $photo = Photo::findOrFail($id);
            $photo->update($validatedData);

            return response()->json([
                'message' => 'La photo a été mise à jour avec succès.',
                'photo' => $photo,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Impossible de mettre à jour la photo.',
                'errors' => $e,
            ], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Photo non trouvée.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de la photo.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $photo = Photo::findOrFail($id);

            // Supprimer le fichier image associé si nécessaire
            if ($photo->url_image) {
                Storage::delete($photo->url_image);
            }

            $photo->delete();

            return response()->json([
                'message' => 'La photo a été supprimée avec succès.',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Photo non trouvée.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression de la photo.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // ...
}

// {
//     "categorie_id": 1,
//     "photographe_id": 1,
//     "titre": "Titre de la photo",
//     "url_image": "http://example.com/image.jpg",
//     "nombre_likes": 10
// }


