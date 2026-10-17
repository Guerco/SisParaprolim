<?php

namespace App\Http\Resources\Modalidade;

class ModalidadeListagemConfig
{
    public static function ordenaveis(): array
    {
        return [
            'id', 
            'nome',
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
            'nome',
        ];
    }
}