// ─── Type base: todo params de endpoint estende este ───────────────
export interface ParamsQueryBase {
    por_pag?: number;
    page?: number;
    busca?: string;
    ordenar_por?: string;
    direcao?: "asc" | "desc";
    paginacao?: boolean;
}

// ─── Tipos de parâmetros por endpoint (documentação) ───────────────
export interface ParamsModalidadeIndex extends ParamsQueryBase {
    ordenar_por?: "id" | "nome";
}

export interface ParamsDeficienciaIndex extends ParamsQueryBase {
    ordenar_por?: "id" | "cid_10" | "descricao_deficiencia";
    tipo?: "DF" | "DA" | "DV" | "DI";
}

export interface ParamsCepIndex extends ParamsQueryBase {
    ordenar_por?: "id" | "cidade";
    uf?:
    | "AC" | "AL" | "AP" | "AM" | "BA" | "CE" | "DF" | "ES" | "GO"
    | "MA" | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" | "PE" | "PI"
    | "RJ" | "RN" | "RS" | "RO" | "RR" | "SC" | "SP" | "SE" | "TO";
}

export interface ParamsAtletaIndex extends ParamsQueryBase {
    ordenar_por?: "num_cad" | "nome" | "data_nascimento" | "data_vencimento_atestado";
    esta_ativo?: boolean;
    sexo?: "M" | "F";
    data_vencimento_atestado_menor_que?: string;
    data_vencimento_atestado_inclusive?: boolean;
}

export interface ParamsTipoDeficienciaIndex extends ParamsQueryBase {
    ordenar_por?: "id" | "tipo" | "descricao";
}

// ─── Rotas (só caminho literal) ────────────────────────────────────
export const rotas = {
    modalidade: {
        index: "/modalidades",
    },
    deficiencia: {
        index: "/deficiencias",
    },
    cep: {
        index: "/ceps",
    },
    atleta: {
        index: "/atletas",
    },
    tipoDeficiencia: {
        index: "/tipos-deficiencias",
    },
} as const;