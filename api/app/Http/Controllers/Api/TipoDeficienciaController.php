<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Http\Requests\TipoDeficiencia\StoreTipoDeficienciaRequest;
use App\Http\Requests\TipoDeficiencia\UpdateTipoDeficienciaRequest;
use App\Http\Services\TipoDeficienciaService;
use App\Models\TipoDeficiencia;
use Illuminate\Http\Request;

class TipoDeficienciaController extends CrudController
{
    public function __construct ( TipoDeficienciaService $service ) {
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
    public function store( StoreTipoDeficienciaRequest $request )
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

    /**
     * Update the specified resource in storage.
     */
    public function update( UpdateTipoDeficienciaRequest $request, $id )
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

    /**
     * Display a listing of the resource's related deficiencias.
     */
    public function deficiencias(Request $request, $id)
    {
        return $this->service->getDeficienciasById($request, $id);
    }
}
