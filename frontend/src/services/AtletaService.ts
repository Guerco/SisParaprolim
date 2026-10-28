import { http } from "../api/http";
import { rotas, type ParamsAtletaIndex } from "../api/rotas";
import type PaginacaoResposta from "../types/PaginacaoResposta";
import type AtletaListagem from "../types/entidades/atleta/AtletaListagem";

export function listarAtletas(params?: ParamsAtletaIndex) {
    return http.get<PaginacaoResposta<AtletaListagem>>(
        rotas.atleta.index,
        params,
    );
}