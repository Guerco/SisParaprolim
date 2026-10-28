export function exportarParaCsv(dados: any[], nomeArquivo: string) {
    if (!dados || dados.length === 0) {
        alert("Não há dados para exportar.");
        return;
    }

    // 1. Pega as chaves do primeiro objeto para o cabeçalho
    const cabecalhos = Object.keys(dados[0]);

    // 2. Monta a linha do cabeçalho (separado por ponto e vírgula, padrão do Excel BR)
    const linhaCabecalho = cabecalhos.join(';');

    // 3. Monta as linhas de dados
    const linhasDados = dados.map(obj => {
        return cabecalhos.map(chave => {
            let valor = obj[chave] ?? ''; // Se for nulo/undefined, deixa vazio
            
            // Se o valor for string, coloca entre aspas para evitar quebra se tiver ";" ou "\n"
            valor = String(valor).replace(/"/g, '""'); // Escapa aspas duplas
            return `"${valor}"`;
        }).join(';');
    });

    // 4. Junta tudo
    const csvContent = [linhaCabecalho, ...linhasDados].join('\n');

    // 5. Cria o Blob com BOM (Byte Order Mark) para o Excel ler acentos corretamente
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // 6. Força o download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${nomeArquivo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}