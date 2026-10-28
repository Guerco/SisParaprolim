interface BotaoAplicarFiltrosProps {
    aoAplicar: () => void;
}

export default function BotaoAplicarFiltros(
    { aoAplicar }: BotaoAplicarFiltrosProps
) {
    return <button
        className="botao botao--primario"
        type="button"
        onClick={aoAplicar}
    >Aplicar Filtros</button>;
}