<?php

namespace App\Http\Resources\Atleta;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AtletaListagemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'num_cad' => $this->num_cad,
            'nome' => $this->nome,
            'cpf' => $this->cpf,
            'sexo' => $this->sexo,
            'data_nascimento' => $this->data_nascimento?->format('Y-m-d'),
            'data_vencimento_atestado' => $this->data_vencimento_atestado?->format('Y-m-d'),
            'esta_ativo' => $this->esta_ativo,
        ];
    }
}