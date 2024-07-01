<?php

namespace App\Http\Controllers;

use App\Models\Photographe;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\User; // Assurez-vous d'importer le modèle User si ce n'est pas déjà fait

class PhotographeController extends Controller
{
    public function index()
    {
        return Photographe::all();
    }

    public function register(Request $request)
    {
        Log::info('Register request data: ', $request->all());

        try {
            $data = $request->only('user_id', 'nom', 'ville', 'pays', 'numero', 'photo', 'signature', 'description');

            // Validation des données
            $validator = Validator::make($data, [
                "user_id" => "required|integer|exists:users,id", // Vérifie que l'utilisateur existe dans la table users
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
                $photoPath = 'account.png'; // Photo par défaut
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

    public function update($id, Request $request)
    {
        try {
            // Vérifier si le photographe existe
            $photographe = Photographe::findOrFail($id);

            // Récupérer uniquement les données nécessaires
            $data = $request->only('user_id', 'nom', 'ville', 'pays', 'numero', 'photo', 'signature', 'description');

            // Valider les données
            $validator = Validator::make($data, [
                'user_id' => 'required|integer|exists:users,id', // Vérifie que l'utilisateur existe dans la table users
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

            // Gestion du téléchargement de la photo
            $photoPath = $photographe->photo; // Conserver l'ancienne photo par défaut

            if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
                $file = $request->file('photo');
                $uploadPath = 'storage/images/profile';
                $originalName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path($uploadPath), $originalName);
                $photoPath = $originalName;
            } else if (!$photographe->photo) {
                $photoPath = 'account.png'; // Photo par défaut
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

            return response()->json($photographe, 200); // Réponse pour mise à jour réussie
        } catch (Exception $e) {
            Log::error('Error updating photographe: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    public function show($id)
    {
        try {
            $photographe = Photographe::findOrFail($id);

            if ($photographe->photo) {
                $photographe->photo = $photographe->photo;
            }

            return response()->json($photographe, 200);
        } catch (Exception $e) {
            Log::error('Error fetching photographe: ' . $e->getMessage());
            return response()->json(['error' => 'Photographe not found'], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $photographe = Photographe::findOrFail($id);

            if ($photographe->photo) {
                Storage::disk('public')->delete($photographe->photo);
            }

            $photographe->delete();

            return response()->json(null, 204);
        } catch (Exception $e) {
            Log::error('Error deleting photographe: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}



// {
//     "user_id": 2,
//     "nom": "John Doe",
//     "ville": "Paris",
//     "pays": "France",
//     "numero": "123456789",
//     "signature": "Signature",
//     "description": "Photographe professionnel"
// }