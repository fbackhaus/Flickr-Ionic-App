angular.module('flickrApp')

  .service('flickrDbSvc', function($q, $ionicPlatform) {
    var db = null;

    //Abre la base de datos y crea las tablas si aun no existen
    // $ionicPlatform.ready(function() {
    //   db = window.sqlitePlugin.openDatabase({name: 'flickr.db', location: 'default'}, successcb, errorcb);
    //
    // db.transaction(function(transaction) {
    //   transaction.executeSql('CREATE TABLE IF NOT EXISTS flickrDB (id integer primary key, url text)', [],
    //     function(tx, result) {
    //       alert("Table created successfully");
    //     },
    //     function(error) {
    //       alert("Error occurred while creating the table.");
    //     });
    // }, db.close);
    // });


    var db = 
     //Obtiene los sets desde la DB
    this.getDirectorios = function() {
      return $q(function(resolve, reject) {
        db.executeSql("SELECT * FROM flickr", [],
          function(resultado) {
            resolve(rows(resultado));
          },
          reject);
      });

    };
    //
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

  .service('directoriosSvc', function($q, flickrApiSvc, flickrDbSvc, conexion) {
    var directorios = null;
    this.getDirectorios = function() {
      if (conexion.online()) {
        return flickrApiSvc.getDirectorios()
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
      return flickrApiSvc.getDirectorios(id);
    };

    this.responder = function(id, respuestas) {
      if (!conexion.online()) {
        return $q.reject('Sin conexión');
      }
      return flickrApiSvc.responder(id, respuestas);
    };

  });

