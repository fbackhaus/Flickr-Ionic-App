angular.module('flickrApp')
.controller('bienvenidoCtrl',function ($scope, $ionicLoading, $rootScope){
  $rootScope.showIonicLoading = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="lines"/>'
    });
  }
  $ionicLoading.hide();
})

;
