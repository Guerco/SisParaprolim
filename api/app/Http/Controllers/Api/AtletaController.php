<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Http\Requests\Atleta\StoreAtletaRequest;
use App\Http\Requests\Atleta\UpdateAtletaRequest;
use App\Http\Services\AtletaService;
use App\Models\Atleta;
use Illuminate\Http\Request;

class AtletaController extends CrudController
{
    public function __construct ( AtletaService $service ) {
        parent::__construct( $service );
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return parent::_index($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( StoreAtletaRequest $request )
    {
        return parent::_store( $request );
    }

    /**
     * Display the specified resource.
     */
    public function show( $id )
    {
        return parent::_show( $id );
    }

    public function showCep(string $cep)
    {
        return $this->service->findByCep($cep);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( UpdateAtletaRequest $request, $id )
    {
        return parent::_update( $request, $id );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id )
    {
        return parent::_destroy( $id );
    }
}
