import { AtletaDeficienciaCadastro } from './AtletaDeficienciaCadastro';
import { AtletaModalidadeCadastro } from './AtletaModalidadeCadastro';

export class AtletaCadastro {
    constructor(
        public readonly nome: string,
        public readonly data_nascimento: string,
        public readonly uf_nascimento: string,
        public readonly sexo: string,
        public readonly estado_civil: string | null,
        public readonly data_admissao: string | null,
        public readonly telefone_1: string | null,
        public readonly telefone_2: string | null,
        public readonly email: string | null,
        public readonly nis: string | null,
        public readonly cpf: string,
        public readonly org_expedidor_documento: string | null,
        public readonly uf_registro_documento: string | null,
        public readonly data_expedicao_documento: string | null,
        public readonly nome_mae: string | null,
        public readonly nome_pai: string | null,
        public readonly responsavel: string | null,
        public readonly cpf_responsavel: string | null,
        public readonly endereco_cep: string | null,
        public readonly endereco_logradouro: string | null,
        public readonly endereco_numero: string | null,
        public readonly endereco_complemento: string | null,
        public readonly endereco_bairro: string | null,
        public readonly endereco_cidade: string | null,
        public readonly endereco_uf: string | null,
        public readonly validade_termo_imagem: string | null,
        public readonly cuidados_especiais: string | null,
        public readonly deficiencias: AtletaDeficienciaCadastro[],
        public readonly modalidades: AtletaModalidadeCadastro[]
    ) {}
}