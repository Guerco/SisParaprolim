import { usePDF } from '@react-pdf/renderer';
import ListagemAtletaRel from './atleta/ListagemAtletaRel';
import type AtletaListagem from '../../types/entidades/atleta/AtletaListagem';
import './ModalExportar.css';
import { useState, useEffect } from 'react';

interface ModalExportarProps {
    aberto: boolean;
    titulo: string;
    aoMudarTitulo: (valor: string) => void;
    aoFechar: () => void;
    dados: AtletaListagem[];
}

export default function ModalExportar({
    aberto,
    titulo,
    aoMudarTitulo,
    aoFechar,
    dados
}: ModalExportarProps) {
    if (!aberto) return null;

    return (
        <div className="modal-fundo" onClick={aoFechar}>
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-titulo">Configurar Relatório</h3>

                <div className="modal-campo">
                    <label htmlFor="titulo-relatorio">Título do Relatório</label>
                    <input
                        id="titulo-relatorio"
                        type="text"
                        value={titulo}
                        onChange={(e) => aoMudarTitulo(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="modal-acoes">
                    <button className="botao botao--cancelar" type="button" onClick={aoFechar}>
                        Cancelar
                    </button>

                    {/* O componente de download só é montado quando o usuário clica em gerar */}
                    <BotaoGerarPDF titulo={titulo} dados={dados} aoFechar={aoFechar} />
                </div>
            </div>
        </div>
    );
}

// Esse componente só existe no DOM depois do clique
function BotaoGerarPDF({ titulo, dados, aoFechar }: { titulo: string, dados: AtletaListagem[], aoFechar: () => void }) {
    const [instance, updateInstance] = usePDF();
    const [iniciado, setIniciado] = useState(false);

    // Quando o PDF fica pronto (url gerada), baixa e fecha o modal
    useEffect(() => {
        if (instance.url && iniciado) {
            const link = document.createElement('a');
            link.href = instance.url;

            // Cria o timestamp legível
            const agora = new Date();
            const dataFormatada = agora.toLocaleDateString('pt-BR').replace(/\//g, '-');
            const horaFormatada = agora.toLocaleTimeString('pt-BR').replace(/:/g, '-');

            link.download = `${titulo.replace(/\s+/g, '_')}_${dataFormatada}_${horaFormatada}.pdf`;

            link.click();
            aoFechar();
        }
    }, [instance.url, iniciado, titulo, aoFechar]);

    function handleClick() {
        setIniciado(true);
        updateInstance(<ListagemAtletaRel titulo={titulo} atletas={dados} />);
    }

    return (
        <button
            className="botao botao--primario"
            type="button"
            disabled={instance.loading || iniciado}
            onClick={handleClick}
        >
            {instance.loading || iniciado ? 'Gerando...' : 'Baixar PDF'}
        </button>
    );
}