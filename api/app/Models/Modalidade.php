<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modalidade extends Model
{
    protected $table = 'modalidades';

    protected $fillable = [
        'id',
        'nome',
    ];

    public $timestamps = false;
}
