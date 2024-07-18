<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'categorie_id',
        'photographe_id',
        'titre',
        'url_image',
        'description',
        'prix',
    ];

    public function photographe(){
        return $this->belongsTo(Photographe::class, "photographe_id", "id");
    }

    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
