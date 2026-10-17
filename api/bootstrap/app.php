<?php

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \App\Http\Middleware\ForceJsonResponse::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(function ($request, $e) {
            return $request->is('api/*') || $request->expectsJson();
        });

        $exceptions->render(function (NotFoundHttpException $e, $request) {
            if (!$request->is('api/*')) {
                return null;
            }

            if ($e->getPrevious() instanceof ModelNotFoundException) {
                return response()->json(
                    ['message' => 'Registro não encontrado.'],
                    404,
                    [],
                    JSON_PRETTY_PRINT
                );
            }

            return response()->json(
                ['message' => 'Recurso não encontrado.'],
                404,
                [],
                JSON_PRETTY_PRINT
            );
        });

        $exceptions->render(function (ValidationException $e, $request) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json(
                [
                    'message' => 'Dados inválidos.',
                    'errors' => $e->errors(),
                ],
                422,
                [],
                JSON_PRETTY_PRINT
            );
        });

        $exceptions->render(function (QueryException $e, $request) {
            if (!$request->is('api/*')) {
                return null;
            }

            if ($e->getPrevious() instanceof \PDOException) {
                $pdoCode = $e->getPrevious()->getCode();
                
                // Erros de conexão genéricos
                if (in_array($pdoCode, ['08006', '08001']) || str_contains($e->getMessage(), '2002')) {
                    return response()->json(['message' => 'Não foi possível conectar ao banco de dados.'], 503);
                }
            }

            if ($e->getCode() === '23000') {
                return response()->json(
                    ['message' => 'Não foi possível concluir a operação porque o registro está vinculado a outros registros.'],
                    409,
                    [],
                    JSON_PRETTY_PRINT
                );
            }

            return null;
        });
    })->create();
