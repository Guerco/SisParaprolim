import { DeficienciaDetalhe } from '../Deficiencia/DeficienciaDetalhe';

export class AtletaDeficienciaDetalhe {
    constructor(
        public readonly id: number,
        public readonly possui_laudo: boolean,
        public readonly deficiencia: DeficienciaDetalhe
    ) {}
}