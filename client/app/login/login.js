'use strict';

(function() {

	var app = angular.module('warmupApp');

	app.config(function ($stateProvider) {
      //Display login page at root and counter page at /user/:userid
    	$stateProvider
      		.state('login', {
        	url: '/',
        	templateUrl: 'app/login/login.html'
      	}).state('counter', {
        	url: '/user/:userid',
        	templateUrl: 'app/login/counter.html'
      	});
  	});
  
})();