angular.module('flickrApp')
  .controller('AppCtrl', function($scope, directoriosSvc) {

    function cargarDirectorios() {
      return directoriosSvc.getDirectorios().then(function(encuestas) {
        $scope.directorios = directorios;
      });
    }
  });
