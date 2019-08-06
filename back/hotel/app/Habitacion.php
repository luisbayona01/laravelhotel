<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model
{
    public $timestamps = false;
    protected $table = 'habitacion';  // tabla
    protected $primaryKey = 'idhabitacion';
    protected $fillable = ['numero','Hotel','Tipo','id_usuario','idacomodacion']; // campos de  la tabla


}
