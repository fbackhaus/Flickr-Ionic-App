angular.module('flickrApp')
.controller('directoriosCtrl', function($scope, flickrApiSvc, $ionicLoading, conexion, flickrDbSvc, $state, $rootScope) {
	$scope.getPhotos = function(photosetId) {
		console.log(photosetId);
		flickrApiSvc.getPhotos(photosetId, $rootScope.userId)
		.then(function(photos) {
			console.log(photos);
			var jsonText = "[";
			photos.forEach(function(photo) {
				var title = photo.title.replace(/["']/g, "");
				var text = '{ "src" :"' + getPhotoUrl(photo) + '",' + '"sub" : "' + title + '",' + '"id" : "' + photo.id +'"},';
				jsonText += text;
			});
			jsonText = jsonText.substring(0, jsonText.length -1);
			jsonText += "]";
			var galleryPhotos = JSON.parse(jsonText);
			$rootScope.galleryPhotos = galleryPhotos;
			console.log($rootScope.galleryPhotos);
			$state.go('app.fotos');
        // getComments(photos[0].id);
    })
	};

  $scope.ordenar = function(orderValue){
    console.log('el orden es'+ orderValue);
  };

	function getPhotoUrl(photo) {
		var url = flickrApiSvc.getPhotoUrl(photo);
		return url;
	}
});
