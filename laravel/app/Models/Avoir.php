<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avoir extends Model
{
    use HasFactory;

    public function photographe(){
        return $this->belongsTo(Photographe::class);
    }

    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }

}
