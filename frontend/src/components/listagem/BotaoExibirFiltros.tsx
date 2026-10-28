interface BotaoExibirFiltrosProps {
    aberto: boolean,
    aoAlternar: () => void;
}

export default function BotaoExibirFiltros(
    {aberto, aoAlternar}: BotaoExibirFiltrosProps
) {
    return <button
        className="botao botao-filtros"
        type="button"
        aria-expanded={aberto}
        aria-controls="painel-filtros"
        onClick={aoAlternar}
    >
        <span>
            {aberto ? 'Ocultar Filtros' : 'Exibir Filtros'}
        </span>
        <span className="seta" aria-hidden="true">▾</span>
    </button>;
}