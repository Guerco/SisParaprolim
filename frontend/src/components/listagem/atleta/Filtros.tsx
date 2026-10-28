import BotaoLimparFiltros from "../BotaoLimparFiltros";
import BotaoAplicarFiltros from "../BotaoAplicarFiltros";

interface FiltrosProps {
    aberto: boolean;
    valorAtivo: string;
    aoMudarAtivo: (v: string) => void;
    valorSexo: string;
    aoMudarSexo: (v: string) => void;
    valorExpirado: boolean;
    aoMudarExpirado: (v: boolean) => void;
    aoAplicar: () => void;
    aoLimpar: () => void;
}

export default function Filtros(
    {
        aberto,
        valorAtivo,
        aoMudarAtivo,
        valorSexo,
        aoMudarSexo,
        valorExpirado,
        aoMudarExpirado,
        aoAplicar,
        aoLimpar
    }: FiltrosProps
) {
    return <section className="filtros" id="painel-filtros" hidden={!aberto}>
        <div className="filtro">
            <label className="rotulo" htmlFor="filtro-ativo">Ativo</label>
            <select
                className="campo"
                id="filtro-ativo"
                name="esta_ativo"
                value={valorAtivo}
                onChange={(e) => aoMudarAtivo(e.target.value)}
            >
                <option value="">—</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
            </select>
        </div>

        <div className="filtro">
            <label className="rotulo" htmlFor="filtro-sexo">Sexo</label>
            <select
                className="campo"
                id="filtro-sexo"
                name="sexo"
                value={valorSexo}
                onChange={(e) => aoMudarSexo(e.target.value)}
            >
                <option value="">—</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
            </select>
        </div>

        <div className="filtro">
            <span className="rotulo">Validade do Atestado</span>
            <label className="opcao">
                <input
                    type="checkbox"
                    name="data_vencimento_atestado_menor_que"
                    value="data_atual"
                    checked={valorExpirado}
                    onChange={(e) => aoMudarExpirado(e.target.checked)}
                />
                Expirado
            </label>
        </div>

        <div className="filtros-acoes">
            <BotaoLimparFiltros aoLimpar={aoLimpar} />
            <BotaoAplicarFiltros aoAplicar={aoAplicar} />
        </div>
    </section>;
}