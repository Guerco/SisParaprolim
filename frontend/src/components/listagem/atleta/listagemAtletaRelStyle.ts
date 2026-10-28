import { StyleSheet } from '@react-pdf/renderer';
import { styles as baseStyles } from '../listagemRelStyle';

export const styles = StyleSheet.create({
    ...baseStyles,
    
    // Cores para o Vencimento do Atestado
    textoVencido: { color: '#b45309', fontWeight: 'bold' },
    textoHoje: { color: '#8a6d00', fontWeight: 'bold' },
    textoEmDia: { color: '#1d4f91', fontWeight: 'bold' },

    // Cores para Ativo/Inativo
    textoAtivo: { color: '#17995a', fontWeight: 'bold' },
    textoInativo: { color: '#6f7c8c', fontWeight: 'bold' },
});