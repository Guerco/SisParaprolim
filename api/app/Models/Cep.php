<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cep extends Model
{
    protected $table = 'ceps';

    protected $fillable = [
        'cep',
        'logradouro',
        'bairro',
        'cidade',
        'uf',
    ];

    public $timestamps = false;
}
