'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:PlayerviewCtrl
 * @description
 * # PlayerviewCtrl
 * Controller of the projApp
 */
angular.module('projApp')
    .controller('PlayerViewCtrl', function ($scope, $routeParams, Players, acl, $modal) {
        $scope.acl      = acl;
        $scope.template = {};
        $scope.player   = Players.newInstance();
        $scope.divisions = [
            { label: 'Ciężka', value: 1 },
            { label: 'Pół ciężka', value: 2 }
        ];
        $scope.reloadPlayer = function () {
            $scope.player.$get({id: $routeParams.id}, function () {
                $scope.$root.activeTab += ' ' + $scope.player.name + ' ' + $scope.player.surname;
                $scope.player.division = $scope.divisions[$scope.player.division.value - 1];
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
        $scope.$on('user.delete.show', function(e, $modal){
            $modal.$scope.action = function () {
                $modal.$scope.$hide();
                $scope.player.$delete();
            }
        });
        $scope.hideControls = function () {
            $scope.acl.resources.BOXERS = ! $scope.acl.resources.BOXERS;
        };
        $scope.fullEditView = function () {
            $modal({
                scope: $scope, template: 'views/forms/boxer-full-edit-modal.html', show: true,
                prefixEvent: "user.fullEdit"
            });
        };
        acl.afterInit = function () {
            if ( ! acl.hasAccessResource('BOXERS')) {
                angular.element('#hide-controls').remove();
            }
        };
        $scope.$on('user.fullEdit.hide', function (e, $modal) {
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
