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

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };
  });
