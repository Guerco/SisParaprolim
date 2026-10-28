import type DeficienciaListagem from "../../../types/entidades/deficiencia/DeficienciaListagem";
import LinhaTabela from "./LinhaTabela";

interface TabelaProps {
    deficiencias: DeficienciaListagem[];
    carregando: boolean;
}

const COLUNAS = 4;

export default function Tabela(
    { deficiencias, carregando }: TabelaProps
) {
    return (
        <div className="tabela-container">
            <table className={`tabela${carregando || deficiencias.length === 0 ? ' tabela--estado' : ''}`}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">CID-10</th>
                        <th scope="col">Descrição da Deficiência</th>
                        <th scope="col">Tipo de Deficiência</th>
                    </tr>
                </thead>
                <tbody>
                    {carregando ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="carregando" role="status">Carregando...</p>
                            </td>
                        </tr>
                    ) : deficiencias.length === 0 ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="vazio" role="status">Não há registros</p>
                            </td>
                        </tr>
                    ) : (
                        deficiencias.map((d) => <LinhaTabela key={d.id} deficiencia={d} />)
                    )}
                </tbody>
            </table>
        </div>
    );
}