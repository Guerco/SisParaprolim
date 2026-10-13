<?php

namespace Database\Seeders;

use App\Models\Cep;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ceps = [
            ['cep' => '12345678', 'logradouro' => 'Rua A', 'bairro' => 'Centro', 'cidade' => 'Rio de Janeiro', 'uf' => 'RJ'],
            ['cep' => '11111111', 'logradouro' => 'Rua B', 'bairro' => 'Bairro 1', 'cidade' => 'Nova Friburgo', 'uf' => 'RJ'],
            ['cep' => '22222222', 'logradouro' => 'Rua C', 'bairro' => 'Bairro 2', 'cidade' => 'Macaé', 'uf' => 'RJ'],
        ];

        foreach ($ceps as $dados) {
            Cep::create($dados);
        }
    }
}
