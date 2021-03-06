angular.module('flickrApp')
.controller('buscarCtrl', function ($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc, $state, $rootScope) {

  $scope.titulo_busqueda = "Búsqueda";
  $scope.viendo_directorios = "Viendo directorio";
  $scope.titulo_fotos = "Fotos";
  var userId;

  $scope.submit = function () {
    $rootScope.showIonicLoading();
    getUserId();
  };


  function getUserId() {
    if (window.Connection) {
      if (navigator.connection.type != Connection.NONE) {
        flickrApiSvc.getUserId($scope.inputVal)
        .then(function (id) {
          if (id != null) {
            $rootScope.userId = id;
            $rootScope.userName = $scope.inputVal;

            getDirectorios(id);
          }
          else {
            swal("Oops...", "El usuario ingresado no existe!", "error");
            $ionicLoading.hide();
          }
        })
      }else{
        $ionicLoading.hide();
        $state.go('app.bienvenido');
        swal({
          title: "Revisa tu conexión a Internet!",
          imageUrl: "img/internet.png",
          timer: 2000,
          showConfirmButton: false
        });
      }
    }
  }

  function getDirectorios(userId) {

    if (conexion.online()) {
        //esta conectado, pega a la api y con el id y trae
        flickrApiSvc.getDirectorios(userId)
        .then(function (photosets) {
            //Tiro cada titulo a tolowercase
            photosets.forEach(function (photo) {
              photo.title._content = photo.title._content.toLowerCase();
            });

            $rootScope.photosets = photosets;
            if (photosets.length > 0) {
              flickrDbSvc.guardarDirectorios(userId, photosets);
              flickrDbSvc.guardarUserId($rootScope.userId);
              flickrDbSvc.guardarUserName($scope.inputVal);
              $state.go('app.directorios');

            }
            else {
              swal({
                title: "El usuario ingresado no tiene photsets!",
                text: "Prueba con otro!",
                imageUrl: "img/disappointment-sad.png",
                timer: 2000,
                showConfirmButton: false
              });
              $ionicLoading.hide();
            }

            // flickrDbSvc.actualizarDirectorios($scope.photosets, userId);
          });
        //se rompe acá cuando quiero actulizar la bd obvio..

      } else {
        //trae de la bd. Hay que validar que sea el mismo userId que el que tengo guardado en la bd.
        conexion.showNotOnline();
        $scope.directorios = flickrDbSvc.recuperarDirectorios($rootScope.userId);
      }
      ;
    }

  });
