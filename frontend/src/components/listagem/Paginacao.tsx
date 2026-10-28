import type { PaginacaoRespostaMeta } from "../../types/PaginacaoResposta";

const POR_PAG_PADRAO = [10, 15, 20, 30, 40, 50];

interface PorPaginaProps {
    porPag: number;
    aoMudarPorPagina: (v: number) => void;
}

const PorPagina = ({ porPag, aoMudarPorPagina }: PorPaginaProps) => {
    const opcoesPorPag = POR_PAG_PADRAO.includes(porPag)
        ? POR_PAG_PADRAO
        : [...POR_PAG_PADRAO, porPag].sort((a, b) => a - b);

    return <div className="por-pagina">
        <label htmlFor="registros-pagina">Registros por página:</label>
        <select
            className="campo"
            id="registros-pagina"
            name="registros-pagina"
            value={porPag}
            onChange={(e) => aoMudarPorPagina(Number(e.target.value))}
        >
            {opcoesPorPag.map((o) => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
    </div>;
};

interface ControlesPaginacaoProps {
    meta: PaginacaoRespostaMeta;
    aoMudarPagina: (pagina: number) => void;
}

const ControlesPaginacao = ({ meta, aoMudarPagina }: ControlesPaginacaoProps) => (
    <div className="controles-paginacao">
        <button
            className="botao"
            type="button"
            aria-label="Página anterior"
            disabled={meta.current_page === 1}
            onClick={() => aoMudarPagina(meta.current_page - 1)}
        >◀</button>
        <button
            className="botao"
            type="button"
            disabled={meta.current_page === 1}
            onClick={() => aoMudarPagina(1)}
        >Primeira</button>
        <input
            className="campo input-pagina"
            type="number"
            name="pagina"
            aria-label="Página atual"
            min="1"
            max={meta.last_page}
            step="1"
            value={meta.current_page}
            onChange={(e) => {
                const n = Number(e.target.value);
                if (n >= 1 && n <= meta.last_page) aoMudarPagina(n);
            }}
            disabled={meta.last_page === 1}
        />
        <button
            className="botao"
            type="button"
            disabled={meta.current_page === meta.last_page}
            onClick={() => aoMudarPagina(meta.last_page)}
        >Última</button>
        <button
            className="botao"
            type="button"
            aria-label="Próxima página"
            disabled={meta.current_page === meta.last_page}
            onClick={() => aoMudarPagina(meta.current_page + 1)}
        >▶</button>
    </div>
);

interface PaginacaoProps {
    meta: PaginacaoRespostaMeta;
    aoMudarPagina: (pagina: number) => void;
    aoMudarPorPagina: (porPagina: number) => void;
}

export default function Paginacao(
    { meta, aoMudarPagina, aoMudarPorPagina }: PaginacaoProps
) {
    return <nav className="paginacao" aria-label="Paginação">
        <span className="info">Exibindo {meta.from}-{meta.to} de {meta.total} dados</span>
        <PorPagina porPag={meta.per_page} aoMudarPorPagina={aoMudarPorPagina} />
        <ControlesPaginacao meta={meta} aoMudarPagina={aoMudarPagina} />
        <span className="info">Página {meta.current_page} de {meta.last_page}</span>
    </nav>;
}