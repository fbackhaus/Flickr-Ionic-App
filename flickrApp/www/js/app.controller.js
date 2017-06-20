angular.module('flickrApp')
  .controller('AppCtrl', function($scope, flickrDbSvc ) {
    $scope.directorios =[{"nombre":"pepe"}, {"nombre":"fulgencio"}];

    function cargarDirectorios() {
    console.log("ENTRO AL CONTROLLER");
      directoriosSvc.getDirectorios().then(function(directorios) {
        $scope.directorios = directorios ;
      });
    }
  });
