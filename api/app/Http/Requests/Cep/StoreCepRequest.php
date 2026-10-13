<?php

namespace App\Http\Requests\Cep;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCepRequest extends FormRequest
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

        if ($this->has('cep')) {
            $dados['cep'] = preg_replace('/\D/', '', $this->cep ?? '');
        }

        if ($this->has('logradouro')) {
            $dados['logradouro'] = trim($this->logradouro ?? '');
        }

        if ($this->has('bairro')) {
            $dados['bairro'] = trim($this->bairro ?? '');
        }

        if ($this->has('cidade')) {
            $dados['cidade'] = trim($this->cidade ?? '');
        }

        if ($this->has('uf')) {
            $dados['uf'] = strtoupper(trim($this->uf ?? ''));
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
        return [
            'cep' => [
                'required',
                'string',
                'digits:8',
                Rule::unique('ceps', 'cep'),
            ],
            'logradouro' => [
                'required',
                'string',
                'min:3',
                'max:200',
            ],
            'bairro' => [
                'required',
                'string',
                'min:3',
                'max:200',
            ],
            'cidade' => [
                'required',
                'string',
                'min:3',
                'max:200',
            ],
            'uf' => [
                'required',
                'string',
                'size:2',
            ],
        ];
    }

    /**
     * Custom error messages.
     */
    public function messages(): array
    {
        return [
            'cep.required' => 'O CEP não foi informado.',
            'cep.string' => 'O CEP deve ser uma string válida.',
            'cep.digits' => 'O CEP deve possuir exatamente 8 dígitos.',
            'cep.unique' => 'O CEP informado já está cadastrado.',

            'logradouro.required' => 'O logradouro não foi informado.',
            'logradouro.string' => 'O logradouro deve ser uma string válida.',
            'logradouro.min' => 'O logradouro deve possuir no mínimo 3 caracteres.',
            'logradouro.max' => 'O logradouro deve possuir no máximo 200 caracteres.',

            'bairro.required' => 'O bairro não foi informado.',
            'bairro.string' => 'O bairro deve ser uma string válida.',
            'bairro.min' => 'O bairro deve possuir no mínimo 3 caracteres.',
            'bairro.max' => 'O bairro deve possuir no máximo 200 caracteres.',

            'cidade.required' => 'A cidade não foi informada.',
            'cidade.string' => 'A cidade deve ser uma string válida.',
            'cidade.min' => 'A cidade deve possuir no mínimo 3 caracteres.',
            'cidade.max' => 'A cidade deve possuir no máximo 200 caracteres.',

            'uf.required' => 'A UF não foi informada.',
            'uf.string' => 'A UF deve ser uma string válida.',
            'uf.size' => 'A UF deve possuir exatamente 2 caracteres.',
        ];
    }
}