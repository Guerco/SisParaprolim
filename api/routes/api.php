<?php

use App\Http\Controllers\Api\ModalidadeController;
use App\Http\Controllers\Api\TipoDeficienciaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('modalidades', ModalidadeController::class)->except([
    'create', 
    // 'show', 
    'edit',
]);

Route::apiResource('tipos-deficiencias', TipoDeficienciaController::class)->except([
    'create', 
    // 'show', 
    'edit',
]);
