import { TABELA } from "../../../../config/tabela";
import { DeficienciaListagem } from "../../../dto/Deficiencia/DeficienciaListagem";
import { DeficienciaBuscaConfig } from "../busca/DeficienciaBuscaConfig";
import type { ListagemConfig } from "./ListagemConfig";

export const DeficienciaListagemConfig: ListagemConfig<DeficienciaListagem> = {
    titulo: 'Deficiências',
    colunas: [
        {
            campo: 'id',
            alias: 'ID',
            largura: 10,
        },
        {
            campo: 'cid_10',
            alias: 'CID-10',
            largura: 15,
        },
        {
            campo: 'descricao_deficiencia',
            alias: 'Descrição da Deficiência',
            largura: 40,
        },
        {
            campo: 'tipo_deficiencia',
            alias: 'Tipo de Deficiência',
            largura: 25,
        },
    ],
    estadoInicial: {
        busca: '',
        ordenar: DeficienciaBuscaConfig.ordenacao.padrao.campo,
        direcao: DeficienciaBuscaConfig.ordenacao.padrao.direcao,
        filtros: {},
        page: TABELA.PAGE_PADRAO,
        por_pag: TABELA.POR_PAG_PADRAO,
    },
};