<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Http\Requests\Cep\StoreCepRequest;
use App\Http\Requests\Cep\UpdateCepRequest;
use App\Http\Services\CepService;
use Illuminate\Http\Request;

class CepController extends CrudController
{
    public function __construct ( CepService $service ) {
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
    public function store( StoreCepRequest $request )
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
    public function update( UpdateCepRequest $request, $id )
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
