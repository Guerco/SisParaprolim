import type TipoDeficienciaListagem from "../../../types/entidades/tipoDeficiencia/TipoDeficienciaListagem";

interface LinhaTabelaProps {
    tipoDeficiencia: TipoDeficienciaListagem;
}

export default function LinhaTabela(
    { tipoDeficiencia }: LinhaTabelaProps
) {
    return <tr data-id={tipoDeficiencia.id}>
        <td><b>{tipoDeficiencia.id}</b></td>
        <td>{tipoDeficiencia.tipo}</td>
        <td>{tipoDeficiencia.descricao}</td>
    </tr>;
}