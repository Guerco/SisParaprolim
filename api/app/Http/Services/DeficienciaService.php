<?php

namespace App\Http\Services;

use App\Http\Requests\Deficiencia\StoreDeficienciaRequest;
use App\Http\Requests\Deficiencia\UpdateDeficienciaRequest;
use App\Http\Resources\Deficiencia\DeficienciaListagemResource;
use App\Http\Resources\Deficiencia\DeficienciaResource;
use App\Models\Deficiencia;
use Illuminate\Http\Request;

class DeficienciaService
{
    public function getAll(Request $request)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $busca = trim((string) $request->input('busca', ''));

        $deficiencias = Deficiencia::with('tipoDeficiencia')
            ->when(
                $busca !== '',
                fn ($q) => $q->where(function ($q) use ($busca) {
                    $termo = '%' . addcslashes($busca, '%_\\') . '%';
                    $q->where('cid_10', 'like', $termo)
                    ->orWhere('descricao_deficiencia', 'like', $termo);
                })
            )
            ->paginate($perPage)
            ->withQueryString();

        return DeficienciaListagemResource::collection($deficiencias);
    }

    public function findById($id)
    {
        $deficiencia = Deficiencia::with('tipoDeficiencia')->findOrFail($id);
        return new DeficienciaResource($deficiencia);
    }

    public function create(StoreDeficienciaRequest $request)
    {
        Deficiencia::create($request->validated());
    }

    public function edit(UpdateDeficienciaRequest $request, $id)
    {
        $deficiencia = Deficiencia::findOrFail($id);
        $deficiencia->update($request->validated());
    }

    public function remove($id)
    {
        $deficiencia = Deficiencia::findOrFail($id);
        $deficiencia->delete();
    }
}