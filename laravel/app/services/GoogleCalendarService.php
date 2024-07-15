<?php

namespace App\Services;

use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;
use Google\Service\Calendar\EventDateTime;

class GoogleCalendarService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setApplicationName('Shouter_Photographe');
        $this->client->setScopes(Calendar::CALENDAR_EVENTS);
        $this->client->setClientId(env('GOOGLE_CLIENT_ID'));
        $this->client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $this->client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $this->client->setAccessType('offline');
    }

    public function getClient()
    {
        return $this->client;
    }

    public function createEvent($summary, $location, $description, $startDateTime, $endDateTime)
{
    $service = new Calendar($this->client);

    $event = new Event();
    $event->setSummary($summary);
    $event->setLocation($location);
    $event->setDescription($description);
    
    // Créer des objets EventDateTime pour start et end
    $start = new EventDateTime();
    $start->setDateTime($startDateTime);
    $start->setTimeZone('Europe/Paris'); // Assurez-vous d'utiliser le bon fuseau horaire
    
    $end = new EventDateTime();
    $end->setDateTime($endDateTime);
    $end->setTimeZone('Europe/Paris'); // Assurez-vous d'utiliser le bon fuseau horaire
    
    $event->setStart($start);
    $event->setEnd($end);

    $calendarId = 'primary'; // ID du calendrier Google (par défaut, c'est 'primary' pour le calendrier principal)

    $event = $service->events->insert($calendarId, $event);

    return $event->getId(); // Retourne l'ID de l'événement créé
}
    public function updateEvent($eventId, $summary, $location, $description, $startDateTime, $endDateTime)
{
    $service = new Calendar($this->client);

    $event = $service->events->get('primary', $eventId);

    $event->setSummary($summary);
    $event->setLocation($location);
    $event->setDescription($description);
    
    // Créer des objets EventDateTime pour start et end
    $start = new EventDateTime();
    $start->setDateTime($startDateTime);
    $start->setTimeZone('Europe/Paris'); // Assurez-vous d'utiliser le bon fuseau horaire
    
    $end = new EventDateTime();
    $end->setDateTime($endDateTime);
    $end->setTimeZone('Europe/Paris'); // Assurez-vous d'utiliser le bon fuseau horaire
    
    $event->setStart($start);
    $event->setEnd($end);

    $updatedEvent = $service->events->update('primary', $eventId, $event);

    return $updatedEvent->getId(); // Retourne l'ID de l'événement mis à jour
}

    public function deleteEvent($eventId)
    {
        $service = new Calendar($this->client);

        $service->events->delete('primary', $eventId);
    }

    public function getEvent($eventId)
    {
        $service = new Calendar($this->client);

        $event = $service->events->get('primary', $eventId);

        return $event->getSummary(); // Par exemple, retournez le résumé de l'événement
    }
}
