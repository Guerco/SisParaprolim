import '../Listagem.css';

import Busca, { type Direcao } from '../Busca';
import BotaoExibirFiltros from '../BotaoExibirFiltros';
import Filtros from './Filtros';
import Tabela from './Tabela';
import Paginacao from '../Paginacao';

import type PaginacaoResposta from '../../../types/PaginacaoResposta';
import type DeficienciaListagem from '../../../types/entidades/deficiencia/DeficienciaListagem';
import { useState } from 'react';
import type { ParamsDeficienciaIndex } from '../../../api/rotas';

const PLACEHOLDER_BUSCA = "Buscar por CID-10 ou Descrição";
const OPCOES_ORDENACAO = [
    { campo: 'id', label: 'ID', padrao: true },
    { campo: 'cid_10', label: 'CID-10' },
    { campo: 'descricao_deficiencia', label: 'Descrição' },
];

interface ListagemDeficienciaProps {
    paginacao: PaginacaoResposta<DeficienciaListagem>;
    aplicado: ParamsDeficienciaIndex;
    aoAplicar: (novo: ParamsDeficienciaIndex) => void;
    carregando: boolean;
}

export default function ListagemDeficiencia(
    {
        paginacao,
        aplicado,
        aoAplicar,
        carregando
    }: ListagemDeficienciaProps
) {
    const [filtrosAbertos, setFiltrosAbertos] = useState(false);
    function alternarFiltros() {
        setFiltrosAbertos((aberto) => !aberto);
    }

    type CampoOrdenacao = NonNullable<ParamsDeficienciaIndex["ordenar_por"]>;

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

    const [esbocoTipo, setEsbocoTipo] = useState(aplicado.tipo ?? '');
    function aplicarFiltros() {
        aoAplicar({
            ...aplicado,
            tipo: (esbocoTipo || undefined) as ParamsDeficienciaIndex['tipo'],
            page: 1,
        });
        setFiltrosAbertos(false);
    }

    function limparFiltros() {
        setEsbocoTipo('');
    }

    function aoMudarPagina(pagina: number) {
        aoAplicar({ ...aplicado, page: pagina });
    }

    function aoMudarPorPagina(porPagina: number) {
        aoAplicar({ ...aplicado, por_pag: porPagina, page: 1 });
    }

    return <div className="container-listagem">
        <h2 className="titulo">Listagem de Deficiências</h2>

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

                    <BotaoExibirFiltros
                        aberto={filtrosAbertos}
                        aoAlternar={alternarFiltros}
                    />
                </section>

                <Filtros
                    aberto={filtrosAbertos}
                    valorTipo={esbocoTipo}
                    aoMudarTipo={setEsbocoTipo}
                    aoAplicar={aplicarFiltros}
                    aoLimpar={limparFiltros}
                />
            </form>

            <Tabela deficiencias={paginacao.data} carregando={carregando} />

            <Paginacao
                meta={paginacao.meta}
                aoMudarPagina={aoMudarPagina}
                aoMudarPorPagina={aoMudarPorPagina}
            />
        </div>
    </div>;
}