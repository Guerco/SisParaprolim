export enum MetodoHttp {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

const BASE_URL_API = '/api/';

const POR_PAG_PADRAO = 20;
const PAGE_PADRAO = 1;

export type ParamsBusca = {
    por_pag?: number;
    page?: number;
    busca?: string;
    ordenar_por?: string;
    direcao?: 'asc' | 'desc';
    [key: string]: any; // Permite os filtros dinâmicos (esta_ativo, sexo, uf, etc.)
};

const montarQuery = (params: ParamsBusca): string => {
    const q = new URLSearchParams();

    q.append('por_pag', String(params.por_pag ?? POR_PAG_PADRAO));
    q.append('page', String(params.page ?? PAGE_PADRAO));

    if (params.busca) q.append('busca', params.busca);
    if (params.ordenar_por) q.append('ordenar_por', params.ordenar_por);
    if (params.direcao) q.append('direcao', params.direcao);

    // Adiciona os filtros dinamicamente
    Object.keys(params).forEach((key) => {
        if (!['por_pag', 'page', 'busca', 'ordenar_por', 'direcao'].includes(key)) {
            const valor = params[key];
            if (valor !== undefined && valor !== null) {
                q.append(key, String(valor));
            }
        }
    });

    return '?' + q.toString();
};

export const rotasApi = {
    atleta: {
        index: {
            url: (params?: ParamsBusca) => BASE_URL_API + 'atletas' + montarQuery(params ?? {}),
            metodo: MetodoHttp.GET,
        },
        store: {
            url: BASE_URL_API + 'atletas',
            metodo: MetodoHttp.POST,
        },
        show: {
            url: (id: number) => BASE_URL_API + `atletas/${id}`,
            metodo: MetodoHttp.GET,
        },
        update: {
            url: (id: number) => BASE_URL_API + `atletas/${id}`,
            metodo: MetodoHttp.PUT,
        },
        destroy: {
            url: (id: number) => BASE_URL_API + `atletas/${id}`,
            metodo: MetodoHttp.DELETE,
        },
    },

    cep: {
        index: {
            url: (params?: ParamsBusca) => BASE_URL_API + 'ceps' + montarQuery(params ?? {}),
            metodo: MetodoHttp.GET,
        },
        store: {
            url: BASE_URL_API + 'ceps',
            metodo: MetodoHttp.POST,
        },
        buscarPorCep: {
            url: (cep: string) => BASE_URL_API + `ceps/buscar/${cep}`,
            metodo: MetodoHttp.GET,
        },
        show: {
            url: (id: number) => BASE_URL_API + `ceps/${id}`,
            metodo: MetodoHttp.GET,
        },
        update: {
            url: (id: number) => BASE_URL_API + `ceps/${id}`,
            metodo: MetodoHttp.PUT,
        },
        destroy: {
            url: (id: number) => BASE_URL_API + `ceps/${id}`,
            metodo: MetodoHttp.DELETE,
        },
    },

    deficiencia: {
        index: {
            url: (params?: ParamsBusca) => BASE_URL_API + 'deficiencias' + montarQuery(params ?? {}),
            metodo: MetodoHttp.GET,
        },
        store: {
            url: BASE_URL_API + 'deficiencias',
            metodo: MetodoHttp.POST,
        },
        show: {
            url: (id: number) => BASE_URL_API + `deficiencias/${id}`,
            metodo: MetodoHttp.GET,
        },
        update: {
            url: (id: number) => BASE_URL_API + `deficiencias/${id}`,
            metodo: MetodoHttp.PUT,
        },
        destroy: {
            url: (id: number) => BASE_URL_API + `deficiencias/${id}`,
            metodo: MetodoHttp.DELETE,
        },
        atletas: {
            url: (id: number, params?: ParamsBusca) => BASE_URL_API + `deficiencias/${id}/atletas` + montarQuery(params ?? {}),
            metodo: MetodoHttp.GET,
        },
    },

    modalidade: {
        index: {
            url: (params?: ParamsBusca) => BASE_URL_API + 'modalidades' + montarQuery(params ?? {}),
            metodo: MetodoHttp.GET,
        },
        store: {
            url: BASE_URL_API + 'modalidades',
            metodo: MetodoHttp.POST,
        },
        show: {
            url: (id: number) => BASE_URL_API + `modalidades/${id}`,
            metodo: MetodoHttp.GET,
        },
        update: {
            url: (id: number) => BASE_URL_API + `modalidades/${id}`,
            metodo: MetodoHttp.PUT,
        },
        destroy: {
            url: (id: number) => BASE_URL_API + `modalidades/${id}`,
            metodo: MetodoHttp.DELETE,
        },
        atletas: {
            url: (id: number, params?: ParamsBusca) => BASE_URL_API + `modalidades/${id}/atletas` + montarQuery(params ?? {}),
            metodo: MetodoHttp.GET,
        },
    },

    tipoDeficiencia: {
        index: {
            url: (params?: ParamsBusca) => BASE_URL_API + 'tipos-deficiencias' + montarQuery(params ?? {}),
            metodo: MetodoHttp.GET,
        },
        store: {
            url: BASE_URL_API + 'tipos-deficiencias',
            metodo: MetodoHttp.POST,
        },
        show: {
            url: (id: number) => BASE_URL_API + `tipos-deficiencias/${id}`,
            metodo: MetodoHttp.GET,
        },
        update: {
            url: (id: number) => BASE_URL_API + `tipos-deficiencias/${id}`,
            metodo: MetodoHttp.PUT,
        },
        destroy: {
            url: (id: number) => BASE_URL_API + `tipos-deficiencias/${id}`,
            metodo: MetodoHttp.DELETE,
        },
        deficiencias: {
            url: (id: number, params?: ParamsBusca) => BASE_URL_API + `tipos-deficiencias/${id}/deficiencias` + montarQuery(params ?? {}),
            metodo: MetodoHttp.GET,
        },
    },
};

export const rotasPaginas = {
    listagem: {
        atletas:             '/pages/listagem.html?entidade=atletas',
        modalidades:         '/pages/listagem.html?entidade=modalidades',
        'tipos-deficiencias':'/pages/listagem.html?entidade=tipos-deficiencias',
        deficiencias:        '/pages/listagem.html?entidade=deficiencias',
        ceps:                '/pages/listagem.html?entidade=ceps',
    },
} as const;