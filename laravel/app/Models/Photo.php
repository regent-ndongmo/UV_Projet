<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    public function photographe(){
        return $this->belongsTo(Photographe::class, "photographe_id", "id");
    }

    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }
}