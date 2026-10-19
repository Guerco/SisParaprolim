import { textoBusca, type BuscaConfig } from "./BuscaConfig";
import { ModalidadeListagem } from "../../../dto/Modalidade/ModalidadeListagem";

export const ModalidadeBuscaConfig: BuscaConfig<ModalidadeListagem> = {
    ordenacao: {
        ordenaveis: [
            { campo: 'id', alias: 'ID' },
            { campo: 'nome', alias: 'Nome' },
        ],
        padrao: { campo: 'id', direcao: 'asc' },
    },
    filtragem: {
        filtraveis: [],
    },
    busca: {
        campos: [
            { campo: 'nome', alias: 'Nome' },
        ],
        get texto() {
            return textoBusca(this.campos);
        },
    },
};