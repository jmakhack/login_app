'use strict';

angular.module('warmupApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'loginPage'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider;
    //  .otherwise('/');

    $locationProvider.html5Mode(true);
  });