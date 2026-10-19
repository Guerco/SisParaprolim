import { TipoDeficienciaBuscaConfig } from '../../../model/config/listagem/busca/TipoDeficienciaBuscaConfig';
import { TipoDeficienciaListagemConfig } from '../../../model/config/listagem/lista/TipoDeficienciaListagemConfig';
import type { TipoDeficienciaListagem } from '../../../model/dto/TipoDeficiencia/TipoDeficienciaListagem';
import type { TabelaListagem, EstadoBusca } from '../../../ui/elementos/TabelaListagem';
import { TabelaListagemView, type EventoMudarEstado } from '../../../view/elementos/TabelaListagemView';
import { ListagemTipoDeficienciaController } from '../../../presenter/TipoDeficiencia/ListagemTipoDeficienciaController';

export class ListagemTipoDeficienciaView {

    private tabela!: TabelaListagem<TipoDeficienciaListagem>;
    private tabelaView!: TabelaListagemView<TipoDeficienciaListagem>;
    private controladora = new ListagemTipoDeficienciaController();

    constructor(
        private container: HTMLElement,
    ) { }

    // Ponto de entrada: 1º fetch (via controladora) + montagem + bind do evento de mudança de estado.
    async iniciar(): Promise<void> {
        const estadoInicial = TipoDeficienciaListagemConfig.estadoInicial;

        const paginacaoInicial = await this.controladora.buscar(estadoInicial);
        if (!paginacaoInicial) return;

        this.tabela = {
            titulo: TipoDeficienciaListagemConfig.titulo,
            colunas: TipoDeficienciaListagemConfig.colunas,
            paginacao: paginacaoInicial,
            estado: estadoInicial,
            config: TipoDeficienciaBuscaConfig,
            exibir: { busca: true, filtragem: false, ordenacao: true },
        };

        this.tabelaView = new TabelaListagemView<TipoDeficienciaListagem>(this.tabela, this.container);

        // A TabelaListagemView só avisa; a view do tipo de deficiência delega à controladora.
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