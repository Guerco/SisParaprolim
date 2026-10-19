import { ModalidadeBuscaConfig } from '../../../model/config/listagem/busca/ModalidadeBuscaConfig';
import { ModalidadeListagemConfig } from '../../../model/config/listagem/lista/ModalidadeListagemConfig';
import type { ModalidadeListagem } from '../../../model/dto/Modalidade/ModalidadeListagem';
import type { TabelaListagem, EstadoBusca } from '../../../ui/elementos/TabelaListagem';
import { TabelaListagemView, type EventoMudarEstado } from '../../../view/elementos/TabelaListagemView';
import { ListagemModalidadeController } from '../../../presenter/Modalidade/ListagemModalidadeController';

export class ListagemModalidadeView {

    private tabela!: TabelaListagem<ModalidadeListagem>;
    private tabelaView!: TabelaListagemView<ModalidadeListagem>;
    private controladora = new ListagemModalidadeController();

    constructor(
        private container: HTMLElement,
    ) { }

    // Ponto de entrada: 1º fetch (via controladora) + montagem + bind do evento de mudança de estado.
    async iniciar(): Promise<void> {
        const estadoInicial = ModalidadeListagemConfig.estadoInicial;

        const paginacaoInicial = await this.controladora.buscar(estadoInicial);
        if (!paginacaoInicial) return;

        this.tabela = {
            titulo: ModalidadeListagemConfig.titulo,
            colunas: ModalidadeListagemConfig.colunas,
            paginacao: paginacaoInicial,
            estado: estadoInicial,
            config: ModalidadeBuscaConfig,
            exibir: { busca: true, filtragem: false, ordenacao: true },
        };

        this.tabelaView = new TabelaListagemView<ModalidadeListagem>(this.tabela, this.container);

        // A TabelaListagemView só avisa; a view da modalidade delega à controladora.
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
            if (!paginacao) return;

            this.tabelaView.atualizar(paginacao);
        } catch (err) {
            this.tabelaView.exibirMensagem((err as Error).message);
            this.tabelaView.ocultarCarregando();
        }
    }
}