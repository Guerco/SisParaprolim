import type { BuscaConfig } from "../../model/config/listagem/busca/BuscaConfig";
import type { Paginacao } from "../../model/dto/Paginacao";

export type EstadoBusca = {
    busca: string;
    ordenar: string;
    direcao: 'asc' | 'desc';
    filtros: Record<string, string>;
    page: number;
    por_pag: number;
};

export type ColunaListagem<T> = {
    campo: keyof T & string;
    alias: string;
    largura?: number; // em %
    formatar?: (valor: T[keyof T], linha: T) => string;
};

export type TabelaListagem<T> = {
    titulo?: string;
    colunas: ColunaListagem<T>[];
    paginacao: Paginacao<T>;
    estado: EstadoBusca;
    config: BuscaConfig<T>;
    exibir: {
        busca: boolean;
        filtragem: boolean;
        ordenacao: boolean;
    };
};