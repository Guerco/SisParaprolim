<?php

namespace App\Http\Services;

use App\Http\Requests\TipoDeficiencia\StoreTipoDeficienciaRequest;
use App\Http\Requests\TipoDeficiencia\UpdateTipoDeficienciaRequest;
use App\Http\Resources\Deficiencia\DeficienciaResumoResource;
use App\Http\Resources\TipoDeficiencia\TipoDeficienciaListagemConfig;
use App\Http\Resources\TipoDeficiencia\TipoDeficienciaResource;
use App\Models\TipoDeficiencia;
use Illuminate\Http\Request;

class TipoDeficienciaService
{
    // =========================================================================
    // Listagem, Busca, Filtros e Ordenação
    // =========================================================================

    public function getAll(Request $request)
    {
        $semPaginacao = filter_var($request->query('paginacao', 'true'), FILTER_VALIDATE_BOOLEAN) === false;

        $query = $this->aplicarFiltrosGetAll(TipoDeficiencia::query(), $request);
        $query = $this->aplicarOrdenacaoGetAll($query, $request);

        if ($semPaginacao) {
            return TipoDeficienciaResource::collection($query->get());
        }

        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $tipos_deficiencias = $query
            ->paginate($perPage)
            ->withQueryString();

        return TipoDeficienciaResource::collection($tipos_deficiencias);
    }

    private function aplicarFiltrosGetAll($query, Request $request)
    {
        $busca = trim((string) $request->input('busca', ''));

        $filtros = TipoDeficienciaListagemConfig::filtraveis();

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
        $camposBusca = TipoDeficienciaListagemConfig::buscaveis();

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

        if ($campo && in_array($campo, TipoDeficienciaListagemConfig::ordenaveis())) {
            return $query->orderBy($campo, $direcao);
        }

        $padrao = TipoDeficienciaListagemConfig::ordenacaoPadrao();

        return $query->orderBy($padrao['campo'], $padrao['direcao']);
    }

    // =========================================================================
    // Detalhes (Show)
    // =========================================================================

    public function findById($id)
    {
        $tipo_deficiencia = TipoDeficiencia::with('deficiencias')->findOrFail($id);
        return new TipoDeficienciaResource($tipo_deficiencia);
    }

    // =========================================================================
    // Cadastro (Store)
    // =========================================================================

    public function create(StoreTipoDeficienciaRequest $request)
    {
        TipoDeficiencia::create($request->validated());
    }

    // =========================================================================
    // Edição (Update)
    // =========================================================================

    public function edit(UpdateTipoDeficienciaRequest $request, $id)
    {
        $tipo_deficiencia = TipoDeficiencia::findOrFail($id);
        $tipo_deficiencia->update($request->validated());
    }

    // =========================================================================
    // Exclusão (Destroy)
    // =========================================================================

    public function remove($id)
    {
        $tipo_deficiencia = TipoDeficiencia::findOrFail($id);
        $tipo_deficiencia->delete();
    }

    // =========================================================================
    // Listagem de Deficiências por Tipo
    // =========================================================================

    public function getDeficienciasById(Request $request, $id)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $tipo = TipoDeficiencia::findOrFail($id);

        $deficiencias = $tipo->deficiencias()
            ->paginate($perPage)
            ->withQueryString();

        return DeficienciaResumoResource::collection($deficiencias);
    }
}