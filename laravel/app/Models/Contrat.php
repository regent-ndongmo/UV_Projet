<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrat extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'montant',
        'date',
        'nom_client',
        'status_paiement',
        'photographe_id',
    ];

    protected $dates = [
        'date',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'montant' => 'float',
    ];

    public function contrat(){
        return $this->belongsTo(Contrat::class, "contrat_id", "id");
    }

    public function rendez_vous(){
        return $this->hasMany(RendezVous::class);
    }
}
