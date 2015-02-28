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
        $scope.createPlayerSubmit = function () {
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
        $scope.editPlayerSubmit = function ($event, player) {
            var form = angular.element($event.currentTarget);
            form.addClass('loading');
            player.$update()
        };
        $scope.editPlayer = function (player) {
            if (player.template) {
                player.template = null;
            } else {
                player.template = {'url': 'views/forms/boxer-edit.html'};
            }
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

        $scope.players = Players.query();
        $scope.players.$promise.then(function (data) {
            $scope.chunkedPlayers = chunker.getChunks(data, 3);
            angular.element('body').removeClass('loading');
        });
        //$http.get('/players').then(function (response) {
        //    $scope.chunkedPlayers = chunker.getChunks(response.data, 3);
        //    angular.element('body').removeClass('loading');
        //});
    });
