'use strict';

(function() {

	var app = angular.module('loginPage', []);

	var count = 0;
	var user = '';

	app.controller('UsersController', [ '$http', '$location', '$scope', function($http, $location, $scope) {

		this.username = '';
		this.password = '';

		this.add = function() {
			user = this.username;
			$http.post('/users/add', {user: user, password: this.password}).success(function(data) {
				if(data.errCode === 1) {
					count = data.count;
					$location.path('/user/' + user);
				} else if (data.errCode === -2) {
					$('#error-message').html("User already exists!");
				} else if (data.errCode === -3) {
					$('#error-message').html("Bad Username!");
				} else if (data.errCode === -4) {
					$('#error-message').html("Bad Password!");
				}
			});
		};

		this.login = function() {
			user = this.username;
			$http.post('/users/login', {user: user, password: this.password}).success(function(data) {
				if(data.errCode === 1) {
					count = data.count;
					$location.path('/user/' + user);
				} else if (data.errCode === -1) {
					$('#error-message').html("Bad Credentials!");
				}
			});
		};

		this.logout = function() {
			$location.path('/');
		};

		this.getUser = function() {
			return user;
		};

		this.getCount = function() {
			return count;
		};
	}]);

})();