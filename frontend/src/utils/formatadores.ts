export function formatarCPF(cpf: string): string {
    const numeros = cpf.replace(/\D/g, "");

    if (numeros.length !== 11) return cpf;

    return numeros.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4"
    );
}

export function formatarCEP(cep: string): string {
    const numeros = cep.replace(/\D/g, "");

    if (numeros.length !== 8) return cep;

    return numeros.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export function formatarData(data: string): string {
    if (!data) return "";

    const dataFormatada = new Date(`${data}T00:00:00`);

    if (isNaN(dataFormatada.getTime())) return data;

    return dataFormatada.toLocaleDateString("pt-BR");
}

export type SituacaoVencimento = "vencido" | "hoje" | "em-dia";

function hojeLocal(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
}

export function situacaoVencimento(
    data: string | null | undefined,
): SituacaoVencimento | null {
    if (!data) return null;

    const dia = data.slice(0, 10); // "YYYY-MM-DD"
    const hoje = hojeLocal();

    if (dia < hoje) return "vencido";
    if (dia === hoje) return "hoje";
    return "em-dia";
}

export function formatarBooleano(valor: boolean): string {
    return valor ? "Sim" : "Não";
}