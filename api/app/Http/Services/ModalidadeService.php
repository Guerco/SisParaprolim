<?php

namespace App\Http\Services;

use App\Http\Requests\Modalidade\StoreModalidadeRequest;
use App\Http\Resources\Atleta\AtletaListagemResource;
use App\Http\Resources\Modalidade\ModalidadeListagemConfig;
use App\Http\Resources\Modalidade\ModalidadeResource;
use App\Models\Modalidade;
use Illuminate\Http\Request;

class ModalidadeService
{
    // =========================================================================
    // Listagem, Busca, Filtros e Ordenação
    // =========================================================================

    public function getAll(Request $request)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $query = $this->aplicarFiltrosGetAll(Modalidade::query(), $request);
        $query = $this->aplicarOrdenacaoGetAll($query, $request);

        $modalidades = $query
            ->paginate($perPage)
            ->withQueryString();

        return ModalidadeResource::collection($modalidades);
    }

    private function aplicarFiltrosGetAll($query, Request $request)
    {
        $busca = trim((string) $request->input('busca', ''));

        $filtros = ModalidadeListagemConfig::filtraveis();

        // Aplica os filtros dinamicamente
        foreach ($filtros as $campo => $config) {
            $valor = $request->query($campo);

            if ($valor === null) {
                continue; // Ignora se não foi enviado
            }

            if ($config['tipo'] === 'boolean') {
                $valorBooleano = in_array($valor, ['true', 'false'], true)
                    ? filter_var($valor, FILTER_VALIDATE_BOOLEAN)
                    : null;

                if ($valorBooleano !== null) {
                    $query->where($campo, $valorBooleano);
                }
            }

            if ($config['tipo'] === 'enum') {
                if (in_array($valor, $config['opcoes'], true)) {
                    $query->where($campo, $valor);
                }
            }
        }

        // Aplica a busca com base nos campos definidos no Config
        $camposBusca = ModalidadeListagemConfig::buscaveis();

        return $query->when(
            $busca !== '' && !empty($camposBusca),
            fn($q) => $q->where(function ($q) use ($busca, $camposBusca) {
                $termo = '%' . addcslashes($busca, '%_\\') . '%';
                
                foreach ($camposBusca as $indice => $campo) {
                    if ($indice === 0) {
                        $q->where($campo, 'like', $termo);
                    } else {
                        $q->orWhere($campo, 'like', $termo);
                    }
                }
            })
        );
    }

    private function aplicarOrdenacaoGetAll($query, Request $request)
    {
        $campo = $request->query('ordenar_por');
        $direcao = $request->query('direcao', 'asc') === 'desc' ? 'desc' : 'asc';

        if ($campo && in_array($campo, ModalidadeListagemConfig::ordenaveis())) {
            return $query->orderBy($campo, $direcao);
        }

        $padrao = ModalidadeListagemConfig::ordenacaoPadrao();

        return $query->orderBy($padrao['campo'], $padrao['direcao']);
    }

    // =========================================================================
    // Detalhes (Show)
    // =========================================================================

    public function findById($id)
    {
        $modalidade = Modalidade::findOrFail($id);
        return new ModalidadeResource($modalidade);
    }

    // =========================================================================
    // Cadastro (Store)
    // =========================================================================

    public function create(StoreModalidadeRequest $request)
    {
        Modalidade::create($request->validated());
    }

    // =========================================================================
    // Edição (Update)
    // =========================================================================

    public function edit(StoreModalidadeRequest $request, $id)
    {
        $modalidade = Modalidade::findOrFail($id);
        $modalidade->update($request->validated());
    }

    // =========================================================================
    // Exclusão (Destroy)
    // =========================================================================

    public function remove($id)
    {
        $modalidade = Modalidade::findOrFail($id);
        $modalidade->delete();
    }

    // =========================================================================
    // Listagem de Atletas por Modalidade
    // =========================================================================

    public function getAtletasByModalidade(Request $request, $modalidade)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $modalidade = Modalidade::findOrFail($modalidade);

        $atletas = $modalidade->atletas()
            // Lista apenas os atletas ativos da modalidade.
            ->where('esta_ativo', true)
            // ->with(['atletaModalidades.modalidade'])
            ->paginate($perPage)
            ->withQueryString();

        return AtletaListagemResource::collection($atletas);
        // return AtletaResource::collection($atletas);
    }
}