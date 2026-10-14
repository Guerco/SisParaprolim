<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoDeficiencia extends Model
{
    protected $table = 'tipos_deficiencias';

    protected $fillable = [
        'tipo',
        'descricao',
    ];

    public $timestamps = false;

    public function deficiencias(): HasMany
    {
        return $this->hasMany(Deficiencia::class, 'tipo_deficiencia_id');
    }
}