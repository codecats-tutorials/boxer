'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:PlayerviewCtrl
 * @description
 * # PlayerviewCtrl
 * Controller of the projApp
 */
angular.module('projApp')
    .controller('PlayerViewCtrl', function ($scope, $routeParams, Players) {
        $scope.player = Players.newInstance();
        $scope.player.$get({id: $routeParams.id}, function () {
            $scope.$root.activeTab += ' ' + $scope.player.name + ' ' + $scope.player.surname;
        })


    });
