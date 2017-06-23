angular.module('flickrApp')
.controller('fotosCtrl', function($scope, flickrApiSvc, $ionicLoading, conexion, $state, $rootScope, $ionicModal, $window) {
	if($rootScope.galleryPhotos == undefined) {
		$state.go('app.bienvenido');
	}

	$scope.showPhoto = function(item) {
		console.log(item);
		$scope.imageSrc = item.src;
		$scope.imageSub = item.sub;
		$scope.imageId = item.id;
		$scope.openModal();
		getComments($scope.imageId);
	}

	$scope.showComments = function() {
		$scope.openCommentsModal();
	};

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

    $scope.$on('modal.shown', function() {
    	console.log('Modal is shown!');
    });

    function getComments(photoId) {
    	flickrApiSvc.getComments(photoId)
    	.then(function(comments) {
    		$scope.comments = comments.comments.comment;
    	})
    }

    $ionicModal.fromTemplateUrl('comments-modal.html', {
    	scope: $scope,
    	animation: 'slide-in-up'
    }).then(function(modal) {
    	$scope.commentsModal = modal;
    });

    $scope.openCommentsModal = function() {
    	if($scope.comments != undefined && $scope.comments.length > 0) {
    		$scope.commentsModal.show();	
    	}
    	else {
    		swal({
    			title: "This Picture has no comments!",
    			text: "Sorry!",
    			imageUrl: "img/disappointment-sad.png",
    			timer: 2000,
    			showConfirmButton: false
    		});
    	}
    	
    };

    $scope.closeCommentsModal = function() {
    	$scope.commentsModal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
    	$scope.commentsModal.remove();
    });
    
    $scope.$on('commentsModal.shown', function() {
    	console.log('Comments Modal is shown!');
    });
});