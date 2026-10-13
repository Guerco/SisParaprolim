<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoDeficiencia;

class TipoDeficienciaSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = [
            [
                'tipo' => 'DF',
                'descricao' => 'Deficiência Física',
            ],
            [
                'tipo' => 'DA',
                'descricao' => 'Deficiência Auditiva',
            ],
            [
                'tipo' => 'DV',
                'descricao' => 'Deficiência Visual',
            ],
            [
                'tipo' => 'DI',
                'descricao' => 'Deficiência Intelectual',
            ],
        ];

        foreach ($tipos as $tipo) {
            TipoDeficiencia::create($tipo);
        }
    }
}