import type { ColunaListagem, EstadoBusca } from "../../../../ui/elementos/TabelaListagem";

export type ListagemConfig<T> = {
    titulo: string,
    colunas: ColunaListagem<T>[],
    estadoInicial: EstadoBusca,
};