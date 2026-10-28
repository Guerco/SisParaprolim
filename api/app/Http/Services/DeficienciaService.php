<?php

namespace App\Http\Services;

use App\Http\Requests\Deficiencia\StoreDeficienciaRequest;
use App\Http\Requests\Deficiencia\UpdateDeficienciaRequest;
use App\Http\Resources\Atleta\AtletaResource;
use App\Http\Resources\Deficiencia\DeficienciaListagemConfig;
use App\Http\Resources\Deficiencia\DeficienciaListagemResource;
use App\Http\Resources\Deficiencia\DeficienciaResource;
use App\Models\Deficiencia;
use Illuminate\Http\Request;

class DeficienciaService
{
    // =========================================================================
    // Listagem, Busca, Filtros e Ordenação
    // =========================================================================

    public function getAll(Request $request)
    {
        $semPaginacao = filter_var($request->query('paginacao', 'true'), FILTER_VALIDATE_BOOLEAN) === false;

        $query = $this->aplicarFiltrosGetAll(Deficiencia::query(), $request);
        $query = $this->aplicarOrdenacaoGetAll($query, $request);

        if ($semPaginacao) {
            return DeficienciaListagemResource::collection($query->get());
        }

        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $deficiencias = $query
            ->with('tipoDeficiencia')
            ->paginate($perPage)
            ->withQueryString();

        return DeficienciaListagemResource::collection($deficiencias);
    }

    private function aplicarFiltrosGetAll($query, Request $request)
    {
        $busca = trim((string) $request->input('busca', ''));

        // Filtro especial: ?tipo=DF|DA|DV|DI (via join em tipos_deficiencias.tipo)
        $tipo = $request->query('tipo');

        if ($tipo !== null) {
            $tipo = strtoupper(trim((string) $tipo));

            if (in_array($tipo, ['DF', 'DA', 'DV', 'DI'], true)) {
                $query->join(
                    'tipos_deficiencias',
                    'tipos_deficiencias.id',
                    '=',
                    'deficiencias.tipo_deficiencia_id'
                )
                    ->where('tipos_deficiencias.tipo', $tipo)
                    ->select('deficiencias.*');
            }
        }

        $filtros = DeficienciaListagemConfig::filtraveis();

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
        $camposBusca = DeficienciaListagemConfig::buscaveis();

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

        if ($campo && in_array($campo, DeficienciaListagemConfig::ordenaveis())) {
            return $query->orderBy($campo, $direcao);
        }

        $padrao = DeficienciaListagemConfig::ordenacaoPadrao();

        return $query->orderBy($padrao['campo'], $padrao['direcao']);
    }

    // =========================================================================
    // Detalhes (Show)
    // =========================================================================

    public function findById($id)
    {
        $deficiencia = Deficiencia::with('tipoDeficiencia')->findOrFail($id);
        return new DeficienciaResource($deficiencia);
    }

    // =========================================================================
    // Cadastro (Store)
    // =========================================================================

    public function create(StoreDeficienciaRequest $request)
    {
        Deficiencia::create($request->validated());
    }

    // =========================================================================
    // Edição (Update)
    // =========================================================================

    public function edit(UpdateDeficienciaRequest $request, $id)
    {
        $deficiencia = Deficiencia::findOrFail($id);
        $deficiencia->update($request->validated());
    }

    // =========================================================================
    // Exclusão (Destroy)
    // =========================================================================

    public function remove($id)
    {
        $deficiencia = Deficiencia::findOrFail($id);
        $deficiencia->delete();
    }

    // =========================================================================
    // Listagem de Atletas por Deficiência
    // =========================================================================

    public function getAtletasByDeficiencia(Request $request, $deficiencia)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $deficiencia = Deficiencia::findOrFail($deficiencia);

        $atletas = $deficiencia->atletas()
            // Lista apenas os atletas ativos da deficiência.
            ->where('esta_ativo', true)
            ->with(['atletaDeficiencias.deficiencia'])
            ->paginate($perPage)
            ->withQueryString();

        return AtletaResource::collection($atletas);
    }
}