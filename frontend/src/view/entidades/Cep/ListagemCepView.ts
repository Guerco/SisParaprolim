import { CepBuscaConfig } from '../../../model/config/listagem/busca/CepBuscaConfig';
import { CepListagemConfig } from '../../../model/config/listagem/lista/CepListagemConfig';
import type { CepListagem } from '../../../model/dto/Cep/CepListagem';
import type { TabelaListagem, EstadoBusca } from '../../../ui/elementos/TabelaListagem';
import { TabelaListagemView, type EventoMudarEstado } from '../../../view/elementos/TabelaListagemView';
import { ListagemCepController } from '../../../presenter/Cep/ListagemCepController';

export class ListagemCepView {

    private tabela!: TabelaListagem<CepListagem>;
    private tabelaView!: TabelaListagemView<CepListagem>;
    private controladora = new ListagemCepController();

    constructor(
        private container: HTMLElement,
    ) { }

    // Ponto de entrada: 1º fetch (via controladora) + montagem + bind do evento de mudança de estado.
    async iniciar(): Promise<void> {
        const estadoInicial = CepListagemConfig.estadoInicial;

        const paginacaoInicial = await this.controladora.buscar(estadoInicial);
        if (!paginacaoInicial) return;

        this.tabela = {
            titulo: CepListagemConfig.titulo,
            colunas: CepListagemConfig.colunas,
            paginacao: paginacaoInicial,
            estado: estadoInicial,
            config: CepBuscaConfig,
            exibir: { busca: true, filtragem: true, ordenacao: true },
        };

        this.tabelaView = new TabelaListagemView<CepListagem>(this.tabela, this.container);

        // A TabelaListagemView só avisa; a view do CEP delega à controladora.
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