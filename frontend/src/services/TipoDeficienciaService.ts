import { http } from "../api/http";
import { rotas, type ParamsTipoDeficienciaIndex } from "../api/rotas";
import type PaginacaoResposta from "../types/PaginacaoResposta";
import type TipoDeficienciaListagem from "../types/entidades/tipoDeficiencia/TipoDeficienciaListagem";

export function listarTiposDeficiencias(params?: ParamsTipoDeficienciaIndex) {
    return http.get<PaginacaoResposta<TipoDeficienciaListagem>>(
        rotas.tipoDeficiencia.index,
        params,
    );
}