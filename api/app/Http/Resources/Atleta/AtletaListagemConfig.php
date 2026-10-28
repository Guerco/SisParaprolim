<?php

namespace App\Http\Resources\Atleta;

class AtletaListagemConfig
{
    public static function ordenaveis(): array
    {
        return [
            // 'id',
            'num_cad',
            'nome',
            'data_nascimento',
            'data_vencimento_atestado',
        ];
    }

    public static function ordenacaoPadrao(): array
    {
        return [
            'campo' => 'num_cad',
            'direcao' => 'asc',
        ];
    }

    public static function filtraveis(): array
    {
        return [
            'data_vencimento_atestado' => ['tipo' => 'data'],
            'esta_ativo' => ['tipo' => 'boolean', 'opcoes' => [true, false]],
            'sexo' => ['tipo' => 'enum', 'opcoes' => ['M', 'F']],
        ];
    }

    public static function buscaveis(): array
    {
        return [
            'nome',
            'cpf',
            'num_cad',
        ];
    }
}