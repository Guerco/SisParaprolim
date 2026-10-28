import '../Listagem.css';

import Busca, { type Direcao } from '../Busca';
// import BotaoExibirFiltros from '../BotaoExibirFiltros';
// import Filtros from './Filtros';
import Tabela from './Tabela';
import Paginacao from '../Paginacao';

import type PaginacaoResposta from '../../../types/PaginacaoResposta';
import type CepListagem from '../../../types/entidades/cep/CepListagem';
import { useState } from 'react';
import type { ParamsCepIndex } from '../../../api/rotas';

const PLACEHOLDER_BUSCA = "Buscar por CEP, Logradouro, Bairro ou Cidade";
const OPCOES_ORDENACAO = [
    { campo: 'id', label: 'ID', padrao: true },
    { campo: 'cidade', label: 'Cidade' },
];

interface ListagemCepProps {
    paginacao: PaginacaoResposta<CepListagem>;
    aplicado: ParamsCepIndex;
    aoAplicar: (novo: ParamsCepIndex) => void;
    carregando: boolean;
}

export default function ListagemCep(
    {
        paginacao,
        aplicado,
        aoAplicar,
        carregando
    }: ListagemCepProps
) {
    // const [filtrosAbertos, setFiltrosAbertos] = useState(false);
    // function alternarFiltros() {
    //     setFiltrosAbertos((aberto) => !aberto);
    // }

    type CampoOrdenacao = NonNullable<ParamsCepIndex["ordenar_por"]>;

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

    // const [esbocoUf, setEsbocoUf] = useState(aplicado.uf ?? '');
    // function aplicarFiltros() {
    //     aoAplicar({
    //         ...aplicado,
    //         uf: (esbocoUf || undefined) as ParamsCepIndex['uf'],
    //         page: 1,
    //     });
    //     setFiltrosAbertos(false);
    // }

    // function limparFiltros() {
    //     setEsbocoUf('');
    // }

    function aoMudarPagina(pagina: number) {
        aoAplicar({ ...aplicado, page: pagina });
    }

    function aoMudarPorPagina(porPagina: number) {
        aoAplicar({ ...aplicado, por_pag: porPagina, page: 1 });
    }

    return <div className="container-listagem">
        <h2 className="titulo">Listagem de CEPs</h2>

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

                    {/* <BotaoExibirFiltros
                        aberto={filtrosAbertos}
                        aoAlternar={alternarFiltros}
                    /> */}
                </section>

                {/* Não precisa de filtro de UF a princípio (apenas RJ) */}
                {/* <Filtros
                    aberto={filtrosAbertos}
                    valorUf={esbocoUf}
                    aoMudarUf={setEsbocoUf}
                    aoAplicar={aplicarFiltros}
                    aoLimpar={limparFiltros}
                /> */}
            </form>

            <Tabela ceps={paginacao.data} carregando={carregando} />

            <Paginacao
                meta={paginacao.meta}
                aoMudarPagina={aoMudarPagina}
                aoMudarPorPagina={aoMudarPorPagina}
            />
        </div>
    </div>;
}