import { http } from "../api/http";
import { rotas, type ParamsModalidadeIndex } from "../api/rotas";
import type PaginacaoResposta from "../types/PaginacaoResposta";
import type ModalidadeListagem from "../types/entidades/modalidade/ModalidadeListagem";

export function listarModalidades(params?: ParamsModalidadeIndex) {
    return http.get<PaginacaoResposta<ModalidadeListagem>>(
        rotas.modalidade.index,
        params,
    );
}