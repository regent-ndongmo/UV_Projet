<?php

namespace App\Http\Controllers;

use App\Models\Photographe;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PhotographeController extends Controller
{
    public function index(){
        // return Photographe::all();
        return response()->json(Photographe::with(["user"])->get());
    }


    // POST function to create a new photographe
    //Creation d'un photographe
    public function register(Request $request)
    {
        // Log the request data for debugging
        Log::info('Register request data: ', $request->all());

        try {
            $data = $request->only('user_id','nom', 'ville', 'pays', 'numero', 'photo', 'signature', 'description');

            $validator = Validator::make($data, [
                "user_id"=>"required|integer",
                'nom' => 'required|string',
                'ville' => 'required|string',
                'pays' => 'required|string',
                'numero' => 'required|string',
                'signature' => 'required|string',
                'description' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $photoPath = null;
            if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
                $file = $request->file('photo');
                $uploadPath = 'storage/images/profile';
                $originalName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path($uploadPath), $originalName);
                $photoPath = $originalName;
            } else {
                // Utilisation d'une photo par défaut
                $photoPath = 'account.png'; // Remplacez par le chemin de votre photo par défaut
            }


            $photographe = Photographe::create([
                'user_id' => $data['user_id'],
                'nom' => $data['nom'],
                'ville' => $data['ville'],
                'pays' => $data['pays'],
                'numero' => $data['numero'],
                'photo' => $photoPath,
                'signature' => $data['signature'],
                'description' => $data['description'],
            ]);

            return response()->json($photographe, 201);
        } catch (Exception $e) {
            Log::error('Error registering photographe: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    // PATCH function to update an existing photographe

    public function update($id, Request $request)
    {
        // return $request;
        try {
            // Trouver le photographe par son ID
            $photographe = Photographe::findOrFail($id);

            // Récupérer uniquement les données nécessaires
            $data = $request->only('user_id', 'nom', 'ville', 'pays', 'numero', 'photo', 'signature', 'description');

            // dd($data);
            Log::info('Contenu de la variable $data:', $data);
            // Valider les données
            $validator = Validator::make($data, [
                'user_id' => 'required|integer',
                'nom' => 'required|string',
                'ville' => 'required|string',
                'pays' => 'required|string',
                'numero' => 'required|string',
                'signature' => 'required|string',
                'description' => 'required|string',
            ]);

            // Retourner les erreurs de validation
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Traiter le téléchargement de la photo
            $photoPath = $photographe->photo; // Valeur par défaut, garder l'ancienne photo
            if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
                $file = $request->file('photo');
                $uploadPath = 'storage/images/profile';
                $originalName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path($uploadPath), $originalName);
                $photoPath = $originalName;
            } else if (!$photographe->photo) {
                // Utilisation d'une photo par défaut si aucune photo n'existait auparavant
                $photoPath = 'account.png'; // Remplacez par le chemin de votre photo par défaut
            }

            // Mettre à jour les données du photographe
            $photographe->fill([
                'user_id' => $data['user_id'],
                'nom' => $data['nom'],
                'ville' => $data['ville'],
                'pays' => $data['pays'],
                'numero' => $data['numero'],
                'photo' => $photoPath,
                'signature' => $data['signature'],
                'description' => $data['description'],
            ]);
            $photographe->save();

            return response()->json($photographe, 200); // 200 pour une mise à jour réussie
        } catch (Exception $e) {
            Log::error('Error updating photographe: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }



    // GET function to retrieve a photographe by ID
    public function show($id)
    {
        $photographe = Photographe::findOrFail($id);

        // Assurez-vous que l'URL de l'image est correcte
        if ($photographe->photo) {
            $photographe->photo = $photographe->photo;
        }

        return response()->json($photographe, 200);
    }


    // DELETE function to delete a photographe
    public function destroy($id)
    {
        $photographe = Photographe::findOrFail($id);
        if ($photographe->photo) {
            Storage::disk('public')->delete($photographe->photo);
        }
        $photographe->delete();

        return response()->json(null, 204);
    }
}



