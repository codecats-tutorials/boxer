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
        $scope.player = Players.newInstance();
        $scope.confirmTemplate = [];
        $scope.updateUsers = function () {
            $scope.players = Players.query();
            $scope.players.$promise.then(function (data) {
                $scope.chunkedPlayers = chunker.getChunks(data, 3);
                angular.element('body').removeClass('loading');
            });
        };
        $scope.savePlayerSubmit = function ($event, player) {
            var element = angular.element($event.currentTarget).find('button[type=submit]');

            element.addClass('loading');
            if (player.id) {
                player.$update(function (data) {
                    if (angular.equals({}, data.errors)){
                        player.template = null;
                    }
                    element.removeClass('loading')
                });
            } else {
                player.$save(function (data) {
                    if (data.id) {
                        //$scope.player = Players.newInstance(data);
                        $scope.player = Players.newInstance({});
                    }
                    $scope.updateUsers();
                    element.removeClass('loading')
                });
            }
        };
        $scope.deletePlayer = function ($event, player) {
            if ($scope.confirmTemplate[player.id]) {
                $scope.confirmTemplate[player.id] = null;
            } else {
                $scope.confirmTemplate[player.id] = 'views/confirm/delete.html';
            }
        };
        $scope.deletePlayerSubmit = function ($event, player) {
            $scope.confirmTemplate[player.id] = null;
            var element = angular.element($event.currentTarget);
            element.addClass('loading');
            player.$delete(function () {
                $scope.updateUsers();
                element.removeClass('loading');
            });
        };
        $scope.editPlayer = function ($event, player) {
            if (player.template) {
                player.template = null;
            } else {
                player.template = {'url': 'views/forms/boxer.html'};
            }
        };
        acl.afterInit = function () {
            if (acl.hasAccessResource('BOXERS')) {
                $http.get('organizations/').then(function (data) {
                    $scope.availableOrganizations = data.data;
                });
                $scope.template = {'url': 'views/forms/boxer.html'};
            }
        };

        angular.element('body').addClass('loading');

        $scope.updateUsers();
        //$http.get('/players').then(function (response) {
        //    $scope.chunkedPlayers = chunker.getChunks(response.data, 3);
        //    angular.element('body').removeClass('loading');
        //});
    });
