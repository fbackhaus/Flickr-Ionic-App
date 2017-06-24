angular.module('flickrApp')

  .service('flickrDbSvc', function ($q, $ionicPlatform) {

    this.guardarDirectorios = function (userName, directorios) {
      window.localStorage.setItem('directorio', JSON.stringify(directorios));

    };

    this.recuperarDirectorios = function () {
      return JSON.parse(window.localStorage.getItem('directorio'));
    };


    this.guardarFotos = function (photosetId, photos) {

      window.localStorage.setItem(photosetId.toString(), JSON.stringify(photos));
    };

    this.recuperarFotos = function (photosetId) {

      return JSON.parse(window.localStorage.getItem(photosetId.toString()));

    };


    this.guardarUserName = function (username) {
      window.localStorage.setItem('username', username.toString());
    }

    this.recuperarUserName = function () {
      return window.localStorage.getItem('username');
    }

    this.guardarUserId = function (userId) {
      window.localStorage.setItem('userId', userId.toString());
    }
    this.recuperarUserId = function () {
      return window.localStorage.getItem('userId');
    }
    
  });

