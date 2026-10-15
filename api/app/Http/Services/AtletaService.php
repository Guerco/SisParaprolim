<?php

namespace App\Http\Services;

use App\Http\Requests\Atleta\StoreAtletaRequest;
use App\Http\Requests\Atleta\UpdateAtletaRequest;
use App\Http\Resources\Atleta\AtletaListagemResource;
use App\Http\Resources\Atleta\AtletaResource;
use App\Models\Atleta;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AtletaService
{
    public function getAll(Request $request)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $atletas = $this->aplicarFiltrosGetAll(Atleta::query(), $request)
            ->with(['atletaDeficiencias', 'atletaModalidades'])
            ->paginate($perPage)
            ->withQueryString();

        return AtletaListagemResource::collection($atletas);
    }

    private function aplicarFiltrosGetAll($query, Request $request)
    {
        $busca = trim((string) $request->input('busca', ''));
        $estaAtivo = $request->query('esta_ativo');

        $estaAtivo = in_array($estaAtivo, ['true', 'false'], true)
            ? filter_var($estaAtivo, FILTER_VALIDATE_BOOLEAN)
            : null;

        return $query
            ->when(
                $estaAtivo !== null,
                fn ($q) => $q->where('esta_ativo', $estaAtivo)
            )
            ->when(
                $busca !== '',
                fn ($q) => $q->where(function ($q) use ($busca) {
                    $termo = '%' . addcslashes($busca, '%_\\') . '%';
                    $q->where('nome', 'like', $termo)
                    ->orWhere('cpf', 'like', $termo)
                    ->orWhere('num_cad', 'like', $termo);
                })
            );
    }

    public function findById($id)
    {
        $atleta = Atleta::with(['atletaDeficiencias.deficiencia', 'atletaModalidades.modalidade'])
            ->findOrFail($id);

        return new AtletaResource($atleta);
    }


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

    public function remove($id)
    {
        $atleta = Atleta::findOrFail($id);
        $atleta->delete();
    }
}