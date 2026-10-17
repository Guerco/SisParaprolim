<?php

namespace App\Http\Services;

use App\Http\Requests\Atleta\StoreAtletaRequest;
use App\Http\Requests\Atleta\UpdateAtletaRequest;
use App\Http\Resources\Atleta\AtletaListagemConfig;
use App\Http\Resources\Atleta\AtletaListagemResource;
use App\Http\Resources\Atleta\AtletaResource;
use App\Models\Atleta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AtletaService
{
    // =========================================================================
    // Listagem, Busca, Filtros e Ordenação
    // =========================================================================

    public function getAll(Request $request)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $query = $this->aplicarFiltrosGetAll(Atleta::query(), $request);
        $query = $this->aplicarOrdenacaoGetAll($query, $request);

        $atletas = $query
            // ->with(['atletaDeficiencias', 'atletaModalidades'])
            ->paginate($perPage)
            ->withQueryString();

        return AtletaListagemResource::collection($atletas);
    }

    private function aplicarFiltrosGetAll($query, Request $request)
    {
        $busca = trim((string) $request->input('busca', ''));

        $filtros = AtletaListagemConfig::filtraveis();

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
        $camposBusca = AtletaListagemConfig::buscaveis();

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

        if ($campo && in_array($campo, AtletaListagemConfig::ordenaveis())) {
            return $query->orderBy($campo, $direcao);
        }

        $padrao = AtletaListagemConfig::ordenacaoPadrao();

        return $query->orderBy($padrao['campo'], $padrao['direcao']);
    }

    // =========================================================================
    // Detalhes (Show)
    // =========================================================================

    public function findById($id)
    {
        $atleta = Atleta::with(['atletaDeficiencias.deficiencia', 'atletaModalidades.modalidade'])
            ->findOrFail($id);

        return new AtletaResource($atleta);
    }

    // =========================================================================
    // Cadastro (Store)
    // =========================================================================

    public function create(StoreAtletaRequest $request)
    {
        DB::transaction(function () use ($request) {
            $dados = $request->validated();

            $deficiencias = $dados['deficiencias'] ?? [];
            $modalidades = $dados['modalidades'] ?? [];

            unset($dados['deficiencias'], $dados['modalidades']);

            $atleta = Atleta::create($dados);

            $atleta->num_cad = 'P' . str_pad($atleta->id, 5, '0', STR_PAD_LEFT);
            $atleta->save();

            foreach ($deficiencias as $d) {
                $atleta->deficiencias()->attach($d['deficiencia_id'], [
                    'possui_laudo' => $d['possui_laudo'],
                ]);
            }

            foreach ($modalidades as $m) {
                $atleta->modalidades()->attach($m['modalidade_id'], [
                    'classe' => $m['classe'] ?? null,
                    'validade_atestado' => $m['validade_atestado'] ?? null,
                ]);
            }
        });
    }

    // =========================================================================
    // Edição (Update)
    // =========================================================================

    public function edit(UpdateAtletaRequest $request, $id)
    {
        DB::transaction(function () use ($request, $id) {
            $atleta = Atleta::findOrFail($id);

            $dados = $request->validated();

            $deficiencias = $dados['deficiencias'] ?? null;
            $modalidades = $dados['modalidades'] ?? null;

            unset($dados['deficiencias'], $dados['modalidades']);

            $atleta->update($dados);

            if ($deficiencias !== null) {
                $sync = [];
                foreach ($deficiencias as $d) {
                    $sync[$d['deficiencia_id']] = ['possui_laudo' => $d['possui_laudo']];
                }
                $atleta->deficiencias()->sync($sync);
            }

            if ($modalidades !== null) {
                $sync = [];
                foreach ($modalidades as $m) {
                    $sync[$m['modalidade_id']] = [
                        'classe' => $m['classe'] ?? null,
                        'validade_atestado' => $m['validade_atestado'] ?? null,
                    ];
                }
                $atleta->modalidades()->sync($sync);
            }
        });
    }

    // =========================================================================
    // Exclusão (Destroy)
    // =========================================================================

    public function remove($id)
    {
        $atleta = Atleta::findOrFail($id);
        $atleta->delete();
    }
}