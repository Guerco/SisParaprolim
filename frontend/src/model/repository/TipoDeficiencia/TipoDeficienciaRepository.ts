import type { TipoDeficienciaListagem } from '../../dto/TipoDeficiencia/TipoDeficienciaListagem';
import type { Paginacao } from '../../dto/Paginacao';
import type { EstadoBusca } from '../../../ui/elementos/TabelaListagem';
import { rotasApi } from '../../../config/rotas';

export class TipoDeficienciaRepository {

    async buscar(estado: EstadoBusca): Promise<Paginacao<TipoDeficienciaListagem>> {
        const url = rotasApi.tipoDeficiencia.index.url({
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