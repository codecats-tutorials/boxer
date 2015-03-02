'use strict';

/**
 * @ngdoc overview
 * @name projApp
 * @description
 * # projApp
 *
 * Main module of the application.
 */
angular
  .module('projApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    //'ngMockE2E'//if u dont want mock requests anymore delete this module
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        activeTab: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        activeTab: 'about'
      })
      .when('/agenda', {
        templateUrl: 'views/agenda.html',
        controller: 'AgendaCtrl',
        activeTab: 'agenda'
      })
      .when('/coaches', {
        templateUrl: 'views/coaches.html',
        controller: 'CoachesCtrl',
        activeTab: 'coaches'
      })
      .when('/gym', {
        templateUrl: 'views/gym.html',
        controller: 'GymCtrl',
        activeTab: 'gym'
      })
      .when('/places', {
        templateUrl: 'views/places.html',
        controller: 'PlacesCtrl',
        activeTab: 'places'
      })
      .when('/tickets', {
        templateUrl: 'views/tickets.html',
        controller: 'TicketsCtrl',
        activeTab: 'tickets'
      })
      .when('/players', {
        templateUrl: 'views/players.html',
        controller: 'PlayersCtrl',
        activeTab: 'players'
      })
      .when('/player-view/:id', {
        templateUrl: 'views/player-view.html',
        controller: 'PlayerViewCtrl',
        activeTab: 'widok użytkownika'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  }).
  config(function ($interpolateProvider) {
    //for django
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  })
  .run(function run ($http, $cookies, $rootScope) {
    //for django
    $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];

    //always routing
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      $rootScope.activeTab = next.activeTab;
    });
  });

var app = angular.module('projApp')
