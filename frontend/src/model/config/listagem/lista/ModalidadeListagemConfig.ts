import { TABELA } from "../../../../config/tabela";
import { ModalidadeListagem } from "../../../dto/Modalidade/ModalidadeListagem";
import { ModalidadeBuscaConfig } from "../busca/ModalidadeBuscaConfig";
import type { ListagemConfig } from "./ListagemConfig";

export const ModalidadeListagemConfig: ListagemConfig<ModalidadeListagem> = {
    titulo: 'Modalidades',
    colunas: [
        {
            campo: 'id',
            alias: 'ID',
            largura: 10,
        },
        {
            campo: 'nome',
            alias: 'Nome',
            largura: 30,
        },
    ],
    estadoInicial: {
        busca: '',
        ordenar: ModalidadeBuscaConfig.ordenacao.padrao.campo,
        direcao: ModalidadeBuscaConfig.ordenacao.padrao.direcao,
        filtros: {},
        page: TABELA.PAGE_PADRAO,
        por_pag: TABELA.POR_PAG_PADRAO,
    },
};