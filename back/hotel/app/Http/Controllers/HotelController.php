<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Hotel;
use  DB;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $hotel = Hotel::all();

       $datos=array();

        foreach ( $hotel  as    $hoteles) {

         if(!is_null($hoteles->nombre))
           $datos[]=array("idhotel"=> $hoteles->idhotel,'nombre'=>$hoteles->nombre,'cantidadhabitaciones'=>$hoteles->cantidadhabitaciones,'ciudad'=>$hoteles->ciudad,'direccion'=>$hoteles->direccion,'nit'=>$hoteles->nit);
         }


       return  $datos;
    }


    public function store(Request $request)
    {
        $Nit= $request->input('Nit');
        $Nombrehotel=$request->input('Nombrehotel');
        $Cantidadhabitaciones=$request->input('Cantidadhabitaciones');

        $Ciudads= $request->input('CiudadS');
        $ciudadt=$request->input('CiudadT');
        $direccion=$request->input('Direccion');
        if (!empty($ciudadt)) {
        $ciudad=trim(strtolower ($ciudadt));
        }else{
         $ciudad=$Ciudads;
        }

        $password=$request->input('Direccion');


        $hoteles =DB::table('hotel')->where([
            ['nombre', '=', $Nombrehotel],
            ['ciudad', '=',$ciudad],

        ])->get();

        $hotelesciudad=DB::table('hotel')->select('nombre','idhotel')->where('ciudad', '=',$ciudad)->get();

        switch (true){
            case (count($hoteles)!=0):
                $respuesta= "Este  hotel ya esta registrado";
                break;
            case(count($hoteles)==0):
                if(!is_null($hotelesciudad[0]->nombre)){
                    $respuesta= $this->crear($Nit,$Nombrehotel,$Cantidadhabitaciones,$ciudad,$direccion);
                }else{
                    $id=$hotelesciudad[0]->idhotel;
                    $respuesta=$this->Edit($id,$Nit,$Nombrehotel,$Cantidadhabitaciones,$ciudad,$direccion);
                }

             break;

        }

        return $datos['respuesta']=array("respuesta"=>$respuesta);



    }


    public  function crear($nit,$Nombrehotel,$Cantidadhabitaciones,$ciudad,$direccion){
     $hotel =new Hotel();
     $hotel->nombre=$Nombrehotel;
     $hotel->cantidadHabitaciones=$Cantidadhabitaciones;
     $hotel->ciudad=$ciudad;
     $hotel->direccion=$direccion;
     $hotel->nit=$nit;

     $respuesta="";
     if($hotel->save()){
         $respuesta="Se registro un hotel con exito";
     }

     return  $respuesta;
    }

    public  function Edit($id,$nit,$Nombrehotel,$Cantidadhabitaciones,$ciudad,$direccion){

        $hotel= Hotel::find($id);
        $hotel->nombre=$Nombrehotel;
        $hotel->cantidadHabitaciones=$Cantidadhabitaciones;
        $hotel->ciudad=$ciudad;
        $hotel->direccion=$direccion;
        $hotel->nit=$nit;

        $respuesta="";
        if($hotel->save()){
            $respuesta="Se registro un hotel con exito";
        }

        return  $respuesta;
    }


   public  function registrarciudad (Request $request){
    $ciudadt=trim(strtolower ($request->input('CiudadT')));
    $ciudadbuscar=Hotel::where('ciudad',$ciudadt)->first();

    if(count($ciudadbuscar)== 0){

    $ciudad =new Hotel();
    $ciudad->ciudad=$ciudadt;

    if($ciudad->save()){
       $respuesta="Se registro una ciudad con exito";

   }

    }  else{
        $respuesta="esta ciudad yaestaregistrada";

    }
    return $datos['respuesta']=array("respuesta"=>$respuesta);


}

    public function showciuades()
    {
        $ciudadeshotel = DB::table('hotel')->select('ciudad')->groupBy('ciudad')->get();
        return $ciudadeshotel;


    }




}
