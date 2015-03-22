'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:PlayersCtrl
 * @description
 * # PlayersCtrl
 * Controller of the projApp
 */
angular.module('projApp')
    .controller('PlayersCtrl', function (
        $scope, $http, $compile, chunker, $rootScope, Players, $alert
    ) {
        angular.element('#loader-bounce').removeClass('hidden');

        $scope.acl      = $rootScope.acl;
        $scope.player   = Players.newInstance();
        $scope.confirmTemplate = [];
        $scope.updateUsers = function () {
            $scope.players = Players.query();
            $scope.players.$promise.then(function (data) {
                $scope.chunkedPlayers = chunker.getChunks(data, 3);
                angular.element('body').removeClass('loading');
            });
        };
        $scope.savePlayerSubmit = function ($event, player) {
            var targetObj   = angular.element($event.currentTarget),
                element     = targetObj.find('button[type=submit]');

            element.addClass('loading');
            if (player.id) {
                player.$update(function (data) {
                    if (angular.equals({}, data.errors)){
                        player.template = null;
                        targetObj.closest('div.thumbnail').find('.glyphicon-edit').removeClass('active');
                    }
                    element.removeClass('loading');
                });
            } else {
                player.$save(function (data) {
                    if (data.id) {
                        //$scope.player = Players.newInstance(data);
                        $scope.player = Players.newInstance({});
                        //close collapse
                        element.closest('.collapse').prev().trigger('click');
                        $alert({
                            title: 'Sukces!',
                            content: 'Nowy zawodnik dodany.',
                            placement: 'top', type: 'info', show: true, duration: 5
                        });
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
                angular.element('html, body').animate({
                    scrollTop: angular.element($event.currentTarget).closest('div').offset().top
                }, 1000);
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
                angular.element($event.currentTarget).removeClass('active');
            } else {
                player.template = {'url': 'views/forms/boxer.html'};
                angular.element($event.currentTarget).addClass('active');
                angular.element('html, body').animate({
                    scrollTop: angular.element($event.currentTarget).offset().top
                }, 1000);
            }
        };
        $scope.initOrganizations = function () {
            if ($rootScope.acl.hasAccessResource('BOXERS')) {
                $http.get('organizations/').then(function (data) {
                    $scope.availableOrganizations = data.data;
                });
            }
        };
        $rootScope.acl.afterInit = function () {
            $scope.initOrganizations();
        };

        angular.element('body').addClass('loading');
        $scope.initOrganizations();
        $scope.updateUsers();
        //$http.get('/players').then(function (response) {
        //    $scope.chunkedPlayers = chunker.getChunks(response.data, 3);
        //    angular.element('body').removeClass('loading');
        //});
    });
