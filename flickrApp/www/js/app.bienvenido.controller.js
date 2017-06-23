angular.module('flickrApp')
.controller('bienvenidoCtrl',function ($scope, flickrApiSvc, $ionicLoading, conexion, $state, $rootScope, $ionicModal, flickrDbSvc, $window){
  $rootScope.showIonicLoading = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="lines"/>'
    });
  }
  $ionicLoading.hide();
})

;
