<?php

namespace App\Listeners;

use App\Events\RendezVousProcheEvent;
use App\Notifications\RendezVousNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class RendezVousProcheListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(RendezVousProcheEvent $event)
    {
        $rendezVous = $event->rendezVous;
        
        // Envoyer la notification par email
        $rendezVous->user->notify(new RendezVousNotification($rendezVous));
    }
}
