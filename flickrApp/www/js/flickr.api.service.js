angular.module('flickrApp')
.service('flickrApiSvc', function($q, $http) {

	var baseUrl = 'https://api.flickr.com/services/rest/?method=';
	var apiKey = '6f1dc5de29ce7e71586824ede294c57c';

	this.getUserId = function(username) {
		var uri = 'flickr.people.findByUsername&api_key=' + apiKey + '&username=' + username + '&format=json&nojsoncallback=1';
		console.log(baseUrl + uri);
		return $http.get(baseUrl + uri)
		.then(function(respuesta) {
			return _.cloneDeep(respuesta.data.user.id);
		});
	};

  this.getDirectorios = function(userId) {
    //armar pegada con el user id
    var uri = 'flickr.photosets.getList&api_key=' + apiKey + '&user_id=' + userId + '&format=json&nojsoncallback=1';
    console.log(baseUrl + uri);
    return $http.get(baseUrl + uri)
      .then(function(respuesta) {
        return _.cloneDeep(respuesta.data.photosets.photoset);
      });
  };

  this.getPhotos = function(photosetId, userId) {
  	var uri = 'flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + photosetId +'&user_id=' + userId + '&format=json&nojsoncallback=1';
  	console.log(baseUrl + uri);
  	return $http.get(baseUrl + uri)
  		.then(function(respuesta) {
  			return _.cloneDeep(respuesta.data.photoset.photo);
  		});
  };

  this.getPhotoUrl = function(photo) {
  	return _.cloneDeep('https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg');
  };
});
