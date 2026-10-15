<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function atletas(): BelongsToMany
    {
        return $this->belongsToMany(Atleta::class, 'atletas_deficiencias')
            ->withPivot('possui_laudo');
    }
}
