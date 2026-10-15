<?php

namespace App\Http\Services;

use App\Contracts\Service;
use App\Http\Requests\Modalidade\StoreModalidadeRequest;
use App\Http\Resources\Atleta\AtletaListagemResource;
// use App\Http\Resources\Atleta\AtletaResource;
use App\Http\Resources\Atleta\AtletaResource;
use App\Http\Resources\Modalidade\ModalidadeResource;
use App\Models\Modalidade;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class ModalidadeService
{
    public function getAll(Request $request)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);
        
        $busca = trim((string) $request->input('busca', ''));   

        $modalidades = Modalidade::Query()
            ->when(
                $busca !== '',
                fn ($q) => $q->where(
                    'nome',
                    'like',
                    '%' . addcslashes($busca, '%_\\') . '%'
                )
            )
            ->paginate($perPage)
            ->withQueryString();

        return ModalidadeResource::collection($modalidades);
    }

    public function findById($id)
    {
        $modalidade = Modalidade::findOrFail($id);
        return new ModalidadeResource($modalidade);
    }

    public function create(StoreModalidadeRequest $request)
    {
        Modalidade::create($request->validated());
    }

    public function edit(StoreModalidadeRequest $request, $id)
    {
        $modalidade = Modalidade::findOrFail($id);
        $modalidade->update($request->validated());
    }

    public function remove($id)
    {
        $modalidade = Modalidade::findOrFail($id);
        $modalidade->delete();
    }

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