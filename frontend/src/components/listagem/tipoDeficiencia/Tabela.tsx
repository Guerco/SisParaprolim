import type TipoDeficienciaListagem from "../../../types/entidades/tipoDeficiencia/TipoDeficienciaListagem";
import LinhaTabela from "./LinhaTabela";

interface TabelaProps {
    tiposDeficiencias: TipoDeficienciaListagem[];
    carregando: boolean;
}

const COLUNAS = 3;

export default function Tabela(
    { tiposDeficiencias, carregando }: TabelaProps
) {
    return (
        <div className="tabela-container">
            <table className={`tabela${carregando || tiposDeficiencias.length === 0 ? ' tabela--estado' : ''}`}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {carregando ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="carregando" role="status">Carregando...</p>
                            </td>
                        </tr>
                    ) : tiposDeficiencias.length === 0 ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="vazio" role="status">Não há registros</p>
                            </td>
                        </tr>
                    ) : (
                        tiposDeficiencias.map((m) => <LinhaTabela key={m.id} tipoDeficiencia={m} />)
                    )}
                </tbody>
            </table>
        </div>
    );
}