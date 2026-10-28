import type AtletaListagem from "../../../types/entidades/atleta/AtletaListagem";
import LinhaTabela from "./LinhaTabela";

interface TabelaProps {
    atletas: AtletaListagem[];
    carregando: boolean;
}

const COLUNAS = 7;

export default function Tabela(
    { atletas, carregando }: TabelaProps
) {
    return (
        <div className="tabela-container">
            <table className={`tabela${carregando || atletas.length === 0 ? ' tabela--estado' : ''}`}>
                <thead>
                    <tr>
                        <th scope="col">Número de Cadastro</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Data de Nascimento</th>
                        <th scope="col">Data de Vencimento Atestado</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Ativo</th>
                    </tr>
                </thead>
                <tbody>
                    {carregando ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="carregando" role="status">Carregando...</p>
                            </td>
                        </tr>
                    ) : atletas.length === 0 ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="vazio" role="status">Não há registros</p>
                            </td>
                        </tr>
                    ) : (
                        atletas.map((a) => <LinhaTabela key={a.id} atleta={a} />)
                    )}
                </tbody>
            </table>
        </div>
    );
}