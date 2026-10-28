import './LinhaTabela.css';

import type AtletaListagem from "../../../types/entidades/atleta/AtletaListagem";
import {
    formatarBooleano,
    formatarCPF,
    formatarData,
    situacaoVencimento,
} from "../../../utils/formatadores";

const TITULO_VENCIMENTO = {
    vencido: "Atestado vencido",
    hoje: "Atestado vence hoje",
    "em-dia": "Atestado em dia",
} as const;

interface LinhaTabelaProps {
    atleta: AtletaListagem;
}

export default function LinhaTabela({ atleta }: LinhaTabelaProps) {
    function formatarDados(atleta: AtletaListagem) {
        return {
            id: atleta.id,
            num_cad: atleta.num_cad,
            nome: atleta.nome,
            cpf: formatarCPF(atleta.cpf),
            sexo: atleta.sexo,
            data_nascimento: formatarData(atleta.data_nascimento),
            data_vencimento_atestado: formatarData(
                atleta.data_vencimento_atestado
            ),
            esta_ativo: formatarBooleano(atleta.esta_ativo),
        };
    }

    const atletaFormatado = formatarDados(atleta);
    const situacao = situacaoVencimento(atleta.data_vencimento_atestado);

    return (
        <tr data-id={atletaFormatado.id}>
            <td><b>{atletaFormatado.num_cad}</b></td>
            <td>{atletaFormatado.nome}</td>
            <td>{atletaFormatado.cpf}</td>
            <td>{atletaFormatado.data_nascimento}</td>
            <td>
                <span
                    className={`vencimento ${situacao ?? ""}`}
                    title={situacao ? TITULO_VENCIMENTO[situacao] : undefined}
                >
                    {atletaFormatado.data_vencimento_atestado}
                </span>
            </td>
            <td className="centro">
                <span className={`sexo ${atleta.sexo}`}>
                    {atletaFormatado.sexo}
                </span>
            </td>
            <td className="centro">
                <span className={`ativo ${atleta.esta_ativo ? 'sim' : 'nao'}`}>
                    {atletaFormatado.esta_ativo}
                </span>
            </td>
        </tr>
    );
}