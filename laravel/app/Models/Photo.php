<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    public function photo(){
        return $this->belongsTo(Photographe::class, "photographe_id", "id");
    }
}
