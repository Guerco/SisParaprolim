const URL_BASE_API = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

function montarUrlComParams(caminho: string, params?: object): string {
    const url = `${URL_BASE_API}${caminho}`;
    if (!params) return url;

    const search = new URLSearchParams();

    for (const [chave, valor] of Object.entries(params)) {
        if (valor === undefined || valor === null || valor === "") continue;
        search.append(chave, String(valor));
    }

    const qs = search.toString();
    return qs ? `${url}?${qs}` : url;
}

async function tratarResposta<T>(res: Response): Promise<T> {
    if (!res.ok) {
        // 422 entra aqui depois (erros por campo)
        throw new Error(`Erro ${res.status}`);
    }
    return res.json() as Promise<T>;
}

async function get<T>(caminho: string, params?: object, signal?: AbortSignal): Promise<T> {
    const res = await fetch(montarUrlComParams(caminho, params), {
        headers: { Accept: "application/json" },
        signal,
    });
    return tratarResposta<T>(res);
}

async function post<T>(caminho: string, corpo?: unknown): Promise<T> {
    const res = await fetch(`${URL_BASE_API}${caminho}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: corpo ? JSON.stringify(corpo) : undefined,
    });
    return tratarResposta<T>(res);
}

async function put<T>(caminho: string, corpo?: unknown): Promise<T> {
    const res = await fetch(`${URL_BASE_API}${caminho}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: corpo ? JSON.stringify(corpo) : undefined,
    });
    return tratarResposta<T>(res);
}

async function del<T>(caminho: string): Promise<T> {
    const res = await fetch(`${URL_BASE_API}${caminho}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
    });
    return tratarResposta<T>(res);
}

export const http = { get, post, put, delete: del };