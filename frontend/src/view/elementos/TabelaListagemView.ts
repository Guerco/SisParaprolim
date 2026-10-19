import { TABELA } from "../../config/tabela";
import type { BuscaConfig } from "../../model/config/listagem/busca/BuscaConfig";
import type { ColunaListagem, EstadoBusca, TabelaListagem } from "../../ui/elementos/TabelaListagem";
import { UtilDOM } from "../../util/UtilDOM";

// export type TabelaListagemEventos = {
//     aoMudarEstado: (estado: EstadoBusca) => void;
// };

export type EventoMudarEstado = CustomEvent<EstadoBusca>;

export class TabelaListagemView<T extends { id: number }> extends EventTarget {

    private mensagem!: HTMLOutputElement;
    private painelFiltros!: HTMLElement;
    private botaoToggleFiltros!: HTMLButtonElement;
    private textoToggleFiltros!: HTMLSpanElement;
    private estadoAplicado!: EstadoBusca;
    private formBusca: HTMLFormElement | null = null;
    private selectRegistrosPagina!: HTMLSelectElement;
    private inputPagina!: HTMLInputElement;
    private navPaginacao!: HTMLElement;
    private tabelaDados!: HTMLTableElement;

    constructor(
        private tabela: TabelaListagem<T>,
        private container: HTMLElement,
        // private eventos: TabelaListagemEventos,
    ) {
        super();
    }

    // Monta tudo com a primeira paginação (tabela.paginacao) e insere no container.
    iniciar(): void {
        document.title = `Listagem de ${this.tabela.titulo}`;
        this.estadoAplicado = this.clonarEstado(this.tabela.estado);
        this.container.replaceChildren(this.montarListagem());
    }

    // ---------- Estrutura geral ----------

    // Cria o wrapper .listagem e junta: form (se houver), container da tabela (mensagem + tabela) e paginação.
    private montarListagem(): HTMLDivElement {
        const divListagem = UtilDOM.criaComClasses('div', 'listagem') as HTMLDivElement;

        divListagem.append(
            UtilDOM.criaComTextoEClasses(
                'h2',
                `Listagem de ${this.tabela.titulo ?? ''}`.trim(),
                'titulo-listagem'
            )
        );

        const formBusca = this.montarFormBusca();
        if (formBusca) divListagem.appendChild(formBusca);

        divListagem.append(
            this.montarContainerTabela(),
            this.montarPaginacao()
        );
        return divListagem;
    }

    // ======================================================================
    //                  Busca
    // ======================================================================

    // Cria o <form> com a barra e o painel de filtros. Devolve null se as três flags de `exibir` forem false.
    private montarFormBusca(): HTMLFormElement | null {
        const { busca, ordenacao, filtragem } = this.tabela.exibir;

        if (!busca && !ordenacao && !filtragem) {
            return null;
        }

        const formBusca = UtilDOM.criaComClasses('form', 'listagem-form') as HTMLFormElement;
        formBusca.append(this.montarBarraListagem());

        formBusca.addEventListener('submit', (event) => {
            event.preventDefault();
            this.aplicarEstadoDoForm();
        });

        if (filtragem) {
            formBusca.append(this.montarPainelFiltros());
        }

        this.formBusca = formBusca;
        return formBusca;
    }

    // ---------- Barra superior ----------

    // Cria a section da barra e inclui busca, ordenação e botão de filtros conforme as flags.
    private montarBarraListagem(): HTMLElement {
        const { busca, ordenacao, filtragem } = this.tabela.exibir;
        const barra = UtilDOM.criaComClasses('section', 'barra-listagem');

        if (busca || ordenacao) {
            const controles = UtilDOM.criaComClasses('div', 'controles-principais');
            if (busca) controles.append(this.montarBusca());
            if (ordenacao) controles.append(this.montarOrdenacao());
            barra.append(controles);
        } else {
            barra.append(
                UtilDOM.criaComTextoEClasses('span', this.tabela.titulo ?? 'Listagem', ['titulo-listagem'])
            );
        }

        if (filtragem) barra.append(this.montarBotaoFiltros());

        return barra;
    }

