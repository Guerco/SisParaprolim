import type CepListagem from "../../../types/entidades/cep/CepListagem";
import LinhaTabela from "./LinhaTabela";

interface TabelaProps {
    ceps: CepListagem[];
    carregando: boolean;
}

const COLUNAS = 6;

export default function Tabela(
    { ceps, carregando }: TabelaProps
) {
    return (
        <div className="tabela-container">
            <table className={`tabela${carregando || ceps.length === 0 ? ' tabela--estado' : ''}`}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">CEP</th>
                        <th scope="col">Logradouro</th>
                        <th scope="col">Bairro</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">UF</th>
                    </tr>
                </thead>
                <tbody>
                    {carregando ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="carregando" role="status">Carregando...</p>
                            </td>
                        </tr>
                    ) : ceps.length === 0 ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="vazio" role="status">Não há registros</p>
                            </td>
                        </tr>
                    ) : (
                        ceps.map((c) => <LinhaTabela key={c.id} cep={c} />)
                    )}
                </tbody>
            </table>
        </div>
    );
}