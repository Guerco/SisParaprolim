interface BotaoAplicarFiltrosProps {
    aoAplicar: () => void;
}

export default function BotaoAplicarFiltros(
    { aoAplicar }: BotaoAplicarFiltrosProps
) {
    return <button
        className="botao botao--secundario"
        type="button"
        onClick={aoAplicar}
    >Aplicar Filtros</button>;
}