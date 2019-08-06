<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tipohabitacion;
class TipohabitacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   $tipohabitacion= Tipohabitacion::all();
        return $tipohabitacion;


    }


    public function store(Request $request)
    {
     $Tipodehabitacion=$request->input('Tipodehabitacion');
     $tipohabitacion=new Tipohabitacion();
     $tipohabitacion->tipo= $Tipodehabitacion;

     if($tipohabitacion->save()){
       $respuesta=" Tipohabitacion registrado";

     }

        return $datos['respuesta']=array("respuesta"=>$respuesta);
    }


}
