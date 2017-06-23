angular.module('flickrApp')
  .service('conexion', function($rootScope, $ionicPopup, $ionicPlatform) {
    var platform;
    //nose para que usaríamos este método aún
    this.cambiarEstado = function cambiarEstado(online) {
      $rootScope.$apply(function() {
        $rootScope.online = online;
      });
    }

    //function que permite obtener el estado de la conexión 
    this.online = function() {
      return $rootScope.online;
    };

    $rootScope.online = navigator.onLine?navigator.onLine:navigator.connection.type != "none";
    document.addEventListener("online", function() { cambiarEstado(true); }, false);
    document.addEventListener("offline", function() { cambiarEstado(false); }, false);

    this.showNotOnline = function() {
      platform.ready(function() {
        if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
              title: "Internet Disconnected",
              content: "The internet is disconnected on your device."
            })
              .then(function(result) {
                if(!result) {
                  ionic.Platform.exitApp();
                }
              });
          }
        }
      });
    };

    this.setIonicPlatform = function(ionicPlatform){
      platform = ionicPlatform;
    }
  });
