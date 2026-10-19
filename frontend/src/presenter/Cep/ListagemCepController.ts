import type { CepListagem } from '../../model/dto/Cep/CepListagem';
import type { Paginacao } from '../../model/dto/Paginacao';
import type { EstadoBusca } from '../../ui/elementos/TabelaListagem';
import { CepRepository } from '../../model/repository/Cep/CepRepository';

export class ListagemCepController {

    private requisicaoAtual = 0;
    private repositorio = new CepRepository();

    // Busca a paginação para o estado informado.
    // Retorna null quando a requisição foi superada por uma mais recente.
    async buscar(estado: EstadoBusca): Promise<Paginacao<CepListagem> | null> {
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