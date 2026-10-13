<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModalidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modalidades = [
            'Atletismo',
            'Esgrima',
            'Goalball',
            'Halterofilismo',
            'Judô',
            'Natação',
            'Tênis de Mesa',
            'Tênis de Quadra',
            'Tiro Esportivo',
            'Tiro com Arco',
        ];

        foreach ($modalidades as $nome) {
            \App\Models\Modalidade::create(['nome' => $nome]);
        }
    }
}
