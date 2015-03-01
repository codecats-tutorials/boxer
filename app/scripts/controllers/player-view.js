'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:PlayerviewCtrl
 * @description
 * # PlayerviewCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('PlayerViewCtrl', function ($scope, $routeParams) {
      console.log($routeParams.id);
      $scope.$root.activeTab += ' ' + $routeParams.id

      $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
      ];
  });
