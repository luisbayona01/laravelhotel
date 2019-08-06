<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Habitacion;
use DB;

class HabitacionController extends Controller
{

    public function index()
    {
        $habitaciones = DB::table('habitacionhotel')->get();
        return  $habitaciones;
    }



      public   function numerohabitaciones(Request $request){

         $idh=$request->input('id');
       $cantidadh=DB::table('hotel')->select('cantidadhabitaciones')->where('idhotel','=',$idh)->get();

       $numero=array();
       for ($i=1; $i<= $cantidadh[0]->cantidadhabitaciones;$i++ ){
        $numero[]=array('numero'=>$i);

        }

     return $numero;
      }




  public function store(Request $request)
    {
       //
        $numerohabitacion=$request->input('numerohabitacion');
        $hotel=$request->input('hotel');
        $tipohabitacion=$request->input('Tipohabitacion');
       $habitacion= DB::table('habitacion') ->where([
        ['Hotel', '=', $hotel],
        ['Tipo', '=', $tipohabitacion],
    ])->get();


        $habitacionnumero= DB::table('habitacion') ->where([
            ['Hotel', '=', $hotel],
            ['numero', '=', $numerohabitacion],
        ])->get();
       if(count($habitacion)!=0 || count($habitacionnumero)!=0){
           $respuesta="ya estan registradas estos  datos paraeste hotel";
       }else {
     $habitaciones=new Habitacion();
     $habitaciones ->numero=$numerohabitacion;
     $habitaciones ->Hotel= $hotel;
     $habitaciones->Tipo=$tipohabitacion;
     $habitaciones->id_usuario='2';
     $habitaciones->idacomodacion= $request->input('TipoAcomodacion');
      if($habitaciones->save()){

       $respuesta="se registro con exito";

      }



       }
       return $datos['respuesta']=array("respuesta"=>$respuesta);
    }

    public function acomodacion(Request $request)
    {
       $acomodacion= $request->input('tipoha');
      $acomodaciones=DB::table('tipohabitacion_acomodaciones')->where('idhabitaciontipo', $acomodacion)->get();

      if(count($acomodaciones)!=0){
          return $acomodaciones ;

      }else{
          $acomodaciones=DB::table('acomodacion')->get();
          return $acomodaciones ;
      }


    }

    }
