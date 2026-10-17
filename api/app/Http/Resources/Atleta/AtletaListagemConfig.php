<?php

namespace App\Http\Resources\Atleta;

class AtletaListagemConfig
{
    public static function ordenaveis(): array
    {
        return [
            'id',
            'num_cad',
            'nome',
            'data_nascimento',
        ];
    }

    public static function ordenacaoPadrao(): array
    {
        return [
            'campo' => 'id',
            'direcao' => 'asc',
        ];
    }

    public static function filtraveis(): array
    {
        return [
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