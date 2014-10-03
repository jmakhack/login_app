'use strict';

(function() {

	var app = angular.module('warmupApp');

	app.config(function ($stateProvider) {
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