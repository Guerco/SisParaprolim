import type { DeficienciaListagem } from '../../model/dto/Deficiencia/DeficienciaListagem';
import type { Paginacao } from '../../model/dto/Paginacao';
import type { EstadoBusca } from '../../ui/elementos/TabelaListagem';
import { DeficienciaRepository } from '../../model/repository/Deficiencia/DeficienciaRepository';

export class ListagemDeficienciaController {

    private requisicaoAtual = 0;
    private repositorio = new DeficienciaRepository();

    // Busca a paginação para o estado informado.
    // Retorna null quando a requisição foi superada por uma mais recente.
    async buscar(estado: EstadoBusca): Promise<Paginacao<DeficienciaListagem> | null> {
        const id = ++this.requisicaoAtual;

        try {
            const paginacao = await this.repositorio.buscar(estado);

            if (id !== this.requisicaoAtual) return null;
            return paginacao;
        } catch (err) {
            if (id !== this.requisicaoAtual) return null;
            throw err;
        }
    }
}