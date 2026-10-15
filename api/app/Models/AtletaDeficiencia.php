<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AtletaDeficiencia extends Model
{
    protected $table = 'atletas_deficiencias';

    protected $fillable = [
        'atleta_id',
        'deficiencia_id',
        'possui_laudo',
    ];

    protected $casts = [
        'possui_laudo' => 'boolean',
    ];

    public $timestamps = false;

    public function atleta(): BelongsTo
    {
        return $this->belongsTo(Atleta::class);
    }

    public function deficiencia(): BelongsTo
    {
        return $this->belongsTo(Deficiencia::class);
    }
}