<?php

namespace App\Http\Services;

use App\Contracts\Service;
use App\Http\Requests\TipoDeficiencia\StoreTipoDeficienciaRequest;
use App\Http\Requests\TipoDeficiencia\UpdateTipoDeficienciaRequest;
use App\Http\Resources\Deficiencia\DeficienciaResumoResource;
use App\Models\TipoDeficiencia;
use Illuminate\Foundation\Http\FormRequest;
use App\Http\Resources\TipoDeficiencia\TipoDeficienciaResource;
use Illuminate\Http\Request;

class TipoDeficienciaService
{
    public function getAll(Request $request)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);
        
        $tipos_deficiencias = TipoDeficiencia::paginate($perPage)->withQueryString();
        return TipoDeficienciaResource::collection($tipos_deficiencias);
    }

    public function findById($id)
    {
        $tipo_deficiencia = TipoDeficiencia::with('deficiencias')->findOrFail($id);
        return new TipoDeficienciaResource($tipo_deficiencia);
    }

    public function create(StoreTipoDeficienciaRequest $request)
    {
        TipoDeficiencia::create($request->validated());
    }

    public function edit(UpdateTipoDeficienciaRequest $request, $id)
    {
        $tipo_deficiencia = TipoDeficiencia::findOrFail($id);
        $tipo_deficiencia->update($request->validated());
    }

    public function remove($id)
    {
        $tipo_deficiencia = TipoDeficiencia::findOrFail($id);
        $tipo_deficiencia->delete();
    }

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