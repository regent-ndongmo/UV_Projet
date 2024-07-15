<?php

namespace App\Http\Controllers;

use App\Events\RendezVousProcheEvent;
use App\Models\RendezVous;
use App\Services\GoogleCalendarService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RendezVousController extends Controller
{

    protected $calendarService;

    public function __construct(GoogleCalendarService $calendarService)
    {
        $this->calendarService = $calendarService;
    }

    public function index()
    {
        $rendezVous = RendezVous::all();

        return response()->json($rendezVous, 200);
    }

    public function create(Request $request)
    {
        // Valider les données du formulaire
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
            'status' => 'required|string',
            'photographe_id' => 'required|exists:photographes,id',
            'contrat_id' => 'required|exists:contrats,id',
            'lieux' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Créer le rendez-vous
        $rendezVous = RendezVous::create($request->all());

        // Déclencher l'événement si le rendez-vous est proche
        if ($this->rendezVousEstProche($rendezVous)) {
            event(new RendezVousProcheEvent($rendezVous));
        }
        // Créer l'événement dans Google Calendar
        $calendarService = new GoogleCalendarService();
        $eventId = $calendarService->createEvent(
            'Rendez-vous avec ' . $rendezVous->nom_client,
            $rendezVous->lieux,
            'Rendez-vous avec ' . $rendezVous->nom_client,
            $rendezVous->date . 'T' . $rendezVous->heure_debut . ':00',
            $rendezVous->date . 'T' . $rendezVous->heure_fin . ':00'
        );

        // Enregistrer l'ID de l'événement dans votre modèle si nécessaire
        $rendezVous->google_calendar_event_id = $eventId;
        $rendezVous->save();

        return response()->json($rendezVous, 201);
    }

    private function rendezVousEstProche($rendezVous)
    {
        // Logique pour déterminer si le rendez-vous est proche (par exemple, dans les 24 heures à venir)
        return $rendezVous->date <= now()->addDay()->endOfDay() && $rendezVous->date >= now();
    }

    /**
     * Mettre à jour un rendez-vous existant.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Valider les données du formulaire
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
            'status' => 'required|string',
            'photographe_id' => 'required|exists:photographes,id',
            'contrat_id' => 'required|exists:contrats,id',
            'nom_client' => 'required|string',
            'lieux' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Trouver et mettre à jour le rendez-vous
        $rendezVous = RendezVous::findOrFail($id);
        $rendezVous->update($request->all());

        // Mettre à jour l'événement dans Google Calendar
        $calendarService = new GoogleCalendarService();
        $calendarService->updateEvent(
            $rendezVous->google_calendar_event_id,
            'Rendez-vous avec ' . $rendezVous->nom_client,
            $rendezVous->lieux,
            'Rendez-vous avec ' . $rendezVous->nom_client,
            $rendezVous->date . 'T' . $rendezVous->heure_debut . ':00',
            $rendezVous->date . 'T' . $rendezVous->heure_fin . ':00'
        );

        return response()->json($rendezVous, 200);
    }

    /**
     * Supprimer un rendez-vous.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $rendezVous = RendezVous::findOrFail($id);

        // Supprimer l'événement dans Google Calendar
        $calendarService = new GoogleCalendarService();
        $calendarService->deleteEvent($rendezVous->google_calendar_event_id);

        $rendezVous->delete();

        return response()->json(null, 204);
    }

    /**
     * Afficher les détails d'un rendez-vous.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $rendezVous = RendezVous::findOrFail($id);

        // Récupérer l'événement dans Google Calendar si nécessaire
        $calendarService = new GoogleCalendarService();
        $eventSummary = $calendarService->getEvent($rendezVous->google_calendar_event_id);

        return response()->json($rendezVous, 200);
    }
}


// {
//     "date": "2024-06-30",
//     "heure_debut": "09:00:00",
//     "heure_fin": "17:00:00",
//     "status": "confirmé",
//     "photographe_id": 1,
//     "contrat_id": 123,
//     "nom_client": "John Doe",
//     "lieux": "Paris, France"
//   }

