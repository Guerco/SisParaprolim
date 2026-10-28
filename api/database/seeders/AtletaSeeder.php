<?php

namespace Database\Seeders;

use App\Models\Atleta;
use Illuminate\Database\Seeder;

class AtletaSeeder extends Seeder
{
    public function run(): void
    {
        $qtd = 100;

        $atletas = Atleta::factory($qtd)->create();

        foreach ($atletas as $atleta) {
            $atleta->num_cad = 'P' . str_pad($atleta->id, 5, '0', STR_PAD_LEFT);
            $atleta->save();
        }
    }
}