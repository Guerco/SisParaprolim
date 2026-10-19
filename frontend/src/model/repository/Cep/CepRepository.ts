import type { CepListagem } from '../../dto/Cep/CepListagem';
import type { Paginacao } from '../../dto/Paginacao';
import type { EstadoBusca } from '../../../ui/elementos/TabelaListagem';
import { rotasApi } from '../../../config/rotas';

export class CepRepository {

    async buscar(estado: EstadoBusca): Promise<Paginacao<CepListagem>> {
        const url = rotasApi.cep.index.url({
            por_pag: estado.por_pag,
            page: estado.page,
            busca: estado.busca || undefined,
            ordenar_por: estado.ordenar,
            direcao: estado.direcao,
            ...estado.filtros,
        });

        const resposta = await fetch(url);
        return resposta.json();
    }
}