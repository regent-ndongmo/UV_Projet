<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photographe extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'nom', 'ville', 'pays', 'numero', 'photo', 'signature', 'description'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

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
