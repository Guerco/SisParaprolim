import { DeficienciaBuscaConfig } from '../../../model/config/listagem/busca/DeficienciaBuscaConfig';
import { DeficienciaListagemConfig } from '../../../model/config/listagem/lista/DeficienciaListagemConfig';
import type { DeficienciaListagem } from '../../../model/dto/Deficiencia/DeficienciaListagem';
import type { TabelaListagem, EstadoBusca } from '../../../ui/elementos/TabelaListagem';
import { TabelaListagemView, type EventoMudarEstado } from '../../../view/elementos/TabelaListagemView';
import { ListagemDeficienciaController } from '../../../presenter/Deficiencia/ListagemDeficienciaController';

export class ListagemDeficienciaView {

    private tabela!: TabelaListagem<DeficienciaListagem>;
    private tabelaView!: TabelaListagemView<DeficienciaListagem>;
    private controladora = new ListagemDeficienciaController();

    constructor(
        private container: HTMLElement,
    ) { }

    // Ponto de entrada: 1º fetch (via controladora) + montagem + bind do evento de mudança de estado.
    async iniciar(): Promise<void> {
        const estadoInicial = DeficienciaListagemConfig.estadoInicial;

        const paginacaoInicial = await this.controladora.buscar(estadoInicial);
        if (!paginacaoInicial) return;

        this.tabela = {
            titulo: DeficienciaListagemConfig.titulo,
            colunas: DeficienciaListagemConfig.colunas,
            paginacao: paginacaoInicial,
            estado: estadoInicial,
            config: DeficienciaBuscaConfig,
            exibir: { busca: true, filtragem: false, ordenacao: true },
        };

        this.tabelaView = new TabelaListagemView<DeficienciaListagem>(this.tabela, this.container);

        // A TabelaListagemView só avisa; a view da deficiência delega à controladora.
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