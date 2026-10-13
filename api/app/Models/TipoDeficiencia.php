<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoDeficiencia extends Model
{
    protected $table = 'tipos_deficiencias';

    protected $fillable = [
        'id',
        'tipo',
        'descricao',
    ];

    public $timestamps = false;
}
