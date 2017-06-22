angular.module('flickrApp')
.controller('buscarCtrl', function($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc, $state, $rootScope) {

  $scope.titulo_busqueda = "Búsqueda";
  $scope.viendo_directorios = "Viendo directorio";
  $scope.titulo_fotos = "Fotos";
  var userId;

  $scope.submit = function() {
    console.log("ENTRA AL SUBMIT");
    showIonicLoading()
    .then(getUserId)
    .then($ionicLoading.hide);
  };

  function showIonicLoading() {
    return $ionicLoading.show({
      template: '<ion-spinner icon="lines"/>'
    });
  }

  function getUserId() {
    if(conexion.online) {
      flickrApiSvc.getUserId($scope.inputVal)
      .then(function(id) {
        $rootScope.userId = id;
        getDirectorios(id);
      })
    }
  }

  function getDirectorios(userId) {

    if(conexion.online()){
      //esta conectado, pega a la api y con el id y trae
      flickrApiSvc.getDirectorios(userId)
      .then(function(photosets) {
        $rootScope.photosets = photosets;
        $state.go('app.directorios');
        // flickrDbSvc.actualizarDirectorios($scope.photosets, userId);
      })
      //se rompe acá cuando quiero actulizar la bd obvio..

    }else{
      //trae de la bd. Hay que validar que sea el mismo userId que el que tengo guardado en la bd.
      conexion.showNotOnline();
      $scope.directorios = flickrDbSvc.getDirectorios();
    };
  }

});
