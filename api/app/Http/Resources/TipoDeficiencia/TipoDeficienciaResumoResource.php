<?php

namespace App\Http\Resources\TipoDeficiencia;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TipoDeficienciaResumoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'tipo' => $this->tipo,
            'descricao' => $this->descricao,
        ];
    }
}
