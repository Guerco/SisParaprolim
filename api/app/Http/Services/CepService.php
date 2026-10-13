<?php

namespace App\Http\Services;

use App\Contracts\Service;
use App\Http\Requests\Cep\StoreCepRequest;
use App\Http\Requests\Cep\UpdateCepRequest;
use App\Http\Resources\Cep\CepResource;
use App\Models\Cep;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CepService
{
    public function getAll(Request $request)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);
        
        $busca = trim((string) $request->input('busca', ''));   

        $modalidades = Cep::Query()
            ->when(
                $busca !== '',
                fn ($q) => $q->where(function ($q) use ($busca) {
                    $termo = '%' . addcslashes($busca, '%_\\') . '%';
                    $q->where('cep', 'like', $termo)
                    ->orWhere('logradouro', 'like', $termo)
                    ->orWhere('bairro', 'like', $termo)
                    ->orWhere('cidade', 'like', $termo);
                })
            )
            ->paginate($perPage)
            ->withQueryString();

        return CepResource::collection($modalidades);
    }

    public function findById($id)
    {
        $cep = Cep::findOrFail($id);
        return new CepResource($cep);
    }

    public function findByCep(string $cep)
    {
        $cep = preg_replace('/\D/', '', $cep);

        if (strlen($cep) !== 8) {
            throw new NotFoundHttpException('CEP inválido.');
        }

        $registro = Cep::where('cep', $cep)->firstOrFail();
        return new CepResource($registro);
    }

    public function create(StoreCepRequest $request)
    {
        Cep::create($request->validated());
    }

    public function edit(UpdateCepRequest $request, $id)
    {
        $cep = Cep::findOrFail($id);
        $cep->update($request->validated());
    }

    public function remove($id)
    {
        $cep = Cep::findOrFail($id);
        $cep->delete();
    }
}