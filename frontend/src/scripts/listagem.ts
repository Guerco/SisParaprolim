import { rotasPaginas } from '../config/rotas';

import { ListagemAtletaView } from '../view/entidades/Atleta/ListagemAtletaView';
import { ListagemModalidadeView } from '../view/entidades/Modalidade/ListagemModalidadeView';
import { ListagemTipoDeficienciaView } from '../view/entidades/TipoDeficiencia/ListagemTipoDeficienciaView';
import { ListagemDeficienciaView } from '../view/entidades/Deficiencia/ListagemDeficienciaView';
import { ListagemCepView } from '../view/entidades/Cep/ListagemCepView';

type NovaListagemView = new (container: HTMLElement) => { iniciar(): Promise<void> };

// Chave = valor de ?entidade=  →  classe da view
const viewsPorEntidade: Record<string, NovaListagemView> = {
    atletas: ListagemAtletaView,
    modalidades: ListagemModalidadeView,
    'tipos-deficiencias': ListagemTipoDeficienciaView,
    deficiencias: ListagemDeficienciaView,
    ceps: ListagemCepView,
};

// Injeta os links das páginas conhecidas no topo do <body>, soltos (sem wrapper).
function injetarLinksPaginas(): void {
    const entradas = Object.entries(rotasPaginas.listagem) as Array<
        [keyof typeof rotasPaginas.listagem, string]
    >;

    const fragmento = document.createDocumentFragment();

    for (const [chave, href] of entradas) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = chave;
        a.dataset.entidade = chave;
        a.style.marginRight = '12px';
        fragmento.appendChild(a);
    }

    document.body.prepend(fragmento);
}

async function iniciar(): Promise<void> {
    injetarLinksPaginas();

    const div = document.getElementById('listagem')!;
    const entidade = new URLSearchParams(window.location.search).get('entidade') ?? 'atletas';

    // Valida via rotasPaginas (fonte única de verdade) e resolve a view em viewsPorEntidade.
    const entidadeValida = entidade in rotasPaginas.listagem;

    if (!entidadeValida) {
        div.textContent = `Entidade desconhecida: ${entidade}`;
        return;
    }

    const View = viewsPorEntidade[entidade];

    if (!View) {
        div.textContent = `Sem view registrada para: ${entidade}`;
        return;
    }

    const view = new View(div);
    await view.iniciar();
}

void iniciar();