<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disponibilite extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_debut',
        'photographe_id',
        'date_fin',
        'libele',
    ];

    public function photographe(){
        return $this->belongsTo(Photographe::class);
    }
}
