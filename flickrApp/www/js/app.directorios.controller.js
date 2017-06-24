angular.module('flickrApp')
.controller('directoriosCtrl', function ($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc, $state, $rootScope) {
  $ionicLoading.hide();
  if ($rootScope.photosets == undefined) {
    if (flickrDbSvc.recuperarUserId() != null) {
      $rootScope.photosets = flickrDbSvc.recuperarDirectorios();
      $rootScope.userId = flickrDbSvc.recuperarUserId();
      $rootScope.userName = flickrDbSvc.recuperarUserName();

    } else {
      $state.go('app.bienvenido');
      swal({
        title: "No tienes ningun photoset guardado!",
        imageUrl: "img/no-photo.png",
        timer: 2000,
        showConfirmButton: false
      });
    }

  }
  $scope.getPhotos = function (photosetId, photosetName) {
    $rootScope.showIonicLoading();
    $rootScope.photoSetName=photosetName;
    if (window.Connection) {
      if (navigator.connection.type != Connection.NONE) {

        flickrApiSvc.getPhotos(photosetId, $rootScope.userId)
        .then(function (photos) {
          var jsonText = "[";
          photos.forEach(function (photo) {
            var title = photo.title.replace(/["']/g, "");
            var text = '{ "src" :"' + getPhotoUrl(photo) + '",' + '"sub" : "' + title + '",' + '"id" : "' + photo.id + '"},';
            jsonText += text;
          });
          jsonText = jsonText.substring(0, jsonText.length - 1);
          jsonText += "]";
          var galleryPhotos = JSON.parse(jsonText);
          $rootScope.galleryPhotos = galleryPhotos;
          flickrDbSvc.guardarFotos(photosetId, galleryPhotos);
          $rootScope.photosetId = photosetId;
          $state.go('app.fotos');
                // getComments(photos[0].id);
              })
      }
      else {
        if (flickrDbSvc.recuperarUserId() === null) {
          $state.go('app.bienvenido');
        } else {
              // $rootScope.userId = flickrDbSvc.recuperarUserId();
              // $rootScope.userName = flickrDbSvc.recuperarUserName();
              // $rootScope.photosets = flickrDbSvc.recuperarDirectorios($rootScope.userId);
              if (!flickrDbSvc.recuperarFotos(photosetId)) {
                swal({
                  title: "No tenes almacenado el photoset!",
                  text: "Conectate a Internet!",
                  imageUrl: "img/no-photo.png",
                  timer: 2000,
                  showConfirmButton: false
                });
                $ionicLoading.hide();
                $state.go('app.bienvenido');
              } else {
                $rootScope.galleryPhotos = flickrDbSvc.recuperarFotos(photosetId);
                $state.go('app.fotosSinConexion');
              }
            }
          }

        }
      }
      ;

//ordena by name por ahora
$scope.ordenar = function (orderValue) {
  if (orderValue == 'Nombre') {
    $rootScope.photosets.sort(function (a, b) {
            //si quiere cambiar por fecha, se agrega un parametro $opcionDeOrdenamiento y se reemplaza a title por esa variable
            var x = a.title._content < b.title._content ? -1 : 1;
            return x;
          });
  } else {
    $rootScope.photosets.sort(function (a, b) {
            //si quiere cambiar por fecha, se agrega un parametro $opcionDeOrdenamiento y se reemplaza a title por esa variable
            var x = a.date_create < b.date_create ? -1 : 1;
            return x;
          });
  }
};

function getPhotoUrl(photo) {
  var url = flickrApiSvc.getPhotoUrl(photo);
  return url;
};

}
)
;
