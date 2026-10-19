import type { TipoDeficienciaListagem } from '../../model/dto/TipoDeficiencia/TipoDeficienciaListagem';
import type { Paginacao } from '../../model/dto/Paginacao';
import type { EstadoBusca } from '../../ui/elementos/TabelaListagem';
import { TipoDeficienciaRepository } from '../../model/repository/TipoDeficiencia/TipoDeficienciaRepository';

export class ListagemTipoDeficienciaController {

    private requisicaoAtual = 0;
    private repositorio = new TipoDeficienciaRepository();

    // Busca a paginação para o estado informado.
    // Retorna null quando a requisição foi superada por uma mais recente.
    async buscar(estado: EstadoBusca): Promise<Paginacao<TipoDeficienciaListagem> | null> {
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