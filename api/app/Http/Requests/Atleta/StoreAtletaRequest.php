<?php

namespace App\Http\Requests\Atleta;

use App\Rules\Cpf;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAtletaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function attributes(): array
    {
        return [
            'cpf' => 'CPF',
            'cpf_responsavel' => 'CPF do responsável',
        ];
    }

    protected function prepareForValidation(): void
    {
        $dados = [];

        $campos = [
            'nome',
            'uf_nascimento',
            'sexo',
            'estado_civil',
            'telefone_1',
            'telefone_2',
            'email',
            'org_expedidor_documento',
            'uf_registro_documento',
            'nome_mae',
            'nome_pai',
            'responsavel',
            'endereco_logradouro',
            'endereco_numero',
            'endereco_complemento',
            'endereco_bairro',
            'endereco_cidade',
            'endereco_uf',
            'cuidados_especiais',
            // 'esta_ativo',
            // 'inativado_em',
            'motivo_inatividade',
        ];

        foreach ($campos as $campo) {
            if ($this->has($campo)) {
                $dados[$campo] = trim((string) $this->$campo);
            }
        }

        if ($this->has('cpf')) {
            $dados['cpf'] = preg_replace('/\D/', '', $this->cpf ?? '');
        }

        if ($this->has('nis')) {
            $dados['nis'] = preg_replace('/\D/', '', $this->nis ?? '');
        }

        if ($this->has('cpf_responsavel')) {
            $dados['cpf_responsavel'] = preg_replace('/\D/', '', $this->cpf_responsavel ?? '');
        }

        if ($this->has('telefone_1')) {
            $dados['telefone_1'] = preg_replace('/\D/', '', $this->telefone_1 ?? '');
        }

        if ($this->has('telefone_2')) {
            $dados['telefone_2'] = preg_replace('/\D/', '', $this->telefone_2 ?? '');
        }

        if ($this->has('endereco_cep')) {
            $dados['endereco_cep'] = preg_replace('/\D/', '', $this->endereco_cep ?? '');
        }

        if ($this->has('sexo')) {
            $dados['sexo'] = strtoupper(trim($this->sexo ?? ''));
        }

        if ($this->has('uf_nascimento')) {
            $dados['uf_nascimento'] = strtoupper(trim($this->uf_nascimento ?? ''));
        }

        if ($this->has('uf_registro_documento')) {
            $dados['uf_registro_documento'] = strtoupper(trim($this->uf_registro_documento ?? ''));
        }

        if ($this->has('endereco_uf')) {
            $dados['endereco_uf'] = strtoupper(trim($this->endereco_uf ?? ''));
        }

        if ($this->has('estado_civil')) {
            $dados['estado_civil'] = strtoupper(trim($this->estado_civil ?? ''));
        }

        if ($this->has('motivo_inatividade')) {
            $dados['motivo_inatividade'] = strtoupper(trim($this->motivo_inatividade ?? ''));
        }

        $this->merge($dados);
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'min:3', 'max:200'],
            'data_nascimento' => ['required', 'date', 'date_format:Y-m-d', 'before:today'],
            'uf_nascimento' => ['required', 'string', 'size:2'],
            'sexo' => ['required', Rule::in(['M', 'F'])],
            'estado_civil' => ['nullable', 'string', 'size:1'],
            'data_admissao' => ['nullable', 'date', 'date_format:Y-m-d'],

            'telefone_1' => ['nullable', 'digits_between:8,11'],
            'telefone_2' => ['nullable', 'digits_between:8,11'],
            'email' => ['nullable', 'email', 'max:100'],

            'nis' => ['nullable', 'digits:11', Rule::unique('atletas', 'nis')],
            'cpf' => ['required', 'digits:11', Rule::unique('atletas', 'cpf'), new Cpf()],
            'cpf_responsavel' => ['nullable', 'digits:11', new Cpf()],

            'org_expedidor_documento' => ['nullable', 'string', 'max:50'],
            'uf_registro_documento' => ['nullable', 'string', 'size:2'],
            'data_expedicao_documento' => ['nullable', 'date', 'date_format:Y-m-d'],

            'nome_mae' => ['nullable', 'string', 'max:200'],
            'nome_pai' => ['nullable', 'string', 'max:200'],
            'responsavel' => ['nullable', 'string', 'max:20'],

            'endereco_cep' => ['nullable', 'digits:8'],
            'endereco_logradouro' => ['nullable', 'string', 'max:200'],
            'endereco_numero' => ['nullable', 'string', 'max:20'],
            'endereco_complemento' => ['nullable', 'string', 'max:200'],
            'endereco_bairro' => ['nullable', 'string', 'max:200'],
            'endereco_cidade' => ['nullable', 'string', 'max:200'],
            'endereco_uf' => ['nullable', 'string', 'size:2'],

            'validade_termo_imagem' => ['nullable', 'date', 'date_format:Y-m-d'],
            'data_emissao_atestado' => ['sometimes', 'nullable', 'date', 'date_format:Y-m-d'],
            'data_vencimento_atestado' => ['sometimes', 'nullable', 'date', 'date_format:Y-m-d'],

            'cuidados_especiais' => ['nullable', 'string', 'max:300'],

            'esta_ativo' => ['sometimes', 'boolean'],
            'motivo_inatividade' => ['sometimes', 'nullable', 'string', 'max:100'],
            'inativado_em' => ['sometimes', 'nullable', 'date', 'date_format:Y-m-d'],

            'deficiencias' => ['nullable', 'array'],
            'deficiencias.*.deficiencia_id' => ['required', 'integer', 'exists:deficiencias,id'],
            'deficiencias.*.possui_laudo' => ['required', 'boolean'],

            'modalidades' => ['nullable', 'array'],
            'modalidades.*.modalidade_id' => ['required', 'integer', 'exists:modalidades,id'],
            'modalidades.*.classe' => ['nullable', 'string', 'max:100'],
            // 'modalidades.*.validade_atestado' => ['nullable', 'date', 'date_format:Y-m-d'],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome não foi informado.',
            'nome.string' => 'O nome deve ser uma string válida.',
            'nome.min' => 'O nome deve possuir no mínimo 3 caracteres.',
            'nome.max' => 'O nome deve possuir no máximo 200 caracteres.',

            'data_nascimento.required' => 'A data de nascimento não foi informada.',
            'data_nascimento.date' => 'A data de nascimento deve ser uma data válida.',
            'data_nascimento.date_format' => 'A data de nascimento deve seguir o formato \'AAAA-mm-dd\'.',
            'data_nascimento.before' => 'A data de nascimento deve ser anterior a hoje.',

            'uf_nascimento.required' => 'A UF de nascimento não foi informada.',
            'uf_nascimento.size' => 'A UF de nascimento deve possuir exatamente 2 caracteres.',

            'sexo.required' => 'O sexo não foi informado.',
            'sexo.in' => 'O sexo deve ser M ou F.',

            'estado_civil.string' => 'O estado civil deve ser uma string válida.',
            'estado_civil.size' => 'O estado civil deve possuir exatamente 1 caractere.',

            'data_admissao.date' => 'A data de admissão deve ser uma data válida.',
            'data_admissao.date_format' => 'A data de admissão deve seguir o formato \'AAAA-mm-dd\'.',

            'telefone_1.digits_between' => 'O telefone 1 deve possuir entre 8 e 11 dígitos.',
            'telefone_2.digits_between' => 'O telefone 2 deve possuir entre 8 e 11 dígitos.',
            'email.email' => 'O e-mail informado não é válido.',
            'email.max' => 'O e-mail deve possuir no máximo 100 caracteres.',

            'nis.digits' => 'O NIS deve possuir exatamente 11 dígitos.',
            'nis.unique' => 'O NIS informado já está cadastrado.',
            'cpf.required' => 'O CPF não foi informado.',
            'cpf.digits' => 'O CPF deve possuir exatamente 11 dígitos.',
            'cpf.unique' => 'O CPF informado já está cadastrado.',
            'cpf_responsavel.digits' => 'O CPF do responsável deve possuir exatamente 11 dígitos.',

            'org_expedidor_documento.max' => 'O órgão expedidor deve possuir no máximo 50 caracteres.',
            'uf_registro_documento.size' => 'A UF de registro deve possuir exatamente 2 caracteres.',
            'data_expedicao_documento.date' => 'A data de expedição deve ser uma data válida.',
            'data_expedicao_documento.date_format' => 'A data de expedição deve seguir o formato \'AAAA-mm-dd\'.',

            'nome_mae.max' => 'O nome da mãe deve possuir no máximo 200 caracteres.',
            'nome_pai.max' => 'O nome do pai deve possuir no máximo 200 caracteres.',
            'responsavel.max' => 'O responsável deve possuir no máximo 20 caracteres.',

            'endereco_cep.digits' => 'O CEP deve possuir exatamente 8 dígitos.',
            'endereco_logradouro.max' => 'O logradouro deve possuir no máximo 200 caracteres.',
            'endereco_numero.max' => 'O número deve possuir no máximo 20 caracteres.',
            'endereco_complemento.max' => 'O complemento deve possuir no máximo 200 caracteres.',
            'endereco_bairro.max' => 'O bairro deve possuir no máximo 200 caracteres.',
            'endereco_cidade.max' => 'A cidade deve possuir no máximo 200 caracteres.',
            'endereco_uf.size' => 'A UF do endereço deve possuir exatamente 2 caracteres.',

            'validade_termo_imagem.date' => 'A validade do termo de imagem deve ser uma data válida.',
            'validade_termo_imagem.date_format' => 'A validade do termo de imagem deve seguir o formato \'AAAA-mm-dd\'.',

            'data_emissao_atestado.date' => 'A data de emissão do atestado deve ser uma data válida.',
            'data_emissao_atestado.date_format' => 'A data de emissão do atestado deve seguir o formato \'AAAA-mm-dd\'.',

            'data_vencimento_atestado.date' => 'A data de vencimento do atestado deve ser uma data válida.',
            'data_vencimento_atestado.date_format' => 'A data de vencimento do atestado deve seguir o formato \'AAAA-mm-dd\'.',

            'cuidados_especiais.max' => 'Os cuidados especiais devem possuir no máximo 300 caracteres.',

            'esta_ativo.boolean' => 'O campo "ativo" deve ser verdadeiro ou falso.',
            'motivo_inatividade.string' => 'O motivo da inatividade deve ser um texto válido.',
            'motivo_inatividade.max' => 'O motivo da inatividade deve possuir no máximo 100 caracteres.',
            'inativado_em.date' => 'A data de inativação deve ser uma data válida.',
            'inativado_em.date_format' => 'A data de inativação deve seguir o formato \'AAAA-mm-dd\'.',

            'deficiencias.array' => 'As deficiências devem ser uma lista.',
            'deficiencias.*.deficiencia_id.required' => 'O ID da deficiência não foi informado.',
            'deficiencias.*.deficiencia_id.exists' => 'Não há deficiência com o ID informado.',
            'deficiencias.*.possui_laudo.required' => 'O campo "possui laudo" não foi informado.',
            'deficiencias.*.possui_laudo.boolean' => 'O campo "possui laudo" deve ser verdadeiro ou falso.',

            'modalidades.array' => 'As modalidades devem ser uma lista.',
            'modalidades.*.modalidade_id.required' => 'O ID da modalidade não foi informado.',
            'modalidades.*.modalidade_id.exists' => 'Não há modalidade com o ID informado.',
            'modalidades.*.classe.max' => 'A classe deve possuir no máximo 100 caracteres.',
            // 'modalidades.*.validade_atestado.date' => 'A validade do atestado deve ser uma data válida.',
            // 'modalidades.*.validade_atestado.date_format' => 'A validade do atestado deve seguir o formato \'AAAA-mm-dd\'.',
        ];
    }
}