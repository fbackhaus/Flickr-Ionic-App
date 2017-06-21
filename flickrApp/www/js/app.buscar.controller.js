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
        $scope.userId = id;
        getDirectorios(id);
      })
    }
  }

  function getDirectorios(userId) {

    if(conexion.online()){
      //esta conectado, pega a la api y con el id y trae
      flickrApiSvc.getDirectorios(userId)
      .then(function(photosets) {
        $scope.photosets = photosets;
        console.log("================");
        console.log($scope.photosets);
        flickrDbSvc.actualizarDirectorios($scope.photosets, userId);
      })
      //se rompe acá cuando quiero actulizar la bd obvio..

    }else{
      //trae de la bd. Hay que validar que sea el mismo userId que el que tengo guardado en la bd.
      $scope.directorios = flickrDbSvc.getDirectorios();
    };
  }

  $scope.getPhotos = function(photosetId) {
    console.log("GET PHOTOS");
      flickrApiSvc.getPhotos(photosetId, $scope.userId)
      .then(function(photos) {
        var photosUrl = [];
        photos.forEach(function(photo) {
          photosUrl.push(getPhotoUrl(photo));
        });
        $rootScope.photos = photosUrl;
        console.log($rootScope.photos);
        $state.go('app.fotos');
        // getComments(photos[0].id);
      })
  }

  function getPhotoUrl(photo) {
    var url = flickrApiSvc.getPhotoUrl(photo);
    return url;
  }

  function getComments(photoId) {
    flickrApiSvc.getComments(photoId)
    .then(function(comments) {
      console.log(comments);
    })
  }

});
