<?php

namespace App\Http\Resources\Cep;

class CepListagemConfig
{
    public static function ordenaveis(): array
    {
        return [
            'id',
            // 'cep',
            // 'logradouro',
            // 'bairro',
            'cidade',
            // 'uf',
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
            'uf' => [
                'tipo' => 'enum',
                'opcoes' => [
                    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
                    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
                    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
                ],
            ],
        ];
    }

    public static function buscaveis(): array
    {
        return [
            'cep',
            'logradouro',
            'bairro',
            'cidade',
        ];
    }
}