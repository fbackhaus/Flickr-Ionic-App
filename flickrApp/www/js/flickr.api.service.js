angular.module('flickrApp')
.service('flickrApiSvc', function($q, $http) {

	var baseUrl = 'https://api.flickr.com/services/';
	var apiKey = '6f1dc5de29ce7e71586824ede294c57c';

	this.getUserId = function(username) {
		var uri = 'rest/?method=flickr.people.findByUsername&api_key=' + apiKey + '&username=' + username + '&format=json&nojsoncallback=1';
		console.log(baseUrl + uri);
		return $http.get(baseUrl + uri)
		.then(function(respuesta) {
			// console.log(respuesta.data.user.id);
			return respuesta.data.user.id;
		});
	};

  this.getDirectorios = function() {
    var directorios = null;
    return $http.get(baseUrl )
      .then(function(respuesta) {
        return _.cloneDeep(respuesta.data.directorios);
      });
  };
})

  .service('flickrConnectionSvc', function($q, $http, conexion) {

    this.estadoConexion = function() {
      return conexion.online();
    };
  });
