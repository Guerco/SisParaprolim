import type ModalidadeListagem from "../../../types/entidades/modalidade/ModalidadeListagem";
import LinhaTabela from "./LinhaTabela";

interface TabelaProps {
    modalidades: ModalidadeListagem[];
    carregando: boolean;
}

const COLUNAS = 2;

export default function Tabela(
    { modalidades, carregando }: TabelaProps
) {
    return (
        <div className="tabela-container">
            <table className={`tabela${carregando || modalidades.length === 0 ? ' tabela--estado' : ''}`}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {carregando ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="carregando" role="status">Carregando...</p>
                            </td>
                        </tr>
                    ) : modalidades.length === 0 ? (
                        <tr>
                            <td colSpan={COLUNAS}>
                                <p className="vazio" role="status">Não há registros</p>
                            </td>
                        </tr>
                    ) : (
                        modalidades.map((m) => <LinhaTabela key={m.id} modalidade={m} />)
                    )}
                </tbody>
            </table>
        </div>
    );
}