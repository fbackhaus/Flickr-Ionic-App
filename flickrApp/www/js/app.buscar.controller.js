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
        if(id != null) {
          $rootScope.userId = id;
          getDirectorios(id);
        }
        else {
          swal("Oops...", "That user does not exist!", "error");
        }
      })
    }
  }

  function getDirectorios(userId) {

    if(conexion.online()){
      //esta conectado, pega a la api y con el id y trae
      flickrApiSvc.getDirectorios(userId)
      .then(function(photosets) {
        console.log(photosets);
        //Tiro cada titulo a tolowercase
        photosets.forEach(function(photo) {
          photo.title._content = photo.title._content.toLowerCase();
        });

        $rootScope.photosets = photosets;
        if(photosets.length > 0) {
          $state.go('app.directorios');  
        }
        else {
          swal({
            title: "The user you entered has no photosets!",
            text: "Sorry!",
            imageUrl: "img/disappointment-sad.png",
            timer: 2000,
            showConfirmButton: false
          });
        }
        
        // flickrDbSvc.actualizarDirectorios($scope.photosets, userId);
      });
      //se rompe acá cuando quiero actulizar la bd obvio..

    }else{
      //trae de la bd. Hay que validar que sea el mismo userId que el que tengo guardado en la bd.
      conexion.showNotOnline();
      $scope.directorios = flickrDbSvc.getDirectorios();
    };
  }

});
