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
use Carbon\Carbon;

class AtletaService
{
    // =========================================================================
    // Listagem, Busca, Filtros e Ordenação
    // =========================================================================

    public function getAll(Request $request)
    {
        $semPaginacao = filter_var($request->query('paginacao', 'true'), FILTER_VALIDATE_BOOLEAN) === false;

        $query = $this->aplicarFiltrosGetAll(Atleta::query(), $request);
        $query = $this->aplicarOrdenacaoGetAll($query, $request);

        if ($semPaginacao) {
            return AtletaListagemResource::collection($query->get());
        }

        $perPage = (int) $request->input('por_pag', 15);
        $perPage = min(max($perPage, 1), 100);

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
            if ($config['tipo'] === 'data') {
                $this->aplicarFiltroData($query, $campo, $request);
                continue;
            }

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

    private function aplicarFiltroData($query, string $campo, Request $request): void
    {
        $maiorQue = $this->lerData($request->query("{$campo}_maior_que"));
        $menorQue = $this->lerData($request->query("{$campo}_menor_que"));
        $inclusive = filter_var(
            $request->query("{$campo}_inclusive", false),
            FILTER_VALIDATE_BOOLEAN
        );

        if ($maiorQue === null && $menorQue === null) {
            return;
        }

        if ($maiorQue !== null && $menorQue === null) {
            $query->whereDate($campo, $inclusive ? '>=' : '>', $maiorQue);
            return;
        }

        if ($menorQue !== null && $maiorQue === null) {
            $query->whereDate($campo, $inclusive ? '<=' : '<', $menorQue);
            return;
        }

        if ($inclusive) {
            $query->whereBetween($campo, [$maiorQue, $menorQue]);
        } else {
            $query->where($campo, '>', $maiorQue)
                ->where($campo, '<', $menorQue);
        }
    }

    private function lerData($valor): ?string
    {
        if ($valor === null || $valor === '') {
            return null;
        }

        if ($valor === 'data_atual') {
            return now()->toDateString();
        }

        $dt = \DateTimeImmutable::createFromFormat('Y-m-d', (string) $valor);
        if (!$dt || $dt->format('Y-m-d') !== $valor) {
            return null;
        }

        return $dt->format('Y-m-d');
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

            $this->calcularVencimentoAtestado($dados);

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
                    // 'validade_atestado' => $m['validade_atestado'] ?? null,
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

            $this->calcularVencimentoAtestado($dados, true);

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
                        // 'validade_atestado' => $m['validade_atestado'] ?? null,
                    ];
                }
                $atleta->modalidades()->sync($sync);
            }
        });
    }

    private function calcularVencimentoAtestado(array &$dados, bool $edicao = false): void
    {
        // Na edição, só recalcula se a data de emissão foi enviada.
        if ($edicao && !array_key_exists('data_emissao_atestado', $dados)) {
            return;
        }

        $dataEmissao = $dados['data_emissao_atestado'] ?? null;
        $dataVencimento = $dados['data_vencimento_atestado'] ?? null;

        if (!$dataEmissao) {
            // Se a emissão foi removida, limpa o vencimento
            // somente quando ele não foi informado separadamente.
            if (
                array_key_exists('data_emissao_atestado', $dados)
                && !array_key_exists('data_vencimento_atestado', $dados)
            ) {
                $dados['data_vencimento_atestado'] = null;
            }

            return;
        }

        // Calcula se o vencimento não foi informado ou está vazio.
        if (!$dataVencimento) {
            $dados['data_vencimento_atestado'] = Carbon::parse($dataEmissao)
                ->addYear()
                ->toDateString();
        }
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