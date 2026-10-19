import { TABELA } from "../../../../config/tabela";
import { AtletaListagem } from "../../../dto/Atleta/AtletaListagem";
import { AtletaBuscaConfig } from "../busca/AtletaBuscaConfig";
import type { ListagemConfig } from "./ListagemConfig";

export const AtletaListagemConfig: ListagemConfig<AtletaListagem> = {
    titulo: 'Atletas',
    colunas: [
        {
            campo: 'id',
            alias: 'ID',
            largura: 10,
        },
        {
            campo: 'num_cad',
            alias: 'Número de Cadastro',
            largura: 20,
        },
        {
            campo: 'nome',
            alias: 'Nome',
            largura: 20,
        },

        {
            campo: 'cpf',
            alias: 'CPF',
            largura: 20,
            formatar: (valor) => {
                const cpf = String(valor ?? '').replace(/\D/g, '').slice(0, 11);

                return cpf.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
                    (_, p1, p2, p3, p4) =>
                        `${p1}.${p2}.${p3}${p4 ? `-${p4}` : ''}`
                );
            },
        },
        {
            campo: 'sexo',
            alias: 'Sexo',
            largura: 20,
            formatar: (valor) => {
                const sexo = String(valor ?? '').toUpperCase();

                return sexo === 'M'
                    ? '♂'
                    : sexo === 'F'
                        ? '♀'
                        : String(valor ?? '');
            },
        },
        {
            campo: 'data_nascimento',
            alias: 'Data de Nascimento',
            largura: 20,
            formatar: (valor) => {
                if (!valor) return '';

                const data = new Date(String(valor));

                if (Number.isNaN(data.getTime())) return String(valor);

                return data.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    timeZone: 'UTC',
                });
            },
        }
        ,
        {
            campo: 'esta_ativo',
            alias: 'Ativo',
            largura: 20,
            formatar: (valor) => (valor ? 'Sim' : 'Não'),
        }],
    estadoInicial: {
        busca: '',
        ordenar: AtletaBuscaConfig.ordenacao.padrao.campo,
        direcao: AtletaBuscaConfig.ordenacao.padrao.direcao,
        filtros: {},
        page: TABELA.PAGE_PADRAO,
        por_pag: TABELA.POR_PAG_PADRAO,
    },
};