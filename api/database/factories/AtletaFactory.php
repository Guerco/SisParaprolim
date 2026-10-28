<?php

namespace Database\Factories;

use App\Models\Deficiencia;
use App\Models\Modalidade;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Atleta>
 */
class AtletaFactory extends Factory
{
    public function definition(): array
    {
        $estaAtivo = $this->faker->boolean(80);
        $dataEmissao = $this->faker->dateTimeBetween('-2 years', 'now');
        $dataVencimento = (clone $dataEmissao)->modify('+1 year');

        return [
            'nome' => $this->faker->name(),
            'data_nascimento' => $this->faker->dateTimeBetween('-60 years', '-10 years')->format('Y-m-d'),
            'uf_nascimento' => $this->faker->stateAbbr(),
            'sexo' => $this->faker->randomElement(['M', 'F']),
            'estado_civil' => $this->faker->randomElement(['S', 'C', 'D', 'V', 'O']),
            'data_admissao' => $this->faker->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'telefone_1' => $this->faker->numerify('###########'),
            'telefone_2' => $this->faker->optional()->numerify('###########'),
            'email' => $this->faker->unique()->safeEmail(),
            'nis' => $this->faker->unique()->numerify('###########'),
            'cpf' => $this->faker->unique()->cpf(false),
            'org_expedidor_documento' => $this->faker->randomElement(['SSP', 'DETRAN', 'IFP']),
            'uf_registro_documento' => $this->faker->stateAbbr(),
            'data_expedicao_documento' => $this->faker->dateTimeBetween('-10 years', 'now')->format('Y-m-d'),
            'nome_mae' => $this->faker->name('female'),
            'nome_pai' => $this->faker->name('male'),
            'responsavel' => $this->faker->optional()->randomElement(['Mãe', 'Pai', 'Próprio', 'Tia', 'Tio']),
            'cpf_responsavel' => $this->faker->optional()->cpf(false),
            'endereco_cep' => $this->faker->numerify('########'),
            'endereco_logradouro' => $this->faker->streetName(),
            'endereco_numero' => $this->faker->buildingNumber(),
            'endereco_complemento' => $this->faker->optional()->secondaryAddress(),
            'endereco_bairro' => $this->faker->citySuffix(),
            'endereco_cidade' => $this->faker->city(),
            'endereco_uf' => $this->faker->stateAbbr(),
            'validade_termo_imagem' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'data_emissao_atestado' => $dataEmissao->format('Y-m-d'),
            'data_vencimento_atestado' => $dataVencimento->format('Y-m-d'),
            'cuidados_especiais' => $this->faker->optional()->sentence(),
            'esta_ativo' => $estaAtivo,
            'motivo_inatividade' => $estaAtivo ? null : $this->faker->sentence(),
            'inativado_em' => $estaAtivo ? null : $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function ($atleta) {
            $deficienciaIds = Deficiencia::inRandomOrder()
                ->limit(rand(1, 3))
                ->pluck('id');

            $modalidadeIds = Modalidade::inRandomOrder()
                ->limit(rand(1, 3))
                ->pluck('id');

            $atleta->deficiencias()->attach($deficienciaIds);
            $atleta->modalidades()->attach($modalidadeIds);
        });
    }
}