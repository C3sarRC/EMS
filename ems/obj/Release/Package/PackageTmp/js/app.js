
var app = angular.module("ems", ['ngRoute', 'ngMessages']);
app.config(
	function ($routeProvider) {
	    $routeProvider.
		when('/', {
		    templateUrl: 'plantilla/turista.html',
		    controller: "turista"
		}).
	    when('/minero', {
	        templateUrl: 'plantilla/minero.html'
	    })
     .otherwise({
         redirectTo: '/'
     });
	})

