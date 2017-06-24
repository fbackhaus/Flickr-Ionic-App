angular.module('flickrApp')
.controller('fotosCtrl', function ($scope, flickrApiSvc, $ionicLoading, $state, $rootScope, $ionicModal) {
  setTimeout(function(){
    $ionicLoading.hide();
  }, 2000);
  if ($rootScope.galleryPhotos == undefined) {
    $state.go('app.bienvenido');
  }

  $scope.share = function() {
    $scope.closeModal();
    swal({
      title: "Compartir?",
      text: "Se enviará la foto por mail",
      showCancelButton: true,
      closeOnConfirm: true,
      imageUrl: "img/email.png"
    },
    function(){
      sendEmail();
    });
  };

  sendEmail = function() {
  //   cordova.plugins.email.addAlias('gmail', 'com.google.android.gm');
  
  cordova.plugins.email.hasPermission(function (granted) {
   if(!granted) {
    cordova.plugins.email.requestPermission();
  }
});
  cordova.plugins.email.open({
    app: 'gmail',
    subject:    "Mira esta foto que encontré en Flickr!", // subject of the email
    body: $scope.imageSrc
  });
  
};

$scope.showPhoto = function (item) {
  $scope.imageSrc = item.src;
  $scope.imageSub = item.sub;
  $scope.imageId = item.id;
  $scope.openModal();
  getComments($scope.imageId);
}

$scope.showComments = function () {
  $scope.openCommentsModal();
};

$ionicModal.fromTemplateUrl('image-modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function (modal) {
  $scope.modal = modal;
});

$scope.openModal = function () {
  $scope.modal.show();
};

$scope.closeModal = function () {
  $scope.modal.hide();
};

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.$on('modal.shown', function () {
    });

    function getComments(photoId) {
      flickrApiSvc.getComments(photoId)
      .then(function (comments) {
        $scope.comments = comments.comments.comment;
      })
    }

    $ionicModal.fromTemplateUrl('comments-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.commentsModal = modal;
    });

    $scope.openCommentsModal = function () {
      if ($scope.comments != undefined && $scope.comments.length > 0) {
        $scope.commentsModal.show();
      }
      else {
        swal({
          title: "Esta foto no tiene comentarios",
          text: "Prueba con otra!",
          imageUrl: "img/disappointment-sad.png",
          timer: 2000,
          showConfirmButton: false
        });
      }

    };

    $scope.closeCommentsModal = function () {
      $scope.commentsModal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.commentsModal.remove();
    });

    $scope.$on('commentsModal.shown', function () {
    });
  });
