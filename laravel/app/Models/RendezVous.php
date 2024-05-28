<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RendezVous extends Model
{
    use HasFactory;

    public function contrat(){
        return $this->belongsTo(Contrat::class);
    }

    public function photographe(){
        return $this->belongsTo(Photographe::class);
    }
}
