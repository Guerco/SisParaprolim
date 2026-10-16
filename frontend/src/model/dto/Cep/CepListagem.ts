export class CepListagem {
    constructor(
        public readonly id: number,
        public readonly cep: string,
        public readonly logradouro: string,
        public readonly bairro: string,
        public readonly cidade: string,
        public readonly uf: string
    ) {}
}