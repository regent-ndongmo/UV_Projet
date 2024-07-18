<?php

namespace App\Http\Controllers;

use App\Models\Avoir;
use App\Models\Categorie;
use App\Models\Commentaire;
use App\Models\Contrat;
use App\Models\Photographe;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        // $administrateurs = Administrateur::where('name', 'LIKE', "%{$query}%")->get();
        // $avoirs = Avoir::where('name', 'LIKE', "%{$query}%")->get();
        $categories = Categorie::where('categorie', 'LIKE', "%{$query}%")->get();
        // $clients = Client::where('name', 'LIKE', "%{$query}%")->get();
        // $commentaires = Commentaire::where('content', 'LIKE', "%{$query}%")->get();
        // $contrats = Contrat::where('title', 'LIKE', "%{$query}%")->get();
        // $disponibilites = Disponibilite::where('day', 'LIKE', "%{$query}%")->get();
        // $likes = Like::where('user_id', 'LIKE', "%{$query}%")->get();
        // $messages = Message::where('content', 'LIKE', "%{$query}%")->get();
        // $photos = Photo::where('title', 'LIKE', "%{$query}%")->get();
        $photographes = Photographe::where('nom', 'LIKE', "%{$query}%")->get();
        $photographes = Photographe::where('ville', 'LIKE', "%{$query}%")->get();
        $photographes = Photographe::where('signature', 'LIKE', "%{$query}%")->get();
        $photographes = Photographe::where('pays', 'LIKE', "%{$query}%")->get();
        $photographes = Photographe::where('description', 'LIKE', "%{$query}%")->get();
        // $rendezVous = RendezVous::where('date', 'LIKE', "%{$query}%")->get();
        // $tempUsers = TempUser::where('name', 'LIKE', "%{$query}%")->get();
        $users = User::where('name', 'LIKE', "%{$query}%")->get();
        $users = User::where('email', 'LIKE', "%{$query}%")->get();

        return response()->json([
            // 'administrateurs' => $administrateurs,
            // 'avoirs' => $avoirs,
            'categories' => $categories,
            // 'clients' => $clients,
            // 'commentaires' => $commentaires,
            // 'contrats' => $contrats,
            // 'disponibilites' => $disponibilites,
            // 'likes' => $likes,
            // 'messages' => $messages,
            // 'photos' => $photos,
            'photographes' => $photographes,
            // 'rendezVous' => $rendezVous,
            // 'tempUsers' => $tempUsers,
            'users' => $users,
        ]);
    }
}


// http://localhost:8000/api/search?query=jauress
// http://localhost:8000/api/search?query=regent
