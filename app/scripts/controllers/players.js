'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:PlayersCtrl
 * @description
 * # PlayersCtrl
 * Controller of the projApp
 */
angular.module('projApp')
    .controller('PlayersCtrl', function ($scope, $http, $compile, chunker, acl, Players) {
        window['p'] = Players
        $scope.player = Players.newInstance();
        $scope.createPlayer = function () {
            var form = angular.element('form');
            form.addClass('loading');
            $scope.player.$save(function (data) {
                if (data.id) {
                    //$scope.player = Players.newInstance(data);
                    $scope.player = Players.newInstance();
                }
                form.removeClass('loading')
            });
        };
        acl.afterInit = function () {
            if (acl.hasAccessResource('BOXERS')) {
                $http.get('organizations/').then(function (data) {
                    $scope.availableOrganizations = data.data;
                });
                $scope.template = {'url': 'views/forms/boxer-add.html'};
            }
        };

        angular.element('body').addClass('loading');
        $http.get('/players').then(function (response) {
            $scope.chunkedPlayers = chunker.getChunks(response.data, 3);
            angular.element('body').removeClass('loading');
        });
    });
