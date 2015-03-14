'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:PlayerviewCtrl
 * @description
 * # PlayerviewCtrl
 * Controller of the projApp
 */
angular.module('projApp')
    .controller('PlayerViewCtrl', function (
        $scope, $routeParams, Players, $rootScope, $modal, $location
    ) {
        var viewport    = angular.element('body');
        $scope.acl      = $rootScope.acl;
        $scope.template = {};
        $scope.player   = Players.newInstance();
        $scope.divisions = [
            { label: 'Ciężka', value: 1 },
            { label: 'Pół ciężka', value: 2 }
        ];
        $scope.reloadPlayer = function () {
            viewport.addClass('loading');
            $scope.player.$get({id: $routeParams.id}, function () {
                $scope.$root.activeTab += ' ' + $scope.player.name + ' ' + $scope.player.surname;
                $scope.player.division = $scope.divisions[$scope.player.division.value - 1];
                viewport.removeClass('loading');
            });
        };
        $scope.editTemplate = function ($event, player, tplName) {
            if ($scope.template[tplName]) {
                $scope.template[tplName] = null;
            } else {
                $scope.template[tplName] = {url: 'views/fields/' + tplName + '.html'};
            }
        };
        $scope.deleteProfile = function ($event, player) {
            $scope.description = 'Usunąć profil zawodnika: ' + player.name + ' ' + player.surname;
            $modal({
                show: true, prefixEvent: "user.delete",
                scope: $scope, contentTemplate: 'views/confirm/modal.html'
            });
        };
        $scope.saveProfile = function ($event, player) {
            viewport.addClass('loading');
            player.$save(function () {
                $scope.template = {};
                viewport.removeClass('loading');
            });
        };
        $scope.$on('user.delete.show', function(e, $modal){
            $modal.$scope.action = function () {
                $modal.$scope.$hide();
                viewport.addClass('loading');
                $scope.player.$delete(function () {
                    viewport.removeClass('loading');
                    $location.path('/players')
                });
            }
        });
        $scope.fullEditView = function () {
            $modal({
                scope: $scope, template: 'views/forms/boxer-full-edit-modal.html', show: true,
                prefixEvent: "user.fullEdit"
            });
        };
        $scope.$on('user.fullEdit.show', function (e, $modal) {
            $modal.$scope.action = function () {
                $scope.player.$save(function () {
                    $modal.$scope.reload = false;
                    $modal.$scope.$hide();
                })
            }
        });
        //$scope.acl.afterInit(function () {
        //    if ( ! $scope.acl.hasAccessResource('BOXERS')) {
        //        angular.element('#hide-controls').remove();
        //    };
        //});

        $scope.$on('user.fullEdit.hide', function (e, $modal) {
            if (typeof($modal.$scope.reload) !== 'undefined' && $modal.$scope.reload === false) return true;
            $scope.reloadPlayer();
        });
        $scope.reloadPlayer();
//var myOtherModal = $modal({scope: $scope, template: 'views/forms/boxer-full-edit-modal.html', show: false});
//    // Show when some event occurs (use $promise property to ensure the template has been loaded)
//$scope.showModal = function() {
//    $scope.content= 'cc';
//  myOtherModal.$promise.then(myOtherModal.show);
//};
    });
