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
        $scope.savePlayerSubmit = function ($event, player) {
            var form = angular.element($event.currentTarget);
            form.addClass('loading');
            if (player.id) {
                player.$update(function () {form.removeClass('loading')});
            } else {
                player.$save(function (data) {
                    if (data.id) {
                        //$scope.player = Players.newInstance(data);
                        player = Players.newInstance();
                    }
                    form.removeClass('loading')
                });
            }
        };
        $scope.editPlayer = function (player) {
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
