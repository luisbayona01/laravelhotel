<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    public $timestamps = false;
    protected $table = 'hotel';  // tabla
    protected $primaryKey = 'idhotel';
    protected $fillable = ['nombre','cantidadHabitaciones','ciudad','direccion','nit']; // campos de  la tabla



}
