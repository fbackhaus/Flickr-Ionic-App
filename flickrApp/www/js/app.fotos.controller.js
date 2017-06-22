angular.module('flickrApp')
.controller('fotosCtrl', function($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc, $state, $rootScope) {
	if($rootScope.galleryPhotos == undefined) {
		$state.go('app.bienvenido');
	}

    function getComments(photoId) {
        flickrApiSvc.getComments(photoId)
        .then(function(comments) {
            console.log(comments);
        })
    }
});