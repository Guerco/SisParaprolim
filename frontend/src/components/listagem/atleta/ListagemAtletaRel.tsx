import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import type AtletaListagem from '../../../types/entidades/atleta/AtletaListagem';
import type { ParamsAtletaIndex } from '../../../api/rotas';
import {
    formatarBooleano,
    formatarCPF,
    formatarData,
    situacaoVencimento
} from '../../../utils/formatadores';
import { styles } from './listagemAtletaRelStyle';
import logo from '../../../assets/logotipo.png'; 

interface ListagemAtletaRelProps {
    titulo: string;
    atletas: AtletaListagem[];
    aplicado: ParamsAtletaIndex;
}

const TITULOS_ORDENACAO: Record<string, string> = {
    num_cad: 'Número Cadastro',
    nome: 'Nome',
    data_nascimento: 'Data Nasc.',
    data_vencimento_atestado: 'Vencimento'
};

export default function ListagemAtletaRel({ titulo, atletas, aplicado }: ListagemAtletaRelProps) {
    const dataEmissao = new Date().toLocaleDateString('pt-BR');

    // --- LÓGICA DE FILTROS E ORDENAÇÃO ---
    const textosFiltros: string[] = [];
    if (aplicado.busca) textosFiltros.push(`Busca: "${aplicado.busca}"`);
    if (aplicado.sexo) textosFiltros.push(`Sexo: ${aplicado.sexo === 'M' ? 'Masculino' : 'Feminino'}`);
    if (aplicado.esta_ativo !== undefined) textosFiltros.push(`Status: ${aplicado.esta_ativo ? 'Ativos' : 'Inativos'}`);
    if (aplicado.data_vencimento_atestado_menor_que) textosFiltros.push(`Apenas Expirados`);

    const textoOrdenacao = aplicado.ordenar_por 
        ? `Ordenação: ${TITULOS_ORDENACAO[aplicado.ordenar_por] || aplicado.ordenar_por} (${aplicado.direcao === 'asc' ? 'Crescente' : 'Decrescente'})`
        : '';

    const textoFiltros = textosFiltros.length > 0 
        ? `Filtros aplicados: ${textosFiltros.join(' | ')}` 
        : 'Nenhum filtro aplicado.';

    // --- LÓGICA DE TOTAIS (REDUCE) ---
    const total = atletas.length;
    let ativos = 0, inativos = 0, expirados = 0, hoje = 0, emDia = 0;
    
    atletas.forEach(a => {
        if (a.esta_ativo) ativos++; else inativos++;
        
        const situacao = situacaoVencimento(a.data_vencimento_atestado);
        if (situacao === 'vencido') expirados++;
        else if (situacao === 'hoje') hoje++;
        else if (situacao === 'em-dia') emDia++;
    });

    const statsRodape: string[] = [`Total: ${total}`];
    
    if (aplicado.esta_ativo === undefined) {
        statsRodape.push(`Ativos: ${ativos}`, `Inativos: ${inativos}`);
    }
    
    if (!aplicado.data_vencimento_atestado_menor_que) {
        statsRodape.push(`Atestados Vencidos: ${expirados}`);
        if (expirados > 0) statsRodape.push(`Em dia/Vencendo hoje: ${hoje + emDia}`);
    }

    const textoRodape = statsRodape.join('  |  ');

    // --- FUNÇÕES DE ESTILO CONDICIONAL ---
    function getEstiloVencimento(data: string | null) {
        const situacao = situacaoVencimento(data);
        if (situacao === 'vencido') return styles.textoVencido;
        if (situacao === 'hoje') return styles.textoHoje;
        if (situacao === 'em-dia') return styles.textoEmDia;
        return {};
    }

    function getEstiloAtivo(isAtivo: boolean) {
        return isAtivo ? styles.textoAtivo : styles.textoInativo;
    }

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                
                <Image src={logo} style={styles.headerLogo} />
                <View style={styles.linhaDivisoria} />

                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Text style={styles.data}>{dataEmissao}</Text>
                </View>

                {/* Linhas de Filtros e Ordenação */}
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 9, color: '#555555' }}>
                        {textoFiltros} {textoOrdenacao && `| ${textoOrdenacao}`}
                    </Text>
                </View>

                <View style={styles.table}>
                    {/* Cabeçalho da Tabela */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <View style={styles.colNumCad}><Text style={styles.tableCellHeader}>Nº Cadastro</Text></View>
                        <View style={styles.colNome}><Text style={styles.tableCellHeader}>Nome</Text></View>
                        <View style={styles.colCpf}><Text style={styles.tableCellHeader}>CPF</Text></View>
                        <View style={styles.colNasc}><Text style={styles.tableCellHeader}>Nascimento</Text></View>
                        <View style={styles.colVenc}><Text style={styles.tableCellHeader}>Venc. Atestado</Text></View>
                        <View style={styles.colSexo}><Text style={styles.tableCellHeader}>Sexo</Text></View>
                        <View style={styles.colAtivo}><Text style={styles.tableCellHeader}>Ativo</Text></View>
                    </View>

                    {/* Linhas de Dados com Estilos Condicionais */}
                    {atletas.map((atleta) => (
                        <View style={styles.tableRow} key={atleta.id}>
                            <View style={styles.colNumCad}><Text style={styles.tableCell}>{atleta.num_cad}</Text></View>
                            <View style={styles.colNome}><Text style={styles.tableCell}>{atleta.nome}</Text></View>
                            <View style={styles.colCpf}><Text style={styles.tableCell}>{formatarCPF(atleta.cpf)}</Text></View>
                            <View style={styles.colNasc}><Text style={styles.tableCell}>{formatarData(atleta.data_nascimento)}</Text></View>
                            
                            <View style={styles.colVenc}>
                                <Text style={[styles.tableCell, getEstiloVencimento(atleta.data_vencimento_atestado)]}>
                                    {formatarData(atleta.data_vencimento_atestado)}
                                </Text>
                            </View>

                            <View style={styles.colSexo}><Text style={styles.tableCell}>{atleta.sexo}</Text></View>
                            
                            <View style={styles.colAtivo}>
                                <Text style={[styles.tableCell, getEstiloAtivo(atleta.esta_ativo)]}>
                                    {formatarBooleano(atleta.esta_ativo)}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Resumo Estatístico */}
                <View style={{ marginTop: 15, alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{textoRodape}</Text>
                </View>

                <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                    `Página ${pageNumber} de ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
}