<?php

namespace App\Http\Controllers;

use App\Contracts\Service;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

abstract class CrudController extends Controller
{
    public function __construct(
        protected $service
    ) {}

    public function _index(Request $request)
    {
        $dados = $this->service->getAll($request);

        return $this->gerarResponse('index', $dados);
    }

    public function _store( $request)
    {
        $this->service->create( $request );

        return $this->gerarResponse('store');
    }

    public function _show( $id )
    {
        $dados = $this->service->findById( $id );

        return $this->gerarResponse('show', $dados );
    }

    public function _update( $request, $id )
    {
        $this->service->edit( $request , $id );

        return $this->gerarResponse('update');
    }

    public function _destroy( $id )
    {
        $this->service->remove( $id );

        return $this->gerarResponse( 'destroy' );
    }

    private function gerarResponse(string $metodo, $dados = null): JsonResponse
    {
        [$status, $mensagem] = match ($metodo) {
            'index', 'show' => [200, null],
            'store'         => [201, 'Criado.'],
            'update'        => [200, 'Alterado.'],
            'destroy'       => [204, null],
        };

        $opcoes = JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE;

        if ($dados instanceof JsonResource) {
            return $dados->response()
                ->setStatusCode($status)
                ->setEncodingOptions($opcoes);
        }

        return response()->json(
            $mensagem ? ['message' => $mensagem] : $dados,
            $status,
            [],
            $opcoes
        );
    }
}  