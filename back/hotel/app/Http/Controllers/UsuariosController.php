<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Usuarios;
use DB;
class UsuariosController extends Controller
{
  public   function  login(Request $request){

      $email=$request->input('mail');
      $password= $request->input('password') ;

     $usuarios =DB::table('login')->where([
          ['email', '=', $email],
         ['paswoord', '=', $password],
      ])->get();



     $datos=array();
    if(count($usuarios)!=0){
     $data['respuesta']=array('status'=>1,'tipouser'=>$usuarios[0]->idtipousuario,'email'=>$email,'iduser'=>$usuarios[0]->idusuarios);
     array_push($datos,$data);
    }else{
     $data['respuesta']=array("status"=>0,"respuesta"=>"Usuario  o password incorrecto" );
   array_push($datos,$data);

    }

    return  $datos;
  }


  public  function  registroUsuario(Request $request){

      $nombre= $request->input('nombre');
      $apellidos=$request->input('Apellidos');
      $email=$request->input('Email');
      $identificacion=$request->input('identificacion');
      $password=$request->input('password');

      $usuarios =DB::table('usuarios')->where([
          ['email', '=', $email],
          ['identificacion', '=', $identificacion],
      ])->get();

      if(count($usuarios)!=0){

          $respuesta= "Este  usuario ya esta registrado";

      }else{
          $Usuarios=new Usuarios();
          $Usuarios->nombres=$nombre;
          $Usuarios->apellidos=$apellidos;
          $Usuarios->email=$email;
          $Usuarios->identificacion=$identificacion;
          $Usuarios->paswoord=$password;
          $Usuarios->tipousuario=2;


          if($Usuarios->save()){
              $respuesta='operacion exitosa';

          }

      }

   return $datos['respuesta']=array("respuesta"=>$respuesta);


  }


    public function getToken(){

        return csrf_token();

    }


}
