<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Modalidade extends Model
{
    protected $table = 'modalidades';

    protected $fillable = [
        'nome',
    ];

    public $timestamps = false;

    public function atletas(): BelongsToMany
    {
        return $this->belongsToMany(Atleta::class, 'atletas_modalidades')
            ->withPivot('classe', 'validade_atestado');
    }
}
