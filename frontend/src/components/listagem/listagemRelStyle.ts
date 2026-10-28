import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
    page: { 
        paddingTop: 40, 
        paddingBottom: 60, 
        paddingHorizontal: 40, 
        backgroundColor: '#ffffff', 
        fontFamily: 'Times-Roman' 
    },
    headerLogo: { 
        width: 140, 
        marginBottom: 10 
    },
    linhaDivisoria: { 
        borderBottomWidth: 1, 
        borderBottomColor: '#000000', 
        marginBottom: 15 
    },
    tituloContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        marginBottom: 15 
    },
    titulo: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        flex: 1 
    },
    data: { 
        fontSize: 10, 
        textAlign: 'right' 
    },
    table: { 
        display: 'flex', 
        width: 'auto', 
        marginTop: 5 
    },
    tableRow: { 
        flexDirection: 'row', 
        borderBottomWidth: 0.5, 
        borderBottomColor: '#999999',
        alignItems: 'center'
    },
    tableHeader: { 
        backgroundColor: '#263b53', 
        borderBottomWidth: 1, 
        borderBottomColor: '#000000' 
    },
    tableCellHeader: { 
        fontSize: 9, 
        fontWeight: 'bold', 
        color: '#ffffff' 
    },
    tableCell: { 
        fontSize: 9, 
        color: '#333333' 
    },
    footer: { 
        position: 'absolute', 
        bottom: 30, 
        left: 40, 
        right: 40, 
        fontSize: 8, 
        textAlign: 'center', 
        borderTopWidth: 1.5, 
        borderTopColor: '#000000', 
        paddingTop: 8, 
        color: '#555555' 
    },
    
    // Colunas específicas do Atleta
    colNumCad: { width: '12%', padding: 4 },
    colNome: { width: '26%', padding: 4 },
    colCpf: { width: '16%', padding: 4 },
    colNasc: { width: '12%', padding: 4 },
    colVenc: { width: '14%', padding: 4 },
    colSexo: { width: '8%', padding: 4, textAlign: 'center' },
    colAtivo: { width: '12%', padding: 4, textAlign: 'center' },
});