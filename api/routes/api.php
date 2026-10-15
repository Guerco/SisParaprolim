<?php

use App\Http\Controllers\Api\AtletaController;
use App\Http\Controllers\Api\CepController;
use App\Http\Controllers\Api\DeficienciaController;
use App\Http\Controllers\Api\ModalidadeController;
use App\Http\Controllers\Api\TipoDeficienciaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('modalidades/{modalidade}/atletas', [ModalidadeController::class, 'atletas']);
Route::apiResource('modalidades', ModalidadeController::class)->except([
    'create', 
    // 'show', 
    'edit',
]);

Route::get('tipos-deficiencias/{tipo}/deficiencias', [TipoDeficienciaController::class, 'deficiencias']);
Route::apiResource('tipos-deficiencias', TipoDeficienciaController::class)->except([
    'create', 
    // 'show', 
    'edit',
]);

Route::get('ceps/buscar/{cep}', [CepController::class, 'showCep']);
Route::apiResource('ceps', CepController::class)->except([
    'create', 
    // 'show', 
    'edit',
]);

Route::get('deficiencias/{deficiencia}/atletas', [DeficienciaController::class, 'atletas']);
Route::apiResource('deficiencias', DeficienciaController::class)->except([
    'create', 
    // 'show', 
    'edit',
]);

Route::apiResource('atletas', AtletaController::class)->except([
    'create', 
    // 'show', 
    'edit',
]);