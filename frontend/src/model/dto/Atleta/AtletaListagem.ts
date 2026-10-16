export class AtletaListagem {
    constructor(
        public readonly id: number,
        public readonly num_cad: string,
        public readonly nome: string,
        public readonly cpf: string,
        public readonly sexo: string,
        public readonly data_nascimento: string,
        public readonly esta_ativo: boolean
    ) {}
}