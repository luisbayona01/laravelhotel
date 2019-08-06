<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    public $timestamps = false;
    protected $table = 'usuarios';  // tabla
    protected $primaryKey = 'idusuarios';
    protected $fillable = ['nombres','apellidos','email','identificacion','paswoord','tipousuario']; // campos de  la tabla

}
