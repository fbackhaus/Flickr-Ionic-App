angular.module('flickrApp')
  .controller('AppCtrl', function($scope,flickrDbSvc ) {
  	console.log("ENTRO EN EL CONTROLLER");
    flickrDbSvc.getDirectorios();
    // function cargarDirectorios() {
    // console.log("ENTRO AL CONTROLLER");
    //   directoriosSvc.getDirectorios().then(function(directorios) {
    //     $scope.directorios = directorios ;
    //   });
    // }
  });
