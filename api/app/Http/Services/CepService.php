<?php

namespace App\Http\Services;

use App\Http\Requests\Cep\StoreCepRequest;
use App\Http\Requests\Cep\UpdateCepRequest;
use App\Http\Resources\Cep\CepListagemConfig;
use App\Http\Resources\Cep\CepResource;
use App\Models\Cep;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CepService
{
    // =========================================================================
    // Listagem, Busca, Filtros e Ordenação
    // =========================================================================

    public function getAll(Request $request)
    {
        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

        $query = $this->aplicarFiltrosGetAll(Cep::query(), $request);
        $query = $this->aplicarOrdenacaoGetAll($query, $request);

        $ceps = $query
            ->paginate($perPage)
            ->withQueryString();

        return CepResource::collection($ceps);
    }

    private function aplicarFiltrosGetAll($query, Request $request)
    {
        $busca = trim((string) $request->input('busca', ''));

        $filtros = CepListagemConfig::filtraveis();

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
        $camposBusca = CepListagemConfig::buscaveis();

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

        if ($campo && in_array($campo, CepListagemConfig::ordenaveis())) {
            return $query->orderBy($campo, $direcao);
        }

        $padrao = CepListagemConfig::ordenacaoPadrao();

        return $query->orderBy($padrao['campo'], $padrao['direcao']);
    }

    // =========================================================================
    // Detalhes (Show e Busca Específica)
    // =========================================================================

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

    // =========================================================================
    // Cadastro (Store)
    // =========================================================================

    public function create(StoreCepRequest $request)
    {
        Cep::create($request->validated());
    }

    // =========================================================================
    // Edição (Update)
    // =========================================================================

    public function edit(UpdateCepRequest $request, $id)
    {
        $cep = Cep::findOrFail($id);
        $cep->update($request->validated());
    }

    // =========================================================================
    // Exclusão (Destroy)
    // =========================================================================

    public function remove($id)
    {
        $cep = Cep::findOrFail($id);
        $cep->delete();
    }
}