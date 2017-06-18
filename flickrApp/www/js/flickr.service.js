angular.module('encuestasApp')
  // .service('encuestasHttpSvc', function($q, $http) {
  //
  //   var baseUrl = 'https://api.flickr.com/services/';
  //   var cliente = (window.device || { }).uuid || Math.random();
  //
  //
  //
  //   this.getEncuestas = function() {
  //     var encuestas = null;
  //     return $http.get(baseUrl)
  //       .then(function(respuesta) {
  //         return _.cloneDeep(respuesta.data.encuestas);
  //       });
  //   };
  //
  //   this.getEncuesta = function(id) {
  //     return $http.get(baseUrl + id).then(function(respuesta) {
  //       return _.cloneDeep(respuesta.data);
  //     });
  //   };
  //
  //   this.responder = function(id, respuestas) {
  //     return $http.post(baseUrl + id + '/soluciones/' + cliente, { respuestas: respuestas });
  //   };
  // })

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

  // .service('directoriosSvc', function($q, , flickrDbSvc, conexion) {
  //   var encuestas = null;
  //   this.getEncuestas = function() {
  //     if (conexion.online()) {
  //       return encuestasHttpSvc.getEncuestas()
  //         .then(function(respuesta) { encuestas = respuesta; })
  //         .then(function() { flickrDbSvc.actualizarEncuestas(encuestas); })
  //         .then(function() {
  //           return _.cloneDeep(encuestas);
  //         });
  //     } else {
  //       return encuestasDbSvc.getEncuestas();
  //     }
  //   };
  //
  //   this.getEncuesta = function(id) {
  //     if (!conexion.online()) {
  //       return $q.reject('Sin conexión');
  //     }
  //     return encuestasHttpSvc.getEncuesta(id);
  //   };
  //
  //   this.responder = function(id, respuestas) {
  //     if (!conexion.online()) {
  //       return $q.reject('Sin conexión');
  //     }
  //     return encuestasHttpSvc.responder(id, respuestas);
  //   };
  }
  );
