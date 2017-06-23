angular.module('flickrApp')
  .controller('directoriosCtrl', function ($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc, $state, $rootScope) {
    $ionicLoading.hide();
    if ($rootScope.photosets == undefined) {
      $state.go('app.bienvenido');

    }
    $scope.getPhotos = function (photosetId) {
      $rootScope.showIonicLoading();
      console.log(photosetId);
      if (conexion.online()) {
      console.log("tengo conexion")

        flickrApiSvc.getPhotos(photosetId, $rootScope.userId)
          .then(function (photos) {
            console.log(photos);
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
            console.log($rootScope.galleryPhotos);
            flickrDbSvc.guardarFotos(photosetId, galleryPhotos);
            $rootScope.photosetId = photosetId;
            $state.go('app.fotos');
            // getComments(photos[0].id);
          })
      }
      else {
        if (flickrDbSvc.recuperarDirectorios($rootScope.userId) === null) {
          $state.go('app.bienvenido');
          console.log('No se almaceno el usuario');
        } else {
          console.log('Recupero del usuario');
          $rootScope.photosets = flickrDbSvc.recuperarDirectorios(userId);
          $state.go('app.fotosSinConexion');
        }
      }

    };

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

  })
;
