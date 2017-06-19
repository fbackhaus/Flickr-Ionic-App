angular.module('flickrApp')
  .service('flickrHttpSvc', function($q, $http) {
  //
    var baseUrl = 'https://api.flickr.com/services/';
    var cliente = (window.device || { }).uuid || Math.random();
    var apiKey = '6f1dc5de29ce7e71586824ede294c57c';

    this.getUserId = function(username) {
      var uri = 'rest/?method=flickr.people.findByUsername&api_key=' + apiKey + '&username=' + username + '&format=json&nojsoncallback=1';
        return $http.get(baseUrl + uri)
        .then(function(respuesta) {
          return _.cloneDeep(respuesta.user.id);
        });
    };


    this.getInfoUser = function() {
      console.log('entró a la info del user');
      var info_user = null;
      return $http.get(baseUrl)
        .then(function(respuesta) {
          return _.cloneDeep(respuesta.data.info_user);
        });
    };

    this.getDirectorios = function() {
      var directorios = null;
      return $http.get(baseUrl )
        .then(function(respuesta) {
          return _.cloneDeep(respuesta.data.directorios);
        });
    };

    this.getDirectorios = function(id) {
      return $http.get(baseUrl + id).then(function(respuesta) {
        return _.cloneDeep(respuesta.data);
      });
    };

    //NOSE SI HACE FALTA POSTEAR ALGO
    this.responder = function(id, respuestas) {
      return $http.post(baseUrl + id + '/blablablablJUDIO=JABONaqweqweqweqwlbla/' + cliente, { respuestas: respuestas });
    };
  })

  .service('flickrDbSvc', function($q, $ionicPlatform) {
    var db = null;

    //Abre la base de datos y crea las tablas si aun no existen
    $ionicPlatform.ready(function() {
      db = window.sqlitePlugin.openDatabase({name: "flickr.db", location: 'default'}, function() {
        db.transaction(function(tx) {
          tx.executeSql("CREATE TABLE IF NOT EXISTS flickr(id text primary key, url text)");
        });
      });
    });


    //
    // //Obtiene los sets desde la DB
    this.getDirectorios = function() {
      return $q(function(resolve, reject) {
        db.executeSql("SELECT * FROM flickr", [],
          function(resultado) {
            resolve(rows(resultado));
          },
          reject);
      });
    };

    //Guarda la lista de directorios en la DB
    this.actualizarDirectorios = function(directorios) {
      var sqlStatments = [ "DELETE FROM flickr" ];
      directorios.forEach(function(directorios) {
        sqlStatments.push([ "INSERT INTO flickr(id, url) VALUES(?, ?)", [ directorios.id, directorios.url] ]);
      });

      return $q(function(resolve, reject) {
        db.sqlBatch(sqlStatments, resolve, reject);
      });
    };
    //
    function rows(resultado) {
      var items = [];
      for (var i = 0; i < resultado.rows.length; i++) {
        items.push(resultado.rows.item(i));
      }
      return items;
    }
  })

  .service('directoriosSvc', function($q, flickrHttpSvc, flickrDbSvc, conexion) {
    var directorios = null;
    this.getDirectorios = function() {
      if (conexion.online()) {
        return flickrHttpSvc.getDirectorios()
          .then(function(respuesta) { directorios = respuesta; })
          .then(function() { flickrDbSvc.actualizarDirectorios(directorios); })
          .then(function() {
            return _.cloneDeep(directorios);
          });
      } else {
        return flickrDbSvc.getDirectorios();
      }
    };

    this.getDirectorios = function(id) {
      if (!conexion.online()) {
        return $q.reject('Sin conexión');
      }
      return flickrHttpSvc.getDirectorios(id);
    };

    this.responder = function(id, respuestas) {
      if (!conexion.online()) {
        return $q.reject('Sin conexión');
      }
      return flickrHttpSvc.responder(id, respuestas);
    };

    this.getUser = function(){
    console.log('AHORA ENTRO AJAJSKDJKASJD');
    };
  });

