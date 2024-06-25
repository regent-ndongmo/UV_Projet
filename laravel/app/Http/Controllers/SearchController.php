<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photographe;
use App\Models\Categorie;
use App\Models\Contrat;
use App\Models\Commentaire;
use App\Models\Disponibilite;
use App\Models\Photo;
use App\Models\RendezVous;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');

        $photographes = Photographe::where('nom', 'like', "%{$query}%")
            ->orWhere('ville', 'like', "%{$query}%")
            ->orWhere('pays', 'like', "%{$query}%")
            ->orWhere('numero', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->get();

        $categories = Categorie::where('categorie', 'like', "%{$query}%")
            ->get();

        $contrats = Contrat::where('montant', 'like', "%{$query}%")
            ->orWhere('status_paiement', 'like', "%{$query}%")
            ->get();

        $commentaires = Commentaire::where('nom_client', 'like', "%{$query}%")
            ->orWhere('ville_client', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->get();

        $disponibilites = Disponibilite::where('Date', 'like', "%{$query}%")
            ->orWhere('Heure', 'like', "%{$query}%")
            ->get();

        $photos = Photo::where('titre', 'like', "%{$query}%")
            ->orWhere('nombre_likes', 'like', "%{$query}%")
            ->get();

        $rendezVous = RendezVous::where('date', 'like', "%{$query}%")
            ->orWhere('heure_debut', 'like', "%{$query}%")
            ->orWhere('heure_fin', 'like', "%{$query}%")
            ->orWhere('status', 'like', "%{$query}%")
            ->get();

        return response()->json([
            'photographes' => $photographes,
            'categories' => $categories,
            'contrats' => $contrats,
            'commentaires' => $commentaires,
            'disponibilites' => $disponibilites,
            'photos' => $photos,
            'rendez_vous' => $rendezVous,
        ]);
    }

    public function autocomplete(Request $request)
    {
        $query = $request->input('query');

        $suggestions = Photographe::where('nom', 'like', "%{$query}%")
            ->orWhere('ville', 'like', "%{$query}%")
            ->orWhere('pays', 'like', "%{$query}%")
            ->orWhere('numero', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->pluck('nom')
            ->union(Categorie::where('categorie', 'like', "%{$query}%")->pluck('categorie'))
            ->union(Contrat::where('montant', 'like', "%{$query}%")->pluck('montant'))
            ->union(Commentaire::where('nom_client', 'like', "%{$query}%")->pluck('nom_client'))
            ->union(Disponibilite::where('Date', 'like', "%{$query}%")->pluck('Date'))
            ->union(Photo::where('titre', 'like', "%{$query}%")->pluck('titre'))
            ->union(RendezVous::where('date', 'like', "%{$query}%")->pluck('date'))
            ->take(10)
            ->toArray();

        return response()->json($suggestions);
    }
}
