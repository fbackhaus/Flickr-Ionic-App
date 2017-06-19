angular.module('flickrApp')
.controller('buscarCtrl', function($scope, flickrApiSvc, $ionicLoading, flickrConnectionSvc, flickrDbSvc, directoriosSvc) {

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

    // console.log($scope.userId);
  };

  function showIonicLoading() {
    return $ionicLoading.show({
      template: '<ion-spinner icon="lines"/>'
    });
  }

  function getDirectorios() {

    var id = flickrApiSvc.getUserId($scope.inputVal);
    if(flickrConnectionSvc.estadoConexion()){
      //esta conectado, pega a la api y con el id y trae
      $scope.directorios = (id);
      flickrDbSvc.actualizarDirectorios($scope.directorios);

    }else{

      //trae de la bd. Hay que validar que sea el mismo userId que el que tengo guardado en la bd.
      $scope.directorios = flickrDbSvc.getDirectorios();
    };
  }

});
