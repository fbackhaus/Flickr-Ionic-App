angular.module('flickrApp')
.controller('buscarCtrl', function($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc) {

  $scope.titulo_busqueda = "Búsqueda";
  $scope.viendo_directorios = "Viendo directorio";
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
        getDirectorios(id);
      })
    }
  }

  function getDirectorios(userId) {

    if(conexion.online()){
      console.log(userId);
      //esta conectado, pega a la api y con el id y trae
      flickrApiSvc.getDirectorios(userId)
      .then(function(photosets) {
        getPhotos(photosets[0].id, userId)
      })
      //se rompe acá cuando quiero actulizar la bd obvio..
      // flickrDbSvc.actualizarDirectorios($scope.directorios);

    }else{
      //trae de la bd. Hay que validar que sea el mismo userId que el que tengo guardado en la bd.
      $scope.directorios = flickrDbSvc.getDirectorios();
    };
  }

  function getPhotos(photosetId, userId) {
      console.log(photosetId);
      console.log(userId);
      flickrApiSvc.getPhotos(photosetId, userId)
      .then(function(photos) {
        console.log(photos);
        getPhotoUrl(photos[0]);
      })
  }

  function getPhotoUrl(photo) {
    console.log(photo);
    var url = flickrApiSvc.getPhotoUrl(photo);
    console.log(url);
  }

});
