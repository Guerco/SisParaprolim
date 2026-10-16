export class CepResumo {
    constructor(
        public readonly cep: string,
        public readonly logradouro: string,
        public readonly bairro: string,
        public readonly cidade: string,
        public readonly uf: string
    ) {}
}