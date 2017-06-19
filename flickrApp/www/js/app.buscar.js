angular.module('flickrApp')
.controller('buscarCtrl', function($scope, flickrHttpSvc) {
  console.log('entro!! no puedo hacerlo ANdaR!');

    function getUserId() {
    console.log("ENTRO AL getUserID");
      flickrHttpSvc.getUserID().then(function(directorios) {
        console.log("User id del")
      });
    }
});
