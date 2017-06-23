angular.module('flickrApp')
.controller('fotosCtrl', function($scope, flickrApiSvc, $ionicLoading, conexion, $state, $rootScope, $ionicModal) {
	if($rootScope.galleryPhotos == undefined) {
		$state.go('app.bienvenido');
	}

	$scope.callback = function(item) {
		console.log(item);
		$scope.imageSrc = item.src;
		$scope.imageSub = item.sub;
		$scope.imageId = item.id;
		$scope.openModal();
	}

	$scope.holis = function() {
		console.log("JELOU");
	}

	$ionicModal.fromTemplateUrl('image-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		$scope.modal.show();
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
	};

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
    	$scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
  });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
  });
    $scope.$on('modal.shown', function() {
    	console.log('Modal is shown!');
    });

    function getComments(photoId) {
    	flickrApiSvc.getComments(photoId)
    	.then(function(comments) {
    		console.log(comments);
    	})
    }
});