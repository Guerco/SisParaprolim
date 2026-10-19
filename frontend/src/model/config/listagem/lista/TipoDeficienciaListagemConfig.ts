import { TABELA } from "../../../../config/tabela";
import { TipoDeficienciaListagem } from "../../../dto/TipoDeficiencia/TipoDeficienciaListagem";
import { TipoDeficienciaBuscaConfig } from "../busca/TipoDeficienciaBuscaConfig";
import type { ListagemConfig } from "./ListagemConfig";

export const TipoDeficienciaListagemConfig: ListagemConfig<TipoDeficienciaListagem> = {
    titulo: 'Tipos de Deficiência',
    colunas: [
        {
            campo: 'id',
            alias: 'ID',
            largura: 10,
        },
        {
            campo: 'tipo',
            alias: 'Tipo',
            largura: 25,
        },
        {
            campo: 'descricao',
            alias: 'Descrição',
            largura: 40,
        },
    ],
    estadoInicial: {
        busca: '',
        ordenar: TipoDeficienciaBuscaConfig.ordenacao.padrao.campo,
        direcao: TipoDeficienciaBuscaConfig.ordenacao.padrao.direcao,
        filtros: {},
        page: TABELA.PAGE_PADRAO,
        por_pag: TABELA.POR_PAG_PADRAO,
    },
};