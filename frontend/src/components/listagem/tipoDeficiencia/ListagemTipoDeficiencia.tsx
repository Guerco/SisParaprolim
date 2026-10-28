import '../Listagem.css';

import Busca, { type Direcao } from '../Busca';
import Tabela from './Tabela';
import Paginacao from '../Paginacao';

import type PaginacaoResposta from '../../../types/PaginacaoResposta';
import type TipoDeficienciaListagem from '../../../types/entidades/tipoDeficiencia/TipoDeficienciaListagem';
import { useState } from 'react';
import type { ParamsTipoDeficienciaIndex } from '../../../api/rotas';

const PLACEHOLDER_BUSCA = "Buscar por Tipo ou Descrição";
const OPCOES_ORDENACAO = [
    { campo: 'id', label: 'ID', padrao: true },
    { campo: 'tipo', label: 'Tipo' },
    { campo: 'descricao', label: 'Descrição' },
];

interface ListagemTipoDeficienciaProps {
    paginacao: PaginacaoResposta<TipoDeficienciaListagem>;
    aplicado: ParamsTipoDeficienciaIndex;
    aoAplicar: (novo: ParamsTipoDeficienciaIndex) => void;
    carregando: boolean;
}

export default function ListagemTipoDeficiencia(
    {
        paginacao,
        aplicado,
        aoAplicar,
        carregando
    }: ListagemTipoDeficienciaProps
) {
    type CampoOrdenacao = NonNullable<ParamsTipoDeficienciaIndex["ordenar_por"]>;

    const direcao: Direcao = aplicado.direcao ?? 'asc';
    const campoOrdenacao = (aplicado.ordenar_por
        ?? OPCOES_ORDENACAO.find((o) => o.padrao)?.campo
        ?? OPCOES_ORDENACAO[0].campo) as CampoOrdenacao;
    function aplicarOrdenacao(ordenar_por: CampoOrdenacao, direcao: Direcao) {
        aoAplicar({
            ...aplicado,
            ordenar_por,
            direcao,
            page: 1,
        });
    }

    function aoMudarCampoOrdenacao(campo: string) {
        aplicarOrdenacao(campo as CampoOrdenacao, 'asc');
    }

    function alternarOrdenacao() {
        aplicarOrdenacao(campoOrdenacao, direcao === 'asc' ? 'desc' : 'asc');
    }

    const [esbocoBusca, setEsbocoBusca] = useState(aplicado.busca ?? '');
    function aplicarBusca() {
        aoAplicar({
            ...aplicado,
            busca: esbocoBusca || undefined,
            page: 1
        });
    }

    function aoMudarPagina(pagina: number) {
        aoAplicar({ ...aplicado, page: pagina });
    }

    function aoMudarPorPagina(porPagina: number) {
        aoAplicar({ ...aplicado, por_pag: porPagina, page: 1 });
    }

    return <div className="container-listagem">
        <h2 className="titulo">Listagem de Tipos de Deficiência</h2>

        <div className="painel-listagem">
            <form
                className="form-listagem"
                onSubmit={(e) => { e.preventDefault(); aplicarBusca(); }}
            >
                <section className="barra-busca">
                    <Busca
                        busca={{
                            placeholder: PLACEHOLDER_BUSCA,
                            valor: esbocoBusca,
                            aoMudar: setEsbocoBusca,
                        }}
                        ordenacao={{
                            opcoes: OPCOES_ORDENACAO,
                            valor: campoOrdenacao,
                            aoMudarCampo: aoMudarCampoOrdenacao,
                            direcao,
                            aoAlternarDirecao: alternarOrdenacao,
                        }}
                    />
                </section>
            </form>

            <Tabela tiposDeficiencias={paginacao.data} carregando={carregando} />

            <Paginacao
                meta={paginacao.meta}
                aoMudarPagina={aoMudarPagina}
                aoMudarPorPagina={aoMudarPorPagina}
            />
        </div>
    </div>;
}