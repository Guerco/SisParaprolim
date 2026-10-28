import { http } from "../api/http";
import { rotas, type ParamsDeficienciaIndex } from "../api/rotas";
import type PaginacaoResposta from "../types/PaginacaoResposta";
import type DeficienciaListagem from "../types/entidades/deficiencia/DeficienciaListagem";

export function listarDeficiencias(params?: ParamsDeficienciaIndex) {
    return http.get<PaginacaoResposta<DeficienciaListagem>>(
        rotas.deficiencia.index,
        params,
    );
}