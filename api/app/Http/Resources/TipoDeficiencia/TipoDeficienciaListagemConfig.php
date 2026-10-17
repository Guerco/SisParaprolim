<?php

namespace App\Http\Resources\TipoDeficiencia;

class TipoDeficienciaListagemConfig
{
    public static function ordenaveis(): array
    {
        return [
            'id', 
            'tipo', 
            'descricao',
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
            // 
        ];
    }

    public static function buscaveis(): array
    {
        return [
            'tipo',
            'descricao',
        ];
    }
}