    // Grupo da busca: input (placeholder = config.busca.texto, valor = estado.busca) + botão da lupa (submit).
    private montarBusca(): HTMLElement {
        const grupoBusca = UtilDOM.criaComClasses('div', 'grupo-busca') as HTMLDivElement;

        const inputBusca = UtilDOM.criaComClasses('input', 'campo-busca') as HTMLInputElement;
        inputBusca.name = 'busca';
        inputBusca.type = 'search';
        inputBusca.placeholder = this.tabela.config.busca.texto;

        const botaoBusca = UtilDOM.criaComTextoEClasses('button', '🔍', 'botao-busca') as HTMLButtonElement;

        botaoBusca.type = 'submit';
        botaoBusca.title = 'buscar';

        grupoBusca.append(inputBusca, botaoBusca);
        return grupoBusca;
    }

    // Grupo da ordenação: label envolvendo o select + botão de direção.
    private montarOrdenacao(): HTMLElement {
        const grupoOrdenacao = UtilDOM.criaComClasses('div', 'grupo-ordenacao') as HTMLDivElement;

        const labelOrdenacao = UtilDOM.criaComTextoEClasses('label', 'Ordenar por:', 'label-ordenacao');
        labelOrdenacao.appendChild(this.montarSelectOrdenacao())

        grupoOrdenacao.append(
            labelOrdenacao,
            this.montarBotaoDirecao()
        );
        return grupoOrdenacao;
    }

    // Select com as opções de config.ordenacao.ordenaveis (value = campo, texto = alias), marcando estado.ordenar.
    private montarSelectOrdenacao(): HTMLSelectElement {
        const selectOrdenacao = UtilDOM.criaComClasses('select', 'select-ordenacao') as HTMLSelectElement;
        selectOrdenacao.name = 'ordenar';

        selectOrdenacao.append(
            ...this.tabela.config.ordenacao.ordenaveis.map(
                (o) => UtilDOM.criaSelectOption(o.campo, o.alias)
            )
        )

        selectOrdenacao.value = this.estadoAplicado.ordenar;
        selectOrdenacao.addEventListener('change', () => this.aplicarEstadoDoForm());
        return selectOrdenacao;
    }

    // Botão com data-direcao = estado.direcao (a seta vem do CSS).
    private montarBotaoDirecao(): HTMLButtonElement {
        const botaoDirecao = UtilDOM.cria('button') as HTMLButtonElement;
        botaoDirecao.className = 'botao-direcao-ordenacao';
        botaoDirecao.type = 'button';
        botaoDirecao.title = 'Alternar direção de ordenação';

        this.aplicarDirecao(botaoDirecao, this.estadoAplicado.direcao);

        botaoDirecao.addEventListener('click', () => {
            const nova = botaoDirecao.dataset.direcao === 'asc' ? 'desc' : 'asc';
            this.aplicarDirecao(botaoDirecao, nova);

            // lê o form (que tem o select de ordenação) e força page = 1
            this.aplicarEstado({
                ...this.obterEstadoDoForm(1),
                direcao: nova,
            });
        });

        return botaoDirecao;
    }
    private aplicarDirecao(botao: HTMLButtonElement, direcao: 'asc' | 'desc'): void {
        botao.dataset.direcao = direcao;
        botao.textContent = direcao === 'asc' ? '\u2191' : '\u2193';
    }

    // Botão de expandir/recolher filtros: texto "Filtros" + seta.
    private montarBotaoFiltros(): HTMLButtonElement {
        const botao = UtilDOM.criaComClasses('button', 'botao-toggle-filtros') as HTMLButtonElement;
        botao.type = 'button';

        const texto = UtilDOM.criaComTextoEClasses('span', 'Exibir Filtros', 'texto-toggle-filtros') as HTMLSpanElement;

        botao.append(
            texto,
            UtilDOM.criaComTextoEClasses('span', '▾', 'seta-filtros'),
        );
        botao.addEventListener('click', () => this.alternarPainelFiltros());

        this.botaoToggleFiltros = botao;
        this.textoToggleFiltros = texto;

        return botao;
    }



    // ---------- Painel de filtros ----------

