import type DeficienciaListagem from "../../../types/entidades/deficiencia/DeficienciaListagem";

interface LinhaTabelaProps {
    deficiencia: DeficienciaListagem;
}

export default function LinhaTabela(
    { deficiencia }: LinhaTabelaProps
) {
    return <tr data-id={deficiencia.id}>
        <td><b>{deficiencia.id}</b></td>
        <td>{deficiencia.cid_10}</td>
        <td>{deficiencia.descricao_deficiencia}</td>
        <td>{deficiencia.tipo_deficiencia}</td>
    </tr>;
}