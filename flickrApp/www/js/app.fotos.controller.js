angular.module('flickrApp')
.controller('fotosCtrl', function($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc, $state, $rootScope) {
	if($rootScope.photos == undefined) {
		$state.go('app');
	}

$scope.swiper = {};
 
    $scope.onReadySwiper = function (swiper) {
 
        swiper.on('slideChangeStart', function () {
            console.log('slide start');
        });
         
        swiper.on('onSlideChangeEnd', function () {
            console.log('slide end');
        });     
    };

});