    // Section hidden com um grupo por filtro e as ações. Só é montado se exibir.filtragem for true.
    private montarPainelFiltros(): HTMLElement {
        const painelFiltros = UtilDOM.criaComClasses('section', 'painel-filtros') as HTMLElement;
        painelFiltros.hidden = true;

        painelFiltros.append(
            ...this.tabela.config.filtragem.filtraveis.map((f) => this.montarFiltro(f)),
            this.montarAcoesFiltros()
        );

        this.painelFiltros = painelFiltros;
        return painelFiltros;
    }

    // Label com o nome do filtro + select. As opções vêm de filtro.opcoes e a selecionada é a do estado (ou a marcada com padrao).
    private montarFiltro(filtro: BuscaConfig<T>['filtragem']['filtraveis'][number]): HTMLLabelElement {
        const labelFiltro = UtilDOM.criaComClasses('label', 'grupo-filtro') as HTMLLabelElement;
        const selectFiltro = UtilDOM.criaComClasses('select', 'campo-filtro') as HTMLSelectElement;
        selectFiltro.name = filtro.campo;

        selectFiltro.append(
            ...filtro.opcoes.map((o) => UtilDOM.criaSelectOption(o.valor, o.alias))
        )

        selectFiltro.value =
            this.estadoAplicado.filtros[filtro.campo]
            ?? filtro.opcoes.find((o) => o.padrao)?.valor
            ?? '';

        labelFiltro.append(
            UtilDOM.criaComTextoEClasses('span', filtro.alias, 'label-filtro'),
            selectFiltro
        )

        return labelFiltro;
    }

    // Botões "Limpar filtros" (type=button) e "Aplicar filtros" (type=submit).
    private montarAcoesFiltros(): HTMLElement {
        const divAcoesFiltros = UtilDOM.criaComClasses('div', 'acoes-filtros') as HTMLDivElement;

        const botaoLimparFiltros = UtilDOM.criaComTextoEClasses('button', 'Limpar Filtros', [
            'botao-filtro',
            'botao-limpar-filtros',
        ]) as HTMLButtonElement;
        botaoLimparFiltros.type = 'button';
        botaoLimparFiltros.addEventListener('click', () => this.limparFiltros());


        const botaoAplicarFiltros = UtilDOM.criaComTextoEClasses('button', 'Aplicar Filtros', [
            'botao-filtro',
            'botao-aplicar-filtros',
        ]) as HTMLButtonElement;
        botaoAplicarFiltros.type = 'submit';
        botaoAplicarFiltros.addEventListener('click', () => this.fecharPainelFiltros());

        divAcoesFiltros.append(botaoLimparFiltros, botaoAplicarFiltros);

        return divAcoesFiltros;
    }

    private alternarPainelFiltros(): void {
        const abrir = this.painelFiltros.hidden;

        this.painelFiltros.hidden = !abrir;
        this.botaoToggleFiltros.classList.toggle('aberto', abrir);
        this.textoToggleFiltros.textContent = abrir ? 'Ocultar Filtros' : 'Exibir Filtros';
    }

    private fecharPainelFiltros(): void {
        this.painelFiltros.hidden = true;
        this.botaoToggleFiltros.classList.remove('aberto');
        this.textoToggleFiltros.textContent = 'Exibir Filtros';
    }

    private limparFiltros(): void {
        this.painelFiltros
            .querySelectorAll<HTMLSelectElement>('.campo-filtro')
            .forEach((select) => {
                const filtro = this.tabela.config.filtragem.filtraveis.find((f) => f.campo === select.name);
                select.value = filtro?.opcoes.find((o) => o.padrao)?.valor ?? '';
            });
    }



    // ======================================================================
    //                  Tabela
    // ======================================================================

    // ---------- Container da tabela ----------

    // <div class="tabela-container"> com overflow: junta a mensagem de estado (acima) e a <table>.
    private montarContainerTabela(): HTMLElement {
        const divTabelaContainer = UtilDOM.criaComClasses('div', 'tabela-container');

        divTabelaContainer.append(
            this.montarMensagem(),
            this.montarTabela()
        );

        return divTabelaContainer;
    }

