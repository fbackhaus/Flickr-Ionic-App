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



    /*
     var db = null;

     // Abre la base de datos y crea las tablas si aun no existen... se rompe por todos lados!!
     // $ionicPlatform.ready(function() {
     //   db = window.sqlitePlugin.openDatabase({name: 'flickr.db', location: 'default'}, successcb, errorcb);

     // db.transaction(function(transaction) {
     //   transaction.executeSql('CREATE TABLE IF NOT EXISTS photosets (id long primary key, userId text, title text)', [],
     //     function(tx, result) {
     //       alert("Table created successfully");
     //     },
     //     function(error) {
     //       alert("Error occurred while creating the table.");
     //     });
     // }, db.close);
     // });


     var db = "";
     //Obtiene los sets desde la DB
     this.getDirectorios = function() {
     return $q(function(resolve, reject) {
     db.executeSql("SELECT * FROM photosets", [],
     function(resultado) {
     resolve(rows(resultado));
     },
     reject);
     });

     };
     //
     //Guarda la lista de directorios en la DB
     this.actualizarDirectorios = function(directorios, userId) {
     console.log("=====SERVICE======");
     console.log(directorios);
     var sqlStatments = [ "DELETE FROM flickr" ];
     directorios.forEach(function(photoset) {
     // sqlStatments.push([ "INSERT INTO photosets(id, userId, title) VALUES(?, ?, ?)", [ photoset.id, userId, photoset.title._content] ]);
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
     */
  });

