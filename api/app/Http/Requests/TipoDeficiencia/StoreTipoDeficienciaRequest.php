<?php

namespace App\Http\Requests\TipoDeficiencia;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; 

class StoreTipoDeficienciaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $dados = [];

        if ($this->has('tipo')) {
            $dados['tipo'] = strtoupper(trim($this->tipo ?? ''));
        }

        if ($this->has('descricao')) {
            $dados['descricao'] = ucwords(trim($this->descricao ?? ''));
        }

        $this->merge($dados);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('modalidade')?->id;

        $regras = [
            'tipo' => [
                'required',
                'string',
                'max:2',
                Rule::unique('tipos_deficiencias', 'tipo')->ignore($id),
            ],
            'descricao' => [
                'required',
                'string',
                'max:200',
                Rule::unique('tipos_deficiencias', 'descricao')->ignore($id),
            ],
        ];

        return $regras;
    }

    public function messages() : array {
        return [
            'tipo.required' => 'O tipo não foi informado.',
            'tipo.string' => 'O tipo deve ser uma string válida.',
            'tipo.max' => 'O tipo deve possuir no máximo 2 caracteres.',  
            'tipo.unique' => 'O tipo informado já está em uso.',

            'descricao.required' => 'A descrição não foi informada.',
            'descricao.string' => 'A descrição deve ser uma string válida.',
            'descricao.max' => 'A descrição deve possuir no máximo 200 caracteres.',  
            'descricao.unique' => 'A descrição informada já está em uso.',
        ];
    }
}
