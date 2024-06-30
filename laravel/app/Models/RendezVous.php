<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RendezVous extends Model
{
    use HasFactory;
    protected $table = 'rendez_vous';
    protected $fillable =['date','heure_debut','heure_fin','status','photographe_id','contrat_id','nom_client','lieux'];

    public function contrat(){
        return $this->belongsTo(Contrat::class);
    }

    public function photographe(){
        return $this->belongsTo(Photographe::class);
    }
}
