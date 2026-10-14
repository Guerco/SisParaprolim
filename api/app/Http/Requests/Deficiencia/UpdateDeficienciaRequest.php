<?php

namespace App\Http\Requests\Deficiencia;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDeficienciaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $dados = [];

        if ($this->has('cid_10')) {
            $dados['cid_10'] = strtoupper(trim($this->cid_10 ?? ''));
        }

        if ($this->has('descricao_deficiencia')) {
            $dados['descricao_deficiencia'] = trim($this->descricao_deficiencia ?? '');
        }

        if ($this->has('tipo_deficiencia_id')) {
            $dados['tipo_deficiencia_id'] = (int) $this->tipo_deficiencia_id;
        }

        $this->merge($dados);
    }

    public function rules(): array
    {
        $id = $this->route('deficiencia');

        return [
            'cid_10' => [
                'sometimes',
                'required',
                'string',
                'max:10',
                Rule::unique('deficiencias', 'cid_10')->ignore($id),
            ],
            'tipo_deficiencia_id' => [
                'sometimes',
                'required',
                'integer',
                'exists:tipos_deficiencias,id',
            ],
            'descricao_deficiencia' => [
                'sometimes',
                'required',
                'string',
                'min:3',
                'max:200',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'cid_10.required' => 'O CID-10 não foi informado.',
            'cid_10.string' => 'O CID-10 deve ser uma string válida.',
            'cid_10.max' => 'O CID-10 deve possuir no máximo 10 caracteres.',
            'cid_10.unique' => 'O CID-10 informado já está cadastrado.',

            'tipo_deficiencia_id.required' => 'O tipo de deficiência não foi informado.',
            'tipo_deficiencia_id.integer' => 'O tipo de deficiência deve ser um número inteiro.',
            'tipo_deficiencia_id.exists' => 'Não há tipo de deficiência com o ID informado.',

            'descricao_deficiencia.required' => 'A descrição não foi informada.',
            'descricao_deficiencia.string' => 'A descrição deve ser uma string válida.',
            'descricao_deficiencia.min' => 'A descrição deve possuir no mínimo 3 caracteres.',
            'descricao_deficiencia.max' => 'A descrição deve possuir no máximo 200 caracteres.',
        ];
    }
}