import { textoBusca, type BuscaConfig } from "./BuscaConfig";
import { CepListagem } from "../../../dto/Cep/CepListagem";

export const CepBuscaConfig: BuscaConfig<CepListagem> = {
    ordenacao: {
        ordenaveis: [
            { campo: 'id', alias: 'ID' },
            // { campo: 'cep', alias: 'CEP' },
            // { campo: 'logradouro', alias: 'Logradouro' },
            // { campo: 'bairro', alias: 'Bairro' },
            { campo: 'cidade', alias: 'Cidade' },
            // { campo: 'uf', alias: 'UF' },
        ],
        padrao: { campo: 'id', direcao: 'asc' },
    },
    filtragem: {
        filtraveis: [
            {
                campo: 'uf',
                alias: 'UF',
                opcoes: [
                    { alias: '—', valor: '', padrao: true },
                    ...[
                        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
                        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
                        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
                    ].map((uf) => ({ alias: uf, valor: uf })),
                ],
            },
        ],
    },
    busca: {
        campos: [
            { campo: 'cep', alias: 'CEP' },
            { campo: 'logradouro', alias: 'Logradouro' },
            { campo: 'bairro', alias: 'Bairro' },
            { campo: 'cidade', alias: 'Cidade' },
        ],
        get texto() {
            return textoBusca(this.campos);
        },
    },
};