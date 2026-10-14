<?php

namespace App\Http\Resources\Deficiencia;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeficienciaResource extends JsonResource
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
            'cid_10' => $this->cid_10,
            'descricao_deficiencia' => $this->descricao_deficiencia,
            'tipo_deficiencia' => [
                'id' => $this->tipoDeficiencia?->id,
                'tipo' => $this->tipoDeficiencia?->tipo,
                'descricao' => $this->tipoDeficiencia?->descricao,
            ],
        ];
    }
}
