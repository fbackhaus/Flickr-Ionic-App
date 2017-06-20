angular.module('flickrApp')
.controller('buscarCtrl', function($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc) {

  $scope.titulo_busqueda = "Búsqueda";
  $scope.viendo_directorios = "Viendo directorio";
  var userId;

  $scope.submit = function() {
    console.log("ENTRA AL SUBMIT");
    showIonicLoading()
    .then(getDirectorios)
    .then(function(_id) {
        $scope.userId = _id;
    })
    .then($ionicLoading.hide);

     console.log($scope.userId);
  };

  function showIonicLoading() {
    return $ionicLoading.show({
      template: '<ion-spinner icon="lines"/>'
    });
  }

  function getDirectorios() {

    var id = flickrApiSvc.getUserId($scope.inputVal);
    if(conexion.online()){
      //esta conectado, pega a la api y con el id y trae
      $scope.directorios = (id);
      //se rompe acá cuando quiero actulizar la bd obvio..
      // flickrDbSvc.actualizarDirectorios($scope.directorios);

    }else{
      //trae de la bd. Hay que validar que sea el mismo userId que el que tengo guardado en la bd.
      $scope.directorios = flickrDbSvc.getDirectorios();
    };
  }

});
