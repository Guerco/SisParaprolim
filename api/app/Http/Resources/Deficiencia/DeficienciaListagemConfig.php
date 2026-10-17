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
            // 'tipo_deficiencia', // No banco é tipo_deficiencia_id, mas não é texto. Cuidado ao ordenar por relação.
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
            // 'tipo_deficiencia_id' => [
            //     'tipo' => 'enum', // Poderia ser integer/exato se você passar o ID. Como é enum fixo, vamos deixar o ID ou a sigla.
            //     'opcoes' => ['DF', 'DA', 'DV', 'DI'], 
            // ],
        ];
    }

    public static function buscaveis(): array
    {
        return [
            'cid_10',
            'descricao_deficiencia',
            // 'tipo_deficiencia', // Aqui é onde o problema mora, pois o campo no banco é tipo_deficiencia_id
        ];
    }
}