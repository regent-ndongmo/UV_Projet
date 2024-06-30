<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrat extends Model
{
    use HasFactory;
    protected $fillable = [
        'montant',
        'date',
        'status_paiement',
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'montant' => 'float',
    ];

    public function rendez_vous(){
        return $this->hasMany(RendezVous::class);
    }
}
