import { http } from "../api/http";
import { rotas, type ParamsCepIndex } from "../api/rotas";
import type PaginacaoResposta from "../types/PaginacaoResposta";
import type CepListagem from "../types/entidades/cep/CepListagem";

export function listarCeps(params?: ParamsCepIndex) {
    return http.get<PaginacaoResposta<CepListagem>>(
        rotas.cep.index,
        params,
    );
}