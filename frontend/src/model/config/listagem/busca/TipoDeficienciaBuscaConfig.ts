import { textoBusca, type BuscaConfig } from "./BuscaConfig";
import { TipoDeficienciaListagem } from "../../../dto/TipoDeficiencia/TipoDeficienciaListagem";

export const TipoDeficienciaBuscaConfig: BuscaConfig<TipoDeficienciaListagem> = {
    ordenacao: {
        ordenaveis: [
            { campo: 'id', alias: 'ID' },
            { campo: 'tipo', alias: 'Tipo' },
            { campo: 'descricao', alias: 'Descrição' },
        ],
        padrao: { campo: 'id', direcao: 'asc' },
    },
    filtragem: {
        filtraveis: [],
    },
    busca: {
        campos: [
            { campo: 'tipo', alias: 'Tipo' },
            { campo: 'descricao', alias: 'Descrição' },
        ],
        get texto() {
            return textoBusca(this.campos);
        },
    },
};