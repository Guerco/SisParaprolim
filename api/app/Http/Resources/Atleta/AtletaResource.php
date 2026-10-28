<?php

namespace App\Http\Resources\Atleta;

use App\Http\Resources\Deficiencia\DeficienciaResource;
use App\Http\Resources\Deficiencia\DeficienciaResumoResource;
use App\Http\Resources\Modalidade\ModalidadeResource;
use App\Http\Resources\Modalidade\ModalidadeResumoResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AtletaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'num_cad' => $this->num_cad,
            'nome' => $this->nome,
            'data_nascimento' => $this->data_nascimento?->format('Y-m-d'),
            'uf_nascimento' => $this->uf_nascimento,
            'sexo' => $this->sexo,
            'estado_civil' => $this->estado_civil,
            'data_admissao' => $this->data_admissao?->format('Y-m-d'),
            'telefone_1' => $this->telefone_1,
            'telefone_2' => $this->telefone_2,
            'email' => $this->email,
            'nis' => $this->nis,
            'cpf' => $this->cpf,
            'org_expedidor_documento' => $this->org_expedidor_documento,
            'uf_registro_documento' => $this->uf_registro_documento,
            'data_expedicao_documento' => $this->data_expedicao_documento?->format('Y-m-d'),
            'nome_mae' => $this->nome_mae,
            'nome_pai' => $this->nome_pai,
            'responsavel' => $this->responsavel,
            'cpf_responsavel' => $this->cpf_responsavel,
            'endereco_cep' => $this->endereco_cep,
            'endereco_logradouro' => $this->endereco_logradouro,
            'endereco_numero' => $this->endereco_numero,
            'endereco_complemento' => $this->endereco_complemento,
            'endereco_bairro' => $this->endereco_bairro,
            'endereco_cidade' => $this->endereco_cidade,
            'endereco_uf' => $this->endereco_uf,
            'validade_termo_imagem' => $this->validade_termo_imagem?->format('Y-m-d'),
            'data_emissao_atestado' => $this->data_emissao_atestado?->format('Y-m-d'),
            'data_vencimento_atestado' => $this->data_vencimento_atestado?->format('Y-m-d'),
            'cuidados_especiais' => $this->cuidados_especiais,
            'esta_ativo' => $this->esta_ativo,
            'inativado_em' => $this->inativado_em?->format('Y-m-d H:i:s'),
            'motivo_inatividade' => $this->motivo_inatividade,
            'deficiencias' => $this->whenLoaded('atletaDeficiencias', function () {
                return $this->atletaDeficiencias->map(fn ($item) => [
                    'id' => $item->id,
                    'possui_laudo' => $item->possui_laudo,
                    'deficiencia' => new DeficienciaResource($item->deficiencia),
                ]);
            }),
            'modalidades' => $this->whenLoaded('atletaModalidades', function () {
                return $this->atletaModalidades->map(fn ($item) => [
                    'id' => $item->id,
                    'classe' => $item->classe,
                    // 'validade_atestado' => $item->validade_atestado?->format('Y-m-d'),
                    'modalidade' => new ModalidadeResource($item->modalidade),
                ]);
            }),
        ];
    }
}