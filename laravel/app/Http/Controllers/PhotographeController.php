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
        return Photographe::all();
    }
    // POST function to create a new photographe
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'nom' => 'required|string',
            'ville' => 'required|string',
            'pays' => 'required|string',
            'numero' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'signature' => 'required|string|unique:photographes',
            'description' => 'required|string',
        ]);

        $data = $request->all();
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('photographes', 'public');
        }

        $photographe = Photographe::create($data);

        return response()->json($photographe, 201);
    }

    // PUT function to update an existing photographe
    public function update(Request $request, $id)
    {
        $photographe = Photographe::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'nom' => 'sometimes|string|max:255',
            'ville' => 'sometimes|string|max:255',
            'pays' => 'sometimes|string|max:255',
            'numero' => 'sometimes|string|max:255',
            'photo' => 'sometimes|string|max:255',
            'signature' => 'sometimes|string|max:255|unique:photographes,signature,'.$id,
            'description' => 'sometimes|string',
        ]);

        $photographe = Photographe::findOrFail($id);
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $fileName = $file->getClientOriginalName(); // Récupérer le nom du fichier
            $file->storeAs('photographes', $fileName, 'public'); // Stocker le fichier dans le répertoire public/photographes
            $data['photo'] = $fileName; // Stocker le nom du fichier dans la base de données
        }

        $photographe->update($data);

        return response()->json($photographe, 200);
    }

    // PATCH function to partially update an existing photographe
    // public function patch(Request $request, $id)
    // {
    //     $photographe = Photographe::findOrFail($id);

    //     $validated = $request->validate([
    //         'user_id' => 'sometimes|exists:users,id',
    //         'nom' => 'sometimes|string|max:255',
    //         'ville' => 'sometimes|string|max:255',
    //         'pays' => 'sometimes|string|max:255',
    //         'numero' => 'sometimes|string|max:255',
    //         'photo' => 'sometimes|string|max:255',
    //         'signature' => 'sometimes|string|max:255|unique:photographes,signature,'.$id,
    //         'description' => 'sometimes|string',
    //     ]);


    //     $data = $request->all();

    //     if ($request->hasFile('photo')) {
    //         $file = $request->file('photo');
    //         $fileName = $file->getClientOriginalName(); // Récupérer le nom du fichier
    //         $file->storeAs('photographes', $fileName, 'public'); // Stocker le fichier dans le répertoire public/photographes
    //         $data['photo'] = $fileName; // Stocker le nom du fichier dans la base de données
    //     }

    //     try {
    //         $photographe->update($data);
    //         return response()->json($photographe, 200);
    //     } catch (\Exception $e) {
    //         // Handle exception (log error, return error response, etc.)
    //         return response()->json(['error' => 'An error occurred while updating the photographe'], 500);
    //     }
    // }
    public function patch(Request $request, $id)
    {
        $photographe = Photographe::findOrFail($id);
        $data = $request->all();

        $validated = Validator::make($data, [
            'user_id' => 'sometimes|exists:users,id',
            'nom' => 'sometimes|string|max:255',
            'ville' => 'sometimes|string|max:255',
            'pays' => 'sometimes|string|max:255',
            'numero' => 'sometimes|string|max:255',
            'signature' => 'sometimes|string|max:255|unique:photographes,signature,'.$id,
            'description' => 'sometimes|string',
        ]);


        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName(); // Récupérer le nom du fichier
            $uploadPath = "images/profile";
            $file->storeAs('photographes', $fileName, 'public'); // Stocker le fichier dans le répertoire public/photographes
            $data['file'] = $fileName; // Stocker le nom du fichier dans la base de données
            $file->move($uploadPath, $fileName);
        }

        try {
            $photographe->update($data);
            return response()->json($photographe, 200);
        } catch (\Exception $e) {
            // Handle exception (log error, return error response, etc.)
            return response()->json(['error' => 'An error occurred while updating the photographe'], 500);
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
                $uploadPath = 'images/profile';
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
}



