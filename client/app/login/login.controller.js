'use strict';

(function() {

	//create new angular module 'loginPage' which is a dependency of 'warmupApp'
	var app = angular.module('loginPage', []);

	//stores the count and username of the most recent add or login
	var count = 0;
	var user = '';

	//controls interactions with the backend server for the login application
	app.controller('UsersController', [ '$http', '$location',  function($http, $location) {

		//the values in the text fields: username and password
		this.username = '';
		this.password = '';

		//attempts to add a new user to the database, which may result in a negative errCode
		this.add = function() {
			user = this.username;
			$http.post('/users/add', {user: user, password: this.password}).success(function(data) {
				if(data.errCode === 1) { //SUCCESS
					count = data.count;
					$location.path('/user/' + user);
				} else if (data.errCode === -2) { //ERR_USER_EXISTS
					$('#error-message').html('Username taken!');
				} else if (data.errCode === -3) { //ERR_BAD_USERNAME
					$('#error-message').html('Invalid Username!');
				} else if (data.errCode === -4) { //ERR_BAD_PASSWORD
					$('#error-message').html('Invalid Password!');
				}
			});
		};

		//attempts to update a user's count in the database, which may result in a negative errCode
		this.login = function() {
			user = this.username;
			$http.post('/users/login', {user: user, password: this.password}).success(function(data) {
				if(data.errCode === 1) { //SUCCESS
					count = data.count;
					$location.path('/user/' + user);
				} else if (data.errCode === -1) { //ERR_BAD_CREDENTIALS
					$('#error-message').html('Bad Credentials!');
				}
			});
		};

		//log outs the current user by returning to the root page
		this.logout = function() {
			$location.path('/');
			//reset current count and username values back to default
			count = 0;
			user = '';
		};

		//returns the username of the current user
		this.getUser = function() {
			return user;
		};

		//returns the login count of the current user
		this.getCount = function() {
			return count;
		};

		this.stampCard = function(n) {
			var specials = ['super ultra extreme milk tea', 'jalepeno horchata milk tea', 'crispy fried chicken black tea', 'george necula special', 'supreme king of milk tea', 'neapolitan milk tea', '1000% caffeinated milk tea', 'dA b3st m1lk t3a 3v4r', 'mysteriously awesome milk tea', 'cs169 node.js milk tea'];
			switch(n) {
				case 10:
					$('#bonus').html('Congratulations!!! You win a ' + specials[Math.floor(Math.random() * 10)] + ' boba!!!!!!!!! :D');
					$('#s9').css('background-color', '#f00');
				case 9:
					$('#s8').css('background-color', '#ff0');
				case 8:
					$('#s7').css('background-color', '#f0f');
				case 7:
					$('#s6').css('background-color', '#000');
				case 6:
					$('#s5').css('background-color', '#0ff');
				case 5:
					$('#s4').css('background-color', '#00f');
				case 4:
					$('#s3').css('background-color', '#fff');
				case 3:
					$('#s2').css('background-color', '#f00');
				case 2:
					$('#s1').css('background-color', '#af0');
				case 1:
					$('#s0').css('background-color', '#f99');
			}
		};
	}]);

})();