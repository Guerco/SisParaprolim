<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deficiencia extends Model
{
    protected $table = 'deficiencias';

    protected $fillable = [
        'cid_10',
        'descricao_deficiencia',
        'tipo_deficiencia_id',
    ];

    public $timestamps = false;

    public function tipoDeficiencia() {
        return $this->belongsTo(
            TipoDeficiencia::class,
            'tipo_deficiencia_id'
        );
    }
}
