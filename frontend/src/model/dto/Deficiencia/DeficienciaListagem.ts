export class DeficienciaListagem {
    constructor(
        public readonly id: number,
        public readonly cid_10: string,
        public readonly descricao_deficiencia: string,
        public readonly tipo_deficiencia: string
    ) {}
}