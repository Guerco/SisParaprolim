<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Atleta extends Model
{
    use HasFactory;
    
    protected $table = 'atletas';

    protected $fillable = [
        // 'num_cad',
        'nome',
        'data_nascimento',
        'uf_nascimento',
        'sexo',
        'estado_civil',
        'data_admissao',
        'telefone_1',
        'telefone_2',
        'email',
        'nis',
        'cpf',
        'org_expedidor_documento',
        'uf_registro_documento',
        'data_expedicao_documento',
        'nome_mae',
        'nome_pai',
        'responsavel',
        'cpf_responsavel',
        'endereco_cep',
        'endereco_logradouro',
        'endereco_numero',
        'endereco_complemento',
        'endereco_bairro',
        'endereco_cidade',
        'endereco_uf',
        'validade_termo_imagem',
        'cuidados_especiais',
        // 'esta_ativo',
        // 'inativado_em',
    ];

    protected $casts = [
        'data_nascimento' => 'date',
        'data_admissao' => 'date',
        'data_expedicao_documento' => 'date',
        'validade_termo_imagem' => 'date',
        'validade_atestado' => 'date',
        'esta_ativo' => 'boolean',
        'inativado_em' => 'datetime',
    ];

    public $timestamps = false;

    public function deficiencias(): BelongsToMany
    {
        return $this->belongsToMany(Deficiencia::class, 'atletas_deficiencias')
            ->withPivot('possui_laudo');
    }

    public function modalidades(): BelongsToMany
    {
        return $this->belongsToMany(Modalidade::class, 'atletas_modalidades')
            ->withPivot('classe', 'validade_atestado');
    }

    public function atletaDeficiencias(): HasMany
    {
        return $this->hasMany(AtletaDeficiencia::class);
    }

    public function atletaModalidades(): HasMany
    {
        return $this->hasMany(AtletaModalidade::class);
    }
}