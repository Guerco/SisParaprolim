import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import type AtletaListagem from '../../../types/entidades/atleta/AtletaListagem';
import {
    formatarBooleano,
    formatarCPF,
    formatarData,
} from '../../../utils/formatadores';
import { styles } from '../listagemRelStyle';

// Ajuste o caminho da logo conforme a sua estrutura de pastas
import logo from '../../../assets/logotipo.png'; 

interface ListagemAtletaRelProps {
    titulo: string;
    atletas: AtletaListagem[];
}

export default function ListagemAtletaRel({ titulo, atletas }: ListagemAtletaRelProps) {
    const dataEmissao = new Date().toLocaleDateString('pt-BR');

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                
                <Image src={logo} style={styles.headerLogo} />
                <View style={styles.linhaDivisoria} />

                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>{titulo}</Text>
                    <Text style={styles.data}>{dataEmissao}</Text>
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

                    {/* Linhas de Dados */}
                    {atletas.map((atleta) => (
                        <View style={styles.tableRow} key={atleta.id}>
                            <View style={styles.colNumCad}><Text style={styles.tableCell}>{atleta.num_cad}</Text></View>
                            <View style={styles.colNome}><Text style={styles.tableCell}>{atleta.nome}</Text></View>
                            <View style={styles.colCpf}><Text style={styles.tableCell}>{formatarCPF(atleta.cpf)}</Text></View>
                            <View style={styles.colNasc}><Text style={styles.tableCell}>{formatarData(atleta.data_nascimento)}</Text></View>
                            <View style={styles.colVenc}><Text style={styles.tableCell}>{formatarData(atleta.data_vencimento_atestado)}</Text></View>
                            <View style={styles.colSexo}><Text style={styles.tableCell}>{atleta.sexo}</Text></View>
                            <View style={styles.colAtivo}><Text style={styles.tableCell}>{formatarBooleano(atleta.esta_ativo)}</Text></View>
                        </View>
                    ))}
                </View>

                <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                    `Página ${pageNumber} de ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
}