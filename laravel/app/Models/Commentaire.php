<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    use HasFactory;
    protected $fillable = [
        'photographe_id',
        'nom_client',
        'ville_client',
        'description',
        'email_client',
    ];

    public function photographe(){
        return $this->belongsTo(Photographe::class);
    }

}
