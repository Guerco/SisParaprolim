import '../Listagem.css';

import Busca, { type Direcao } from '../Busca';
import Tabela from './Tabela';
import Paginacao from '../Paginacao';

import type PaginacaoResposta from '../../../types/PaginacaoResposta';
import type ModalidadeListagem from '../../../types/entidades/modalidade/ModalidadeListagem';
import { useState } from 'react';
import type { ParamsModalidadeIndex } from '../../../api/rotas';

const PLACEHOLDER_BUSCA = "Buscar por nome";
const OPCOES_ORDENACAO = [
    { campo: 'id', label: 'ID', padrao: true },
    { campo: 'nome', label: 'Nome' },
];

interface ListagemModalidadeProps {
    paginacao: PaginacaoResposta<ModalidadeListagem>;
    aplicado: ParamsModalidadeIndex;
    aoAplicar: (novo: ParamsModalidadeIndex) => void;
    carregando: boolean;
}

export default function ListagemModalidade(
    {
        paginacao,
        aplicado,
        aoAplicar,
        carregando
    }: ListagemModalidadeProps
) {
    type CampoOrdenacao = NonNullable<ParamsModalidadeIndex["ordenar_por"]>;

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
        <h2 className="titulo">Listagem de Modalidades</h2>

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

            <Tabela modalidades={paginacao.data} carregando={carregando} />

            <Paginacao
                meta={paginacao.meta}
                aoMudarPagina={aoMudarPagina}
                aoMudarPorPagina={aoMudarPorPagina}
            />
        </div>
    </div>;
}