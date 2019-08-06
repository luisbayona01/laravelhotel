<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'cors'], function(){
route::post('/loginusuarios',
    'UsuariosController@login')->name('loginusuarios');

route::post('/registrousuario',
    'UsuariosController@registroUsuario')->name('registrousuario');
Route::get('/getToken','UsuariosController@getToken')->name('getToken');

Route:: get('/gethoteles','HotelController@index')->name('gethoteles');
Route:: get('/getciudades','HotelController@showciuades')->name('getciudades');
Route:: get('/gettipohabitaciones','TipohabitacionController@index')->name('gettipohabitaciones');
Route:: get('gethabitaciones','HabitacionController@index')->name('gethabitaciones');
Route::post('/registrarhotel','HotelController@store')->name('registrarhotel');
Route::post( '/registrarciudad','HotelController@registrarciudad')->name('registrarciudad');
Route::post('/registratipohabitacion','TipohabitacionController@store')->name('registratipohabitacion');
Route::post('/registrohabitacion','HabitacionController@store')->name('registratipohabitacion');
Route::post('/acomodacion','HabitacionController@acomodacion')->name('acomodacion');
route::post('/numerohabitaciones','HabitacionController@numerohabitaciones')->name('numerohabitaciones');

}); 
