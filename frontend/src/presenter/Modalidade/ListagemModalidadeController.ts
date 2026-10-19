import type { ModalidadeListagem } from '../../model/dto/Modalidade/ModalidadeListagem';
import type { Paginacao } from '../../model/dto/Paginacao';
import type { EstadoBusca } from '../../ui/elementos/TabelaListagem';
import { ModalidadeRepository } from '../../model/repository/Modalidade/ModalidadeRepository';

export class ListagemModalidadeController {

    private requisicaoAtual = 0;
    private repositorio = new ModalidadeRepository();

    // Busca a paginação para o estado informado.
    // Retorna null quando a requisição foi superada por uma mais recente.
    async buscar(estado: EstadoBusca): Promise<Paginacao<ModalidadeListagem> | null> {
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