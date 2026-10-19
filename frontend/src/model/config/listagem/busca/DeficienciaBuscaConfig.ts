import { textoBusca, type BuscaConfig } from "./BuscaConfig";
import { DeficienciaListagem } from "../../../dto/Deficiencia/DeficienciaListagem";

export const DeficienciaBuscaConfig: BuscaConfig<DeficienciaListagem> = {
    ordenacao: {
        ordenaveis: [
            { campo: 'id', alias: 'ID' },
            { campo: 'cid_10', alias: 'CID-10' },
            { campo: 'descricao_deficiencia', alias: 'Descrição' },
            // { campo: 'tipo_deficiencia', alias: 'Tipo' }, // No banco é tipo_deficiencia_id, mas não é texto. Cuidado ao ordenar por relação.
        ],
        padrao: { campo: 'id', direcao: 'asc' },
    },
    filtragem: {
        filtraveis: [
            // {
            //     campo: 'tipo_deficiencia_id',
            //     alias: 'Tipo',
            //     opcoes: [
            //         { alias: '—', valor: '', padrao: true },
            //         { alias: 'DF', valor: 'DF' },
            //         { alias: 'DA', valor: 'DA' },
            //         { alias: 'DV', valor: 'DV' },
            //         { alias: 'DI', valor: 'DI' },
            //     ],
            // },
        ],
    },
    busca: {
        campos: [
            { campo: 'cid_10', alias: 'CID-10' },
            { campo: 'descricao_deficiencia', alias: 'Descrição' },
            // { campo: 'tipo_deficiencia', alias: 'Tipo' }, // Aqui é onde o problema mora, pois o campo no banco é tipo_deficiencia_id
        ],
        get texto() {
            return textoBusca(this.campos);
        },
    },
};