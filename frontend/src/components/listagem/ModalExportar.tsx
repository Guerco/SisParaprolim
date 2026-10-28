import { usePDF } from '@react-pdf/renderer';
import ListagemAtletaRel from './atleta/ListagemAtletaRel';
import type AtletaListagem from '../../types/entidades/atleta/AtletaListagem';
import type { ParamsAtletaIndex } from '../../api/rotas'; // Import necessário
import './ModalExportar.css';
import { useState, useEffect } from 'react';
import { exportarParaCsv } from '../../utils/exportarCsv';

interface ModalExportarProps {
    aberto: boolean;
    titulo: string;
    aoMudarTitulo: (valor: string) => void;
    aoFechar: () => void;
    dados: AtletaListagem[];
    aplicado: ParamsAtletaIndex; // Nova prop
}

export default function ModalExportar({
    aberto,
    titulo,
    aoMudarTitulo,
    aoFechar,
    dados,
    aplicado // Recebendo
}: ModalExportarProps) {
    if (!aberto) return null;

    // Função que dispara o CSV
    function handleExportarCsv() {
        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR').replace(/\//g, '-');
        const horaFormatada = agora.toLocaleTimeString('pt-BR').replace(/:/g, '-');

        const nomeArquivo = `${titulo.replace(/\s+/g, '_')}_${dataFormatada}_${horaFormatada}`;

        exportarParaCsv(dados, nomeArquivo);
        aoFechar();
    }

    return (
        <div className="modal-fundo" onClick={aoFechar}>
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-titulo">Exportar Relatório</h3>

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

                <div className="modal-acoes" style={{ justifyContent: 'space-between' }}>
                    <button className="botao botao--cancelar" type="button" onClick={aoFechar}>
                        Cancelar
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        {/* Botão CSV */}
                        <button
                            className="botao botao-exportar-csv"
                            type="button"
                            onClick={handleExportarCsv}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <path d="M8 13h2v4H8zM12 13h2v4h-2zM16 13h2v4h-2z"></path>
                            </svg>
                            Exportar CSV
                        </button>

                        {/* Botão PDF - Passando o aplicado */}
                        <BotaoGerarPDF titulo={titulo} dados={dados} aoFechar={aoFechar} aplicado={aplicado} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// O componente interno também precisa receber e repassar o aplicado
function BotaoGerarPDF({ titulo, dados, aoFechar, aplicado }: { titulo: string, dados: AtletaListagem[], aoFechar: () => void, aplicado: ParamsAtletaIndex }) {
    const [instance, updateInstance] = usePDF();
    const [iniciado, setIniciado] = useState(false);

    useEffect(() => {
        if (instance.url && iniciado) {
            const link = document.createElement('a');
            link.href = instance.url;

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
        // Passando o aplicado para o documento de PDF
        updateInstance(<ListagemAtletaRel titulo={titulo} atletas={dados} aplicado={aplicado} />);
    }

    return (
        <button
            className="botao botao-exportar-pdf"
            type="button"
            disabled={instance.loading || iniciado}
            onClick={handleClick}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <text x="7" y="17" fontSize="6" stroke="none" fill="currentColor" fontWeight="bold">PDF</text>
            </svg>
            {instance.loading || iniciado ? 'Gerando...' : 'Exportar PDF'}
        </button>
    );
}