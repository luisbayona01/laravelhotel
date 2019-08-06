<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tipohabitacion extends Model
{
    public $timestamps = false;
    protected $table = 'tipohabitacion';  // tabla
    protected $primaryKey = 'idhabitaciontipo';
    protected $fillable = ['tipo']; // campos de  la tabla
}
