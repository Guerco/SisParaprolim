export type BuscaConfig<T> = {
    ordenacao: {
        ordenaveis: { campo: keyof T & string; alias: string }[];
        padrao: { campo: keyof T & string; direcao: 'asc' | 'desc' };
    };
    filtragem: {
        filtraveis: {
            campo: keyof T & string;
            alias: string;
            opcoes: { alias: string; valor: string; padrao?: boolean }[];
        }[];
    };
    busca: {
        campos: { campo: keyof T & string; alias: string }[];
        readonly texto: string;
    };
};

export function textoBusca(campos: { alias: string }[]): string {
    return campos.length
        ? `Buscar por ${new Intl.ListFormat('pt-BR', { type: 'disjunction' }).format(campos.map(c => c.alias))}`
        : '';
}