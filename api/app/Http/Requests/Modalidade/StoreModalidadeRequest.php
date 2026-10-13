<?php

namespace App\Http\Requests\Modalidade;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreModalidadeRequest extends FormRequest
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
        $this->merge([
            'nome' => ucwords(trim($this->nome ?? '')),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('modalidade');

        $regras = [
            'nome' => [
                'required', 
                'string',
                'max:200',
                Rule::unique('modalidades', 'nome')->ignore($id),
            ] ,
        ];

        return $regras;
    }

    public function messages() : array {
        return [
            'nome.required' => 'O nome não foi informado.',
            'nome.string' => 'O nome deve ser uma string válida.',
            'nome.max' => 'O nome deve possuir no máximo 200 caracteres.',  
            'nome.unique' => 'O nome informado já está em uso.',
        ];
    }
}
