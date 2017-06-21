// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('flickrApp', ['ionic', 'ksSwiper'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.bienvenido', {
    url: '/bienvenido',
    views: {
      'menuContent': {
        templateUrl: 'templates/bienvenido.html'
      }
    }
  })
  .state('app.buscar', {
    url: '/buscar',
    views: {
      'menuContent': {
        templateUrl: 'templates/buscar.html',
        controller: 'buscarCtrl'
      }
    }
  })
  .state('app.fotos', {
    url: '/fotos',
    views: {
      'menuContent': {
        templateUrl: 'templates/fotos.html',
        controller: 'fotosCtrl'
      }
    }
  })
  .state('app.lista_directorios', {
    url: '/directorios',
    views: {
      'menuContent': {
        templateUrl: 'templates/lista_directorios.html'
      }
    }
  })
  .state('app.ver_directorio', {
    url: '/directorios/ver_directorio/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/ver_directorio.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/bienvenido');
})

.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.common = 'Content-Type: application/json';
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
)
.run(function asegurarPermisosNotificaciones() {
  document.addEventListener('deviceReady', function() {
    cordova.plugins.notification.local.hasPermission(function(notificacionesPermitidas) {
      if (!notificacionesPermitidas) {
        cordova.plugins.notification.local.registerPermission();
      }
    });
  }, false);
});
