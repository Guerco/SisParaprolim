export type PaginacaoRespostaLinks = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
};

export type PaginacaoRespostaMeta = {
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    per_page: number;
};

export default interface PaginacaoResposta<T> {
    data: T[];
    links: PaginacaoRespostaLinks;
    meta: PaginacaoRespostaMeta;
}