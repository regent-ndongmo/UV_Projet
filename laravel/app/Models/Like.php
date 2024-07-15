<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;


    public function photo(){
        return $this->belongsTo(Photo::class);
    }

    public function client(){
        return $this->belongsTo(Client::class);
    }

}
