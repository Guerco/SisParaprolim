<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\CrudController;
use App\Models\Modalidade;
use Illuminate\Http\Request;
use App\http\Services\ModalidadeService;
use App\Http\Requests\Modalidade\StoreModalidadeRequest;
class ModalidadeController extends CrudController
{
    public function __construct ( ModalidadeService $service ) {
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
    public function store( StoreModalidadeRequest $request )
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
    public function update( StoreModalidadeRequest $request, $id )
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
     * Display a listing of the resource's related atletas.
     */
    public function atletas(Request $request, $modalidade)
    {
        return $this->service->getAtletasByModalidade($request, $modalidade);
    }
}
