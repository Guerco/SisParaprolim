interface BotaoLimparFiltrosProps {
    aoLimpar: () => void;
}

export default function BotaoLimparFiltros(
    { aoLimpar }: BotaoLimparFiltrosProps
) {
    return <button
        className="botao"
        type="button"
        onClick={aoLimpar}
    >Limpar Filtros</button>;
}