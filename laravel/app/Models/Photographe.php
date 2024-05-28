<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photographe extends Model
{
    use HasFactory;

    public function photo(){
        return $this->hasMany(Photo::class);
    }

    public function rendez_vous(){
        return $this->hasMany(RendezVous::class);
    }

    public function commentaire(){
        return $this->hasMany(Commentaire::class);
    }

    public function disponibilite(){
        return $this->hasMany(Disponibilite::class);
    }
    public function categories(){
        return $this->belongsToMany(Categorie::class, 'avoirs', 'photographe_id', 'categorie_id');
    }


}
