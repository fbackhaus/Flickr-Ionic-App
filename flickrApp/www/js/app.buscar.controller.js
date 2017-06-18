angular.module('flickrApp')
.controller('buscarCtrl', function($scope) {

  $scope.titulo_busqueda = "Búsqueda";
  $scope.viendo_directorios = "Viendo directorio";

  $scope.submitBusqueda = function(directoriosSvc) {
    //NO ESTOY PUDIENDO HACER QUE EL SERVICE directoriosSvc me lo importe en la function del controller
    console.log('jojojojojojo');
  //
  //   return directoriosSvc.getUser();
  //   hacerBusqueda();
  //   // .then(function(info_user) {
  //   //   $scope.info_user = info_user;
  //   // });
  //   //obtiene la lista de respuestas seleccionadas por el usuario
  //   // return encuestasSvc.responder($scope.encuesta.id, calcularRespuestas())
  //   //   .then(function mostrarResultados() {
  //   //     $state.go('app.resultados', { id: $scope.encuesta.id });
  //   //   });
  };
  // function hacerBusqueda(){
  //   console.log('aca si');
  // };
});