    private montarMensagem(): HTMLOutputElement {
        this.mensagem = UtilDOM.criaComClasses('output', 'mensagem-listagem') as HTMLOutputElement;

        this.mensagem.textContent = this.tabela.paginacao.data.length === 0 ? 'Nenhum registro encontrado.' : '';

        return this.mensagem;
    }

    // ---------- Tabela ----------

    // <table> montada com colgroup, thead e tbody.
    private montarTabela(): HTMLTableElement {
        const tabelaDados = UtilDOM.criaComClasses('table', 'tabela-dados') as HTMLTableElement;

        tabelaDados.append(
            this.montarColgroupTabela(),
            this.montarCabecalhoTabela(),
            this.montarCorpoTabela(),
        );

        this.tabelaDados = tabelaDados;
        return tabelaDados;
    }

    // <colgroup> com um <col> por coluna, usando coluna.largura em % quando existir.
    private montarColgroupTabela(): HTMLTableColElement {
        const colGroup = UtilDOM.cria('colgroup') as HTMLTableColElement;


        colGroup.append(...this.tabela.colunas.map(
            (c) => {
                const col = UtilDOM.cria('col');
                if (c.largura) {
                    col.style.width = `${c.largura}%`;
                }
                return col;
            }
        ));

        return colGroup;
    }

    // <thead> com um <th> por coluna (texto = coluna.alias).
    private montarCabecalhoTabela(): HTMLTableSectionElement {
        const cabecalhoTabela = UtilDOM.criaComClasses('thead', 'cabecalho-tabela') as HTMLTableSectionElement;

        const linhaCabecalho = UtilDOM.cria('tr');

        linhaCabecalho.append(
            ...this.tabela.colunas.map((c) => UtilDOM.criaComTextoEClasses('th', c.alias, 'coluna-cabecalho'))
        );

        cabecalhoTabela.appendChild(linhaCabecalho);
        return cabecalhoTabela;
    }

    // <tbody>: uma linha por item de paginacao.data, ou a linha vazia quando não houver dados.
    private montarCorpoTabela(): HTMLTableSectionElement {
        const bodyTabela = UtilDOM.cria('tbody') as HTMLTableSectionElement;

        bodyTabela.append(
            ...this.tabela.paginacao.data.map((i) => this.montarLinha(i))
        );

        return bodyTabela;
    }

    // <tr> de um item, com data-chave e as células das colunas.
    private montarLinha(item: T): HTMLTableRowElement {
        const linhaTabela = UtilDOM.criaComClasses('tr', 'linha-tabela') as HTMLTableRowElement;
        linhaTabela.dataset.id = String(item.id);

        linhaTabela.append(
            ...this.tabela.colunas.map((c) => this.montarCelula(c, item))
        );

        return linhaTabela;
    }

    // <td>: usa coluna.formatar(valor, linha) quando existir, senão o valor cru. Sempre por textContent.
    private montarCelula(coluna: ColunaListagem<T>, item: T): HTMLTableCellElement {
        const valor = item[coluna.campo];

        const texto = coluna.formatar
            ? coluna.formatar(valor, item)
            : String(valor ?? '');

        return UtilDOM.criaComTextoEClasses('td', texto, 'celula-tabela') as HTMLTableCellElement;
    }





    // ======================================================================
    //                  Paginacao
    // ======================================================================

    // <nav> com o texto "Exibindo", os controles e o texto "Página x de y".
    private montarPaginacao(): HTMLElement {
        const navPaginacao = UtilDOM.criaComClasses('nav', 'paginacao');

        navPaginacao.append(
            this.montarTextoExibindoPaginacao(),
            this.montarGrupoRegistrosPagina(),
            this.montarControlesPaginacao(),
            this.montarTextoPaginaPaginacao(),
        );

        this.navPaginacao = navPaginacao;
        return navPaginacao;
    }

    // "Exibindo from-to de total" (trata from/to nulos quando a lista está vazia).
    private montarTextoExibindoPaginacao(): HTMLSpanElement {
        const textoExibindo = UtilDOM.criaComTextoEClasses(
            'span',
            `Exibindo ${this.tabela.paginacao.meta.from ?? 0}-${this.tabela.paginacao.meta.to ?? 0} de ${this.tabela.paginacao.meta.total} dados`,
            ['info-paginacao', 'info-registros']
        )
        return textoExibindo;
    }

    // Agrupamento do seletor de quantidade de registros por página.
    private montarGrupoRegistrosPagina(): HTMLElement {
        const divGrupoRegistrosPagina = UtilDOM.criaComClasses(
            'div',
            'grupo-registros-pagina'
        ) as HTMLDivElement;

        const labelRegistrosPagina = UtilDOM.criaComTextoEClasses(
            'label',
            'Registros por página:',
            'label-registros-pagina'
        ) as HTMLLabelElement;

        const selectRegistrosPagina = UtilDOM.criaComClasses(
            'select',
            'select-registros-pagina'
        ) as HTMLSelectElement;
        selectRegistrosPagina.name = 'registros-pagina';

        const porPagAtual = this.estadoAplicado.por_pag;

        const opcoes = TABELA.POR_PAG_OPCOES.includes(porPagAtual)
            ? TABELA.POR_PAG_OPCOES
            : [...TABELA.POR_PAG_OPCOES, porPagAtual].sort((a, b) => a - b);

        selectRegistrosPagina.append(
            ...opcoes.map((o) => UtilDOM.criaSelectOption(String(o), String(o)))
        );

        selectRegistrosPagina.value = String(porPagAtual);

        labelRegistrosPagina.appendChild(selectRegistrosPagina);
        divGrupoRegistrosPagina.appendChild(labelRegistrosPagina);

        selectRegistrosPagina.addEventListener('change', () => {
            this.mudarPorPag(Number(selectRegistrosPagina.value));
        });

        this.selectRegistrosPagina = selectRegistrosPagina;
        return divGrupoRegistrosPagina;
    }

    // Agrupa: anterior, primeiro, input da página, último e próximo.
    private montarControlesPaginacao(): HTMLElement {
        const divControlesPaginacao = UtilDOM.criaComClasses(
            'div',
            'controles-paginacao'
        ) as HTMLDivElement;

        const paginaAtual = this.tabela.paginacao.meta.current_page;
        const ultimaPagina = this.tabela.paginacao.meta.last_page;

        const anterior = this.montarBotaoPaginacao('◀', paginaAtual === 1, 'botao-anterior');
        anterior.addEventListener('click', () => this.irParaPagina(paginaAtual - 1));

        const primeira = this.montarBotaoPaginacao('Primeira', paginaAtual === 1, 'botao-primeira-pagina');
        primeira.addEventListener('click', () => this.irParaPagina(1));

        const ultima = this.montarBotaoPaginacao('Última', paginaAtual === ultimaPagina, 'botao-ultima-pagina');
        ultima.addEventListener('click', () => this.irParaPagina(ultimaPagina));

        const proximo = this.montarBotaoPaginacao('▶', paginaAtual === ultimaPagina, 'botao-proximo');
        proximo.addEventListener('click', () => this.irParaPagina(paginaAtual + 1));

        divControlesPaginacao.append(
            anterior,
            primeira,
            this.montarInputPaginacao(),
            ultima,
            proximo,
        );

        return divControlesPaginacao;
    }

    private montarBotaoPaginacao(
        texto: string,
        desabilitado: boolean,
        classeEspecifica: string
    ): HTMLButtonElement {
        const botao = UtilDOM.criaComTextoEClasses(
            'button',
            texto,
            ['botao-paginacao', classeEspecifica]
        ) as HTMLButtonElement;

        botao.type = 'button';
        botao.disabled = desabilitado;

        return botao;
    }

