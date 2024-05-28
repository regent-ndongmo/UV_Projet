<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory  ;

    // public function avoir(){
    //     return $this->hasMany(Categorie::class);
    // }

    public function photo(){
        return $this->hasMany(Photo::class);
    }

    // Relation avec le modèle Photographe via la table pivot 'avoirs'
    public function photographes(){
        return $this->belongsToMany(Photographe::class, 'avoirs', 'categorie_id', 'photographe_id');
    }
}
