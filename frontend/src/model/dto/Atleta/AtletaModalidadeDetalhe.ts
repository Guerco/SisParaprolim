import { ModalidadeListagem } from '../Modalidade/ModalidadeListagem';

export class AtletaModalidadeDetalhe {
    constructor(
        public readonly id: number,
        public readonly classe: string | null,
        public readonly validade_atestado: string | null,
        public readonly modalidade: ModalidadeListagem
    ) {}
}