import type { AtletaListagem } from '../../model/dto/Atleta/AtletaListagem';
import type { Paginacao } from '../../model/dto/Paginacao';
import type { EstadoBusca } from '../../ui/elementos/TabelaListagem';
import { AtletaRepository } from '../../model/repository/Atleta/AtletaRepository';

export class ListagemAtletaController {

    private requisicaoAtual = 0;
    private repositorio = new AtletaRepository();

    // Busca a paginação para o estado informado.
    // Retorna null quando a requisição foi superada por uma mais recente.
    async buscar(estado: EstadoBusca): Promise<Paginacao<AtletaListagem> | null> {
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