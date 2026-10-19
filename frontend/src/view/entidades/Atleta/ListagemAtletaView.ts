import { AtletaBuscaConfig } from '../../../model/config/listagem/busca/AtletaBuscaConfig';
import { AtletaListagemConfig } from '../../../model/config/listagem/lista/AtletaListagemConfig';
import type { AtletaListagem } from '../../../model/dto/Atleta/AtletaListagem';
import type { TabelaListagem, EstadoBusca } from '../../../ui/elementos/TabelaListagem';
import { TabelaListagemView, type EventoMudarEstado } from '../../../view/elementos/TabelaListagemView';
import { ListagemAtletaController } from '../../../presenter/Atleta/ListagemAtletaController';

export class ListagemAtletaView {

    private tabela!: TabelaListagem<AtletaListagem>;
    private tabelaView!: TabelaListagemView<AtletaListagem>;
    private controladora = new ListagemAtletaController();

    constructor(
        private container: HTMLElement,
    ) { }

    // Ponto de entrada: 1º fetch (via controladora) + montagem + bind do evento de mudança de estado.
    async iniciar(): Promise<void> {
        const estadoInicial = AtletaListagemConfig.estadoInicial;

        // No 1º fetch não há concorrência ainda; `buscar` retorna a paginação ou lança.
        const paginacaoInicial = await this.controladora.buscar(estadoInicial);
        if (!paginacaoInicial) return; // improvável, mas mantém o tipo correto

        this.tabela = {
            titulo: AtletaListagemConfig.titulo,
            colunas: AtletaListagemConfig.colunas,
            paginacao: paginacaoInicial,
            estado: estadoInicial,
            config: AtletaBuscaConfig,
            exibir: { busca: true, filtragem: true, ordenacao: true },
        };

        this.tabelaView = new TabelaListagemView<AtletaListagem>(this.tabela, this.container);

        // A TabelaListagemView só avisa; a view do atleta delega à controladora.
        this.tabelaView.addEventListener('mudar-estado', (event) => {
            const estado = (event as EventoMudarEstado).detail;
            void this.carregarDados(estado);
        });

        this.tabelaView.iniciar();
    }

    // Orquestra: pede à controladora e repassa o resultado (ou erro) à TabelaListagemView.
    private async carregarDados(estado: EstadoBusca): Promise<void> {
        this.tabelaView.exibirCarregando();

        try {
            const paginacao = await this.controladora.buscar(estado);
            if (!paginacao) return; // requisição superada — ignora silenciosamente

            this.tabelaView.atualizar(paginacao);
        } catch (err) {
            this.tabelaView.exibirMensagem((err as Error).message);
            this.tabelaView.ocultarCarregando();
        }
    }
}