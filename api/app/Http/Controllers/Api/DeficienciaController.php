<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\CrudController;
use App\Http\Requests\Deficiencia\StoreDeficienciaRequest;
use App\Http\Requests\Deficiencia\UpdateDeficienciaRequest;
use App\Http\Requests\Modalidade\StoreModalidadeRequest;
use App\Http\Services\DeficienciaService;
use App\Models\Deficiencia;
use Illuminate\Http\Request;

class DeficienciaController extends CrudController
{
    public function __construct ( DeficienciaService $service ) {
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
    public function store( StoreDeficienciaRequest $request )
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
    public function update( UpdateDeficienciaRequest $request, $id )
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
