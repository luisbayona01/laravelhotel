function logaout(){

sessionStorage.clear();
location.reload();
}

var app = angular.module("myApp", ['ngRoute']);
var urlglobal="https://laravelhoteles.000webhostapp.com/hotel/public/api/"
var  respuesta="";
app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'inicio.html'
        })
      .when('/acomodacion', {
        controller: 'ControlleracomodacIon',
        templateUrl: 'habitaciontipoacomodacion.html'
      })
      .when('/ciudades', {
        controller: 'Controladorciudades',
        templateUrl: 'ciudades.html'
      })
      .when('/hoteles', {
        controller: 'Controladorhoteles',
        templateUrl: 'hoteles.html'
      })
      .when('/habitaciones', {
        controller: 'Controladorhabitaciones',
        templateUrl: 'habitaciones.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })





app.controller("myCtrl", function($scope,$http,$location) {
 if(sessionStorage.getItem('tipouser')){

  var tipouser=sessionStorage.getItem('tipouser');
  var mail=sessionStorage.getItem('email'); 
  
   switch (tipouser) {
  case '1':
 $("#correoA").html(mail)  
    $("#Administradores").fadeIn();
    $("#usuario-cliente").fadeOut();
    
      $location.path('/hoteles');
    
    break; 
  case '2':
 $("#correo").html(mail)
$("#usuario-cliente").fadeIn();
$("#Administradores").fadeOut();
     $location.path('/acomodacion');
 
break;
}


}else{

$location.path('/');
 //console.log('default')
$("#Administradores").fadeOut();
$("#usuario-cliente").fadeOut();
} 
 

$("#identificacion").on('input', function (e) {
   
    if (!/^[ 0-9]*$/i.test(this.value)) {
        alert(" solo se permiten numeros ")
        this.value = this.value.replace(/[^ 0-9]+/ig,"");
    } 
});



  
$scope.getToken=function(){
$http.get("https://laravelhoteles.000webhostapp.com/hotel/public/api/getToken")
  .then(function(response) {
    //console.log(response); 
  });

}

   $scope.getToken();

 //$("#Administradores").hide();
 //$("#usuario-cliente").hide();

$scope.Registrar=function(){

if($("#Nombres").val()==''){
  alert('el campo nombre es requerido')
return false;
}
if($("#Apellidos").val()==''){
  alert('el campo  apellidos  es requerido')
  return false;
}
if($("#identificacion").val()==''){
  alert('el campo identificacion es requerido')
return false;
}
if($("#password").val()==''){
  alert('este campo password es requerido')
return false;
}







var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;   
    if (!regex.test($("#Email").val().trim())) {
        alert(" correo no valido");
      
  return  false;
         } 


var url=urlglobal+"registrousuario"
var parametros=$("#registroU").serialize();
$http({
  method  : 'POST',
  url     : url,
  data    : parametros, //this.formData,  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  
   // set the headers so angular passing info as form data (not request payload)
 }).success(function(response){
    respuesta=response.respuesta;    
  swal(respuesta);

$('#registroU')[0].reset();           
})

}


$scope.Logear=function(){

var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;   
    if (!regex.test($("#EmailU").val().trim())) {
        alert(" correo no valido");
      
  return  false;
         } 
 
if($("#pass").val()==""){
alert('el campo  password es requerido');
  return  false;
}


var url=urlglobal+"loginusuarios"
var parametros=$("#loginU").serialize();
$http({
  method  : 'POST',
  url     : url,
  data    : parametros, //this.formData,  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  
   // set the headers so angular passing info as form data (not request payload)
 }).success(function(response){
 
 //console.log(response);
 var  status= response[0]['respuesta']['status'];
 
 if(status==0){
 respuesta=response[0]['respuesta']['respuesta']
swal(respuesta);
$('#loginU')[0].reset();
 }else{

 var tipouser= response[0]['respuesta']['tipouser'];     
 switch (tipouser) {
  case '1':
    //console.log('admin');
    $("#Administradores").fadeIn();
    sessionStorage.setItem('tipouser',tipouser)
    sessionStorage.setItem('email',response[0]['respuesta']['email'])
    sessionStorage.setItem('iduser',response[0]['respuesta']['iduser'])
     $location.path('/hoteles');
    break; 
  case '2':  

    $("#usuario-cliente").fadeIn();
     sessionStorage.setItem('tipouser',tipouser)
    sessionStorage.setItem('email',response[0]['respuesta']['email'])
    sessionStorage.setItem('iduser',response[0]['respuesta']['iduser'])
     $location.path('/acomodacion');
}
 }          
})
  
}


})


app.controller("ControlleracomodacIon",function($scope,$http,$location){


if(sessionStorage.getItem('tipouser')){

  var tipouser=sessionStorage.getItem('tipouser');
  var mail=sessionStorage.getItem('email'); 
  
   switch (tipouser) {
  case '1':
 $("#correoA").html(mail)  
    $("#Administradores").fadeIn();
    $("#usuario-cliente").fadeOut();
    
      //$location.path('/hoteles');
    
    break; 
  case '2':
 $("#correo").html(mail)
$("#usuario-cliente").fadeIn();
$("#Administradores").fadeOut();
     //$location.path('/acomodacion');
 
break;
}


}else{

$location.path('/');
 //console.log('default')
$("#Administradores").fadeOut();
$("#usuario-cliente").fadeOut();
} 


 
$("#acomodacion").addClass("active");
$("#ciudades").removeClass("active");
$("#acomodacionA").addClass("active");
$("#ciudadesA").removeClass("active");


$scope.gettipohabitacion=function(){
var url= urlglobal+"gettipohabitaciones";
 $http.get(url)
  .then(function(response) {
  $scope.habitaciontipo=response.data;
  });

}

 $scope.Registrartipohabitacion=function(){
  
var  url = urlglobal+"registratipohabitacion";
 var  parametros=$("#Registrartipohabitacion").serialize();
$http({
  method  : 'POST',
  url     : url,
  data    : parametros, //this.formData,  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  
   // set the headers so angular passing info as form data (not request payload)
 }).success(function(response){
  
    respuesta=response.respuesta;    
  swal(respuesta);

$scope.gettipohabitacion()
})  


 }

$scope.gettipohabitacion();


})

  //Controladorciudades
  app.controller("Controladorciudades",function($scope,$http,$location){


if(sessionStorage.getItem('tipouser')){

  var tipouser=sessionStorage.getItem('tipouser');
  var mail=sessionStorage.getItem('email'); 
  
   switch (tipouser) {
  case '1':
 $("#correoA").html(mail)  
    $("#Administradores").fadeIn();
    $("#usuario-cliente").fadeOut();
    
      //$location.path('/hoteles');
    
    break; 
  case '2':
 $("#correo").html(mail)
$("#usuario-cliente").fadeIn();
$("#Administradores").fadeOut();
     //$location.path('/acomodacion');
 
break;
}


}else{

$location.path('/');
 //console.log('default')
$("#Administradores").fadeOut();
$("#usuario-cliente").fadeOut();
} 


$("#acomodacion").removeClass("active")
$("#ciudades").addClass("active");

$("#acomodacionA").removeClass("active")
$("#ciudadesA").addClass("active");

$scope.getciudadeshotel=function(){
   var  url=urlglobal+"getciudades"  
   $http.get(url)
  .then(function(response) {
  //MyService.data=response.data; 
  $scope.Cciudad=response.data;
  });
 }

 $scope.Registrarciudad=function(){
  
var  url = urlglobal+"registrarciudad";
 var  parametros=$("#Registrarciudad").serialize();
$http({
  method  : 'POST',
  url     : url,
  data    : parametros, //this.formData,  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  
   // set the headers so angular passing info as form data (not request payload)
 }).success(function(response){
  
  respuesta=response.respuesta;    
  swal(respuesta);


$scope.getciudadeshotel()
})  


 }

$scope.getciudadeshotel();

})




app.controller("Controladorhoteles",function($scope,$http,$location){
   
  

if(sessionStorage.getItem('tipouser')){

  var tipouser=sessionStorage.getItem('tipouser');
  var mail=sessionStorage.getItem('email'); 
  
   switch (tipouser) {
  case '1':
 $("#correoA").html(mail)  
    $("#Administradores").fadeIn();
    $("#usuario-cliente").fadeOut();
    
      //$location.path('/hoteles');
    
    break; 
  case '2':
 $("#correo").html(mail)
$("#usuario-cliente").fadeIn();
$("#Administradores").fadeOut();
     //$location.path('/acomodacion');
 
break;
}


}else{

$location.path('/');
 //console.log('default')
$("#Administradores").fadeOut();
$("#usuario-cliente").fadeOut();
} 

  
    $("#hoteles").addClass("active");
    $("#hoteles").click(function(){
    $("#acomodacionA").removeClass("active")
    $("#ciudadesA").removeClass("active");
    $("#acomodacionA").removeClass("active")
    $("#ciudadesA").removeClass("active");
    })

  $scope.getciudades=function(){
   var  url=urlglobal+"getciudades"  
   $http.get(url)
  .then(function(response) {
    if(response.data.length==0){
   $("#ciudades-select").fadeOut();
  }else{
    $("#ciudadestext").hide(); 
    $("#ciudades-select").fadeIn();
    
  }
$scope.ciudades=response.data;
  });
 }
$scope.gethoteles=function(){
 var  url=urlglobal+"gethoteles"  
   $http.get(url)
  .then(function(response) {
    
  $scope.hoteles=response.data;
  
  });

}

$scope.getciudades();
$scope.gethoteles();

$scope.RegistrarHotel=function(){
 var  url = urlglobal+"registrarhotel";
 var  parametros=$("#RegistrarHotel").serialize();
$http({
  method  : 'POST',
  url     : url,
  data    : parametros, //this.formData,  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  
   // set the headers so angular passing info as form data (not request payload)
 }).success(function(response){
  
   respuesta=response.respuesta;    
  swal(respuesta);


$scope.gethoteles();
})  

}
}) 


 //Controladorhabitaciones
 app.controller("Controladorhabitaciones",function($scope,$http,$location){

if(sessionStorage.getItem('tipouser')){

  var tipouser=sessionStorage.getItem('tipouser');
  var mail=sessionStorage.getItem('email'); 
  
   switch (tipouser) {
  case '1':
 $("#correoA").html(mail)  
    $("#Administradores").fadeIn();
    $("#usuario-cliente").fadeOut();
    
      //$location.path('/hoteles');
    
    break; 
  case '2':
 $("#correo").html(mail)
$("#usuario-cliente").fadeIn();
$("#Administradores").fadeOut();
     //$location.path('/acomodacion');
 
break;
}


}else{

$location.path('/');
 //console.log('default')
$("#Administradores").fadeOut();
$("#usuario-cliente").fadeOut();
} 

$scope.Hotelnumerohabitaciones=function(idhotel){
 
 var  parametros=$.param({'id':idhotel})
 var  url=urlglobal+"numerohabitaciones";
$http({
  method  : 'POST',
  url     : url,
  data    : parametros, //this.formData,  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  
   // set the headers so angular passing info as form data (not request payload)
 }).success(function(response){
 
$scope.numerohabitaciones=response; 

})  



}



  $scope.gethoteles=function(){
 var  url=urlglobal+"gethoteles"  
   $http.get(url)
  .then(function(response) {
    
  $scope.hoteles=response.data;
  
  });
}
$scope.gettipohabitacion=function(){
var url= urlglobal+"gettipohabitaciones";
 $http.get(url)
  .then(function(response) {
  $scope.habitaciontipo=response.data;
  });

}  

$scope.gethabitaciones=function(){
var url= urlglobal+"gethabitaciones";
 $http.get(url)
  .then(function(response) {
  $scope.habitaciones=response.data;
  });
}

$scope.Tipoacomodacion=function(tipoha){
 var  parametros=$.param({'tipoha':tipoha})
 var  url=urlglobal+"acomodacion";
$http({
  method  : 'POST',
  url     : url,
  data    : parametros, //this.formData,  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  
   // set the headers so angular passing info as form data (not request payload)
 }).success(function(response){
 
$scope.getacomodacion=response; 

})  
}

$scope.Registrarhabitacion=function(){
var url=urlglobal+"registrohabitacion";
var parametros=$("#Registrarhabitacion").serialize();

$http({
  method  : 'POST',
  url     : url,
  data    : parametros, //this.formData,  // pass in data as strings
  headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
  
   // set the headers so angular passing info as form data (not request payload)
 }).success(function(response){
 
  respuesta=response.respuesta;    
  swal(respuesta);

  $scope.gethabitaciones()
})  



}




$scope.gethabitaciones()
$scope.gethoteles();
$scope.gettipohabitacion();
 })
