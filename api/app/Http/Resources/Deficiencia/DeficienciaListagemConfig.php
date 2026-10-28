<?php

namespace App\Http\Resources\Deficiencia;

class DeficienciaListagemConfig
{
    public static function ordenaveis(): array
    {
        return [
            'id', 
            'cid_10', 
            'descricao_deficiencia',
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
            'tipo' => [
                'tipo' => 'enum',
                'opcoes' => ['DF', 'DA', 'DV', 'DI'], 
            ],
        ];
    }

    public static function buscaveis(): array
    {
        return [
            'cid_10',
            'descricao_deficiencia',
        ];
    }
}