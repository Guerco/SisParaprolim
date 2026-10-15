<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AtletaModalidade extends Model
{
    protected $table = 'atletas_modalidades';

    protected $fillable = [
        'atleta_id',
        'modalidade_id',
        'classe',
        'validade_atestado',
    ];

    protected $casts = [
        'validade_atestado' => 'date',
    ];

    public $timestamps = false;

    public function atleta(): BelongsTo
    {
        return $this->belongsTo(Atleta::class);
    }

    public function modalidade(): BelongsTo
    {
        return $this->belongsTo(Modalidade::class);
    }
}