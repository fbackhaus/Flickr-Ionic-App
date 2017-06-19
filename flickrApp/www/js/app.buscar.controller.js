angular.module('flickrApp')
.controller('buscarCtrl', function($scope, flickrApiSvc, $ionicLoading) {

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
  }

  function showIonicLoading() {
    return $ionicLoading.show({
      template: '<ion-spinner icon="lines"/>'
    });
  }

  function getDirectorios() {
    console.log(flickrApiSvc.getUserId($scope.inputVal));
  }

});
