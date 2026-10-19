import { textoBusca, type BuscaConfig } from "./BuscaConfig";
import { AtletaListagem } from "../../../dto/Atleta/AtletaListagem";

export const AtletaBuscaConfig: BuscaConfig<AtletaListagem> = {
    ordenacao: {
        ordenaveis: [
            { campo: 'id', alias: 'ID' },
            { campo: 'num_cad', alias: 'Número de Cadastro' },
            { campo: 'nome', alias: 'Nome' },
            { campo: 'data_nascimento', alias: 'Data de Nascimento' },
        ],
        padrao: { campo: 'id', direcao: 'asc' },
    },
    filtragem: {
        filtraveis: [
            {
                campo: 'esta_ativo',
                alias: 'Ativo',
                opcoes: [
                    {
                        alias: '—',
                        valor: '',
                        padrao: true,
                    },
                    {
                        alias: 'Sim',
                        valor: 'true',
                    },
                    {
                        alias: 'Não',
                        valor: 'false',
                    },
                ],
            },
            {
                campo: 'sexo',
                alias: 'Sexo',
                opcoes: [
                    {
                        alias: '—',
                        valor: '',
                        padrao: true,
                    },
                    {
                        alias: 'Feminino',
                        valor: 'F',
                    },
                    {
                        alias: 'Masculino',
                        valor: 'M',
                    },
                ],
            },
        ],
    },
    busca: {
        campos: [
            { campo: 'nome', alias: 'Nome' },
            { campo: 'cpf', alias: 'CPF' },
            { campo: 'num_cad', alias: 'Número de Cadastro' },
        ],
        get texto() {
            return textoBusca(this.campos);
        },
    },
};