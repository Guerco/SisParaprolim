import { TABELA } from "../../../../config/tabela";
import { CepListagem } from "../../../dto/Cep/CepListagem";
import { CepBuscaConfig } from "../busca/CepBuscaConfig";
import type { ListagemConfig } from "./ListagemConfig";

export const CepListagemConfig: ListagemConfig<CepListagem> = {
    titulo: 'CEPs',
    colunas: [
        {
            campo: 'id',
            alias: 'ID',
            largura: 10,
        },
        {
            campo: 'cep',
            alias: 'CEP',
            largura: 20,
            formatar: (valor) => {
                const cep = String(valor ?? '').replace(/\D/g, '').slice(0, 8);

                return cep.replace(/(\d{5})(\d{0,3})/, (_, p1, p2) =>
                    p2 ? `${p1}-${p2}` : p1
                );
            },
        },
        {
            campo: 'logradouro',
            alias: 'Logradouro',
            largura: 30,
        },
        {
            campo: 'bairro',
            alias: 'Bairro',
            largura: 20,
        },
        {
            campo: 'cidade',
            alias: 'Cidade',
            largura: 20,
        },
        {
            campo: 'uf',
            alias: 'UF',
            largura: 10,
            formatar: (valor) => String(valor ?? '').toUpperCase(),
        },
    ],
    estadoInicial: {
        busca: '',
        ordenar: CepBuscaConfig.ordenacao.padrao.campo,
        direcao: CepBuscaConfig.ordenacao.padrao.direcao,
        filtros: {},
        page: TABELA.PAGE_PADRAO,
        por_pag: TABELA.POR_PAG_PADRAO,
    },
};