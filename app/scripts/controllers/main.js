'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('MainCtrl', function ($scope) {
    $scope.ye = '12';
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