    // Input number: value = current_page, min = 1, max = last_page.
    private montarInputPaginacao(): HTMLInputElement {
        const inputPaginacao = UtilDOM.criaComClasses(
            'input',
            'input-pagina'
        ) as HTMLInputElement;

        inputPaginacao.name = 'pagina';
        inputPaginacao.type = 'number';
        inputPaginacao.min = '1';
        inputPaginacao.step = '1';
        inputPaginacao.value = String(this.tabela.paginacao.meta.current_page);
        inputPaginacao.max = String(this.tabela.paginacao.meta.last_page);

        const disparar = () => {
            const valor = Number(inputPaginacao.value);
            if (!Number.isFinite(valor)) return;
            this.irParaPagina(valor);
        };

        inputPaginacao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                disparar();
            }
        });
        inputPaginacao.addEventListener('change', disparar);

        this.inputPagina = inputPaginacao;
        return inputPaginacao;
    }

    // "Página current_page de last_page".
    private montarTextoPaginaPaginacao(): HTMLSpanElement {
        const textoPagina = UtilDOM.criaComTextoEClasses(
            'span',
            `Página ${this.tabela.paginacao.meta.current_page} de ${this.tabela.paginacao.meta.last_page}`,
            ['info-paginacao', 'info-pagina']
        )
        return textoPagina;
    }





    // ======================================================================
    //                  Atualizar Dados
    // ======================================================================

    atualizar(paginacao: TabelaListagem<T>['paginacao']): void {
        this.tabela.paginacao = paginacao;
        this.tabela.estado = this.clonarEstado(this.estadoAplicado);

        if (this.tabelaDados) {
            this.tabelaDados.replaceWith(this.montarTabela());
        }
        if (this.navPaginacao) {
            this.navPaginacao.replaceWith(this.montarPaginacao());
        }

        this.ocultarCarregando();
        this.mensagem.textContent = paginacao.data.length === 0
            ? 'Nenhum registro encontrado.'
            : '';
    }

    exibirMensagem(texto: string): void {
        this.mensagem.textContent = texto;
    }

    exibirCarregando(): void {
        this.mensagem.textContent = 'Carregando...';
        if (this.tabelaDados) this.tabelaDados.hidden = true;
        if (this.navPaginacao) this.navPaginacao.hidden = true;
    }

    ocultarCarregando(): void {
        if (this.tabelaDados) this.tabelaDados.hidden = false;
        if (this.navPaginacao) this.navPaginacao.hidden = false;
    }

    private clonarEstado(estado: EstadoBusca): EstadoBusca {
        return { ...estado, filtros: { ...estado.filtros } };
    }

    // Lê TODOS os controles do form + por_pag (fora do form). Usado por ações que não são de página.
    private obterEstadoDoForm(page: number): EstadoBusca {
        const dados = this.formBusca ? new FormData(this.formBusca) : new FormData();
        const filtros: Record<string, string> = {};

        if (this.formBusca) {
            this.formBusca
                .querySelectorAll<HTMLSelectElement>('.campo-filtro')
                .forEach((select) => {
                    if (select.value !== '') filtros[select.name] = select.value;
                });
        }

        const botaoDirecao = this.formBusca?.querySelector<HTMLButtonElement>('.botao-direcao-ordenacao');

        return {
            busca: String(dados.get('busca') ?? '').trim(),
            ordenar: String(dados.get('ordenar') ?? this.tabela.config.ordenacao.ordenaveis[0].campo),
            direcao: (botaoDirecao?.dataset.direcao as 'asc' | 'desc') ?? 'asc',
            filtros,
            page,
            por_pag: this.estadoAplicado?.por_pag ?? this.tabela.estado.por_pag,
        };
    }

    // Aplica e dispara. Ações não-página forçam page = 1.
    // private aplicarEstado(estado: EstadoBusca): void {
    //     this.estadoAplicado = this.clonarEstado(estado);
    //     this.eventos.aoMudarEstado(estado);
    // }

    private aplicarEstado(estado: EstadoBusca): void {
        this.estadoAplicado = this.clonarEstado(estado);
        this.dispatchEvent(new CustomEvent<EstadoBusca>('mudar-estado', { detail: estado }));
    }

    private aplicarEstadoDoForm(): void {
        this.aplicarEstado(this.obterEstadoDoForm(1));
    }

    // Partindo do estado aplicado, só troca a página.
    private irParaPagina(page: number): void {
        const ultima = this.tabela.paginacao.meta.last_page;
        const alvo = Math.min(Math.max(1, page), Math.max(1, ultima));
        this.aplicarEstado({ ...this.clonarEstado(this.estadoAplicado), page: alvo });
    }

    private mudarPorPag(porPag: number): void {
        this.aplicarEstado({ ...this.clonarEstado(this.estadoAplicado), por_pag: porPag, page: 1 });
    }
}