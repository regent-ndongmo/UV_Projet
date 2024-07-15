<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RendezVousNotification extends Notification
{
    use Queueable;

    protected $rendezVous;

    public function __construct($rendezVous)
    {
        $this->rendezVous = $rendezVous;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Rappel de rendez-vous imminent')
                    ->line('Votre rendez-vous avec ' . $this->rendezVous->nom_client . ' est proche.')
                    ->action('Voir le rendez-vous', url('/rendez-vous/' . $this->rendezVous->id))
                    ->line('Merci de votre utilisation de notre application !');
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
