export class AtletaModalidadeCadastro {
    constructor(
        public readonly modalidade_id: number,
        public readonly classe: string | null,
        public readonly validade_atestado: string | null
    ) {}
}