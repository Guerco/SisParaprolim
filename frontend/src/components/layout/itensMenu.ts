export type ItemMenu =
    | { descricao: string; rota: string }
    | { descricao: string; subitens: ItemMenu[] };

export const ITENS_MENU: ItemMenu[] = [
    {
        descricao: 'Listagem',
        subitens: [
            { descricao: 'Atletas', rota: '/listagem/atletas' },
            { descricao: 'Modalidades', rota: '/listagem/modalidades' },
            { descricao: 'Deficiências', rota: '/listagem/deficiencias' },
            { descricao: 'Tipos de Deficiência', rota: '/listagem/tipos-deficiencias' },
            { descricao: 'CEPs', rota: '/listagem/ceps' },
        ],
    },
];