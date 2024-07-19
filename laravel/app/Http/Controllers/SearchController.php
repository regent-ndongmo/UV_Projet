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

        $categories = Categorie::where('categorie', 'LIKE', "%{$query}%")->get();

        $photographes = Photographe::where('nom', 'LIKE', "%{$query}%")
            ->orWhere('ville', 'LIKE', "%{$query}%")
            ->orWhere('signature', 'LIKE', "%{$query}%")
            ->orWhere('pays', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->get();

        $users = User::where('name', 'LIKE', "%{$query}%")
            ->orWhere('email', 'LIKE', "%{$query}%")
            ->get();

        return response()->json([
            'categories' => $categories,
            'photographes' => $photographes,
            'users' => $users,
        ]);
    }
}


// http://localhost:8000/api/search?query=jauress
// http://localhost:8000/api/search?query=regent
