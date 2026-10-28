import '../Listagem.css';

import Busca, { type Direcao } from '../Busca';
import BotaoExibirFiltros from '../BotaoExibirFiltros';
import Filtros from './Filtros';
import Tabela from './Tabela';
import Paginacao from '../Paginacao';

import type PaginacaoResposta from '../../../types/PaginacaoResposta';
import type AtletaListagem from '../../../types/entidades/atleta/AtletaListagem';
import { useState } from 'react';
import type { ParamsAtletaIndex } from '../../../api/rotas';

const PLACEHOLDER_BUSCA = "Buscar por Nome, CPF ou Número Cadastro";
const OPCOES_ORDENACAO = [
    { campo: 'num_cad', label: 'Número Cadastro', padrao: true },
    { campo: 'nome', label: 'Nome' },
    { campo: 'data_nascimento', label: 'Data de Nascimento' },
    { campo: 'data_vencimento_atestado', label: 'Vencimento Atestado' },
];

interface ListagemAtletaProps {
    paginacao: PaginacaoResposta<AtletaListagem>;
    aplicado: ParamsAtletaIndex;
    aoAplicar: (novo: ParamsAtletaIndex) => void;
    carregando: boolean;
}

export default function ListagemAtleta(
    {
        paginacao,
        aplicado,
        aoAplicar,
        carregando
    }: ListagemAtletaProps
) {
    const [filtrosAbertos, setFiltrosAbertos] = useState(false);
    function alternarFiltros() {
        setFiltrosAbertos((aberto) => !aberto);
    }

    type CampoOrdenacao = NonNullable<ParamsAtletaIndex["ordenar_por"]>;

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

    const [esbocoAtivo, setEsbocoAtivo] = useState(
        aplicado.esta_ativo === undefined ? '' : String(aplicado.esta_ativo)
    );
    const [esbocoSexo, setEsbocoSexo] = useState(aplicado.sexo ?? '');
    const [esbocoExpirado, setEsbocoExpirado] = useState(
        aplicado.data_vencimento_atestado_menor_que !== undefined
    );

    function aplicarFiltros() {
        aoAplicar({
            ...aplicado,
            esta_ativo: esbocoAtivo === ''
                ? undefined
                : esbocoAtivo === 'true',
            sexo: (esbocoSexo || undefined) as ParamsAtletaIndex['sexo'],
            data_vencimento_atestado_menor_que: esbocoExpirado ? 'data_atual' : undefined,
            data_vencimento_atestado_inclusive: esbocoExpirado ? true : undefined,
            page: 1,
        });
        setFiltrosAbertos(false);
    }

    function limparFiltros() {
        setEsbocoAtivo('');
        setEsbocoSexo('');
        setEsbocoExpirado(false);
    }

    function aoMudarPagina(pagina: number) {
        aoAplicar({ ...aplicado, page: pagina });
    }

    function aoMudarPorPagina(porPagina: number) {
        aoAplicar({ ...aplicado, por_pag: porPagina, page: 1 });
    }

    return <div className="container-listagem">
        <h2 className="titulo">Listagem de Atletas</h2>

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
                    valorAtivo={esbocoAtivo}
                    aoMudarAtivo={setEsbocoAtivo}
                    valorSexo={esbocoSexo}
                    aoMudarSexo={setEsbocoSexo}
                    valorExpirado={esbocoExpirado}
                    aoMudarExpirado={setEsbocoExpirado}
                    aoAplicar={aplicarFiltros}
                    aoLimpar={limparFiltros}
                />
            </form>

            <Tabela atletas={paginacao.data} carregando={carregando} />

            <Paginacao
                meta={paginacao.meta}
                aoMudarPagina={aoMudarPagina}
                aoMudarPorPagina={aoMudarPorPagina}
            />
        </div>
    </div>;
}