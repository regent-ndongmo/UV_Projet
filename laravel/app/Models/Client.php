<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Client extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email_client',
        'password_client',
    ];

    protected $hidden = [
        'password_client',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordClientAttribute($value)
    {
        $this->attributes['password_client'] = bcrypt($value);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }


}
