import type CepListagem from "../../../types/entidades/cep/CepListagem";
import { formatarCEP } from "../../../utils/formatadores";

interface LinhaTabelaProps {
    cep: CepListagem;
}

export default function LinhaTabela(
    { cep }: LinhaTabelaProps
) {
    return <tr data-id={cep.id}>
        <td><b>{cep.id}</b></td>
        <td>{formatarCEP(cep.cep)}</td>
        <td>{cep.logradouro}</td>
        <td>{cep.bairro}</td>
        <td>{cep.cidade}</td>
        <td>{cep.uf.toUpperCase()}</td>
    </tr>;
}