'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
