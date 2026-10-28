import BotaoLimparFiltros from "../BotaoLimparFiltros";
import BotaoAplicarFiltros from "../BotaoAplicarFiltros";

interface FiltrosProps {
    aberto: boolean;
    valorTipo: string;
    aoMudarTipo: (v: string) => void;
    aoAplicar: () => void;
    aoLimpar: () => void;
}

export default function Filtros(
    { aberto, valorTipo, aoMudarTipo, aoAplicar, aoLimpar }: FiltrosProps
) {
    return <section className="filtros" id="painel-filtros" hidden={!aberto}>
        <div className="filtro">
            <label className="rotulo" htmlFor="filtro-tipo">Tipo de Deficiência</label>
            <select
                className="campo"
                id="filtro-tipo"
                name="tipo"
                value={valorTipo}
                onChange={(e) => aoMudarTipo(e.target.value)}
            >
                <option value="">—</option>
                <option value="DF">Física</option>
                <option value="DA">Auditiva</option>
                <option value="DV">Visual</option>
                <option value="DI">Intelectual</option>
            </select>
        </div>

        <div className="filtros-acoes">
            <BotaoLimparFiltros aoLimpar={aoLimpar} />
            <BotaoAplicarFiltros aoAplicar={aoAplicar} />
        </div>
    </section>;
}