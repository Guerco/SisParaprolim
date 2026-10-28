interface OpcaoOrdenacao {
    campo: string,
    label: string,
    padrao?: boolean
}

export type Direcao = 'asc' | 'desc';

interface GrupoBuscaProps {
    placeholderBusca: string;
    valorBusca: string;
    aoMudarBusca: (v: string) => void;
}

const GrupoBusca = (
    { placeholderBusca, valorBusca, aoMudarBusca }: GrupoBuscaProps
) => (
    <div className="busca grupo-unido">
        <input
            className="campo"
            type="search"
            name="busca"
            aria-label="Buscar"
            placeholder={placeholderBusca}
            title={placeholderBusca}
            value={valorBusca}
            onChange={(e) => aoMudarBusca(e.target.value)}
        />
        <button
            className="botao botao--primario"
            type="submit"
            title="Buscar"
            aria-label="Buscar"
        >🔍</button>
    </div>
);

interface GrupoOrdenacaoProps {
    opcoesOrdenacao: OpcaoOrdenacao[],
    valor: string,
    aoMudarCampo: (campo: string) => void;
    direcao: Direcao,
    aoAlternarDirecao: () => void
}

const GrupoOrdenacao = (
    {
        opcoesOrdenacao,
        valor,
        aoMudarCampo,
        direcao,
        aoAlternarDirecao
    }: GrupoOrdenacaoProps
) => (
    <div className="ordenacao">
        <label htmlFor="ordenar"> 
            Ordenar por:
        </label>
        <div className="grupo-unido">
            <select
                className="campo"
                id="ordenar"
                name="ordenar"
                value={valor}
                onChange={(e) => aoMudarCampo(e.target.value)}
            >
                {opcoesOrdenacao.map((o) => <option key={o.campo} value={o.campo}>{o.label}</option>)}
            </select>
            <button
                className="botao botao--primario botao-direcao"
                type="button"
                title="Alternar direção de ordenação"
                aria-label={`Ordem ${direcao === 'asc' ? 'crescente' : 'decrescente'}, clique para alternar`}
                data-direcao={direcao}
                onClick={aoAlternarDirecao}
            >
                {direcao === 'asc' ? '↑' : '↓'}
            </button>
        </div>
    </div>
);

interface BuscaProps {
    busca?: {
        placeholder: string;
        valor: string;
        aoMudar: (v: string) => void;
    };
    ordenacao?: {
        opcoes: OpcaoOrdenacao[];
        valor: string;
        aoMudarCampo: (campo: string) => void;
        direcao: Direcao;
        aoAlternarDirecao: () => void;
    };
}
export default function Busca(
    {
        busca,
        ordenacao,
    }: BuscaProps
) {
    return <div className="barra-busca-controles">
        {busca && <GrupoBusca
            placeholderBusca={busca.placeholder}
            valorBusca={busca.valor}
            aoMudarBusca={busca.aoMudar}
        />}

        {ordenacao && <GrupoOrdenacao
            opcoesOrdenacao={ordenacao.opcoes}
            valor={ordenacao.valor}
            aoMudarCampo={ordenacao.aoMudarCampo}
            direcao={ordenacao.direcao}
            aoAlternarDirecao={ordenacao.aoAlternarDirecao}
        />}
    </div>;
}