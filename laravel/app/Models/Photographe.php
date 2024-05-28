<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photographe extends Model
{
    use HasFactory;

    public function photographe(){
        return $this->hasMany(Photo::class);
    }
}
