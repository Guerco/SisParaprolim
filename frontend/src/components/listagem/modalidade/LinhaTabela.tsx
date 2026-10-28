import type ModalidadeListagem from "../../../types/entidades/modalidade/ModalidadeListagem";

interface LinhaTabelaProps {
    modalidade: ModalidadeListagem;
}

export default function LinhaTabela(
    { modalidade }: LinhaTabelaProps
) {
    return <tr data-id={modalidade.id}>
        <td><b>{modalidade.id}</b></td>
        <td>{modalidade.nome}</td>
    </tr>;
}