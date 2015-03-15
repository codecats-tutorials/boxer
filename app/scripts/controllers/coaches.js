'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:CoachesCtrl
 * @description
 * # CoachesCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('CoachesCtrl', function ($scope, Coach) {
    var viewport = angular.element('body');
    viewport.addClass('loading');
    $scope.template = [];
    $scope.coaches = Coach.query(function () {viewport.removeClass('loading')});
    $scope.editRow = function ($event, id) {
        if (angular.element($event.target).is('button,a')) return;
        $scope.template[id] = {
          coach: {
            name: {url: 'views/coach/fields/name.html'}
          }
        };

    };
    $scope.editRowDismiss = function ($event, id) {
      viewport.addClass('loading');
      if ($scope.template[id]) {
        $scope.coaches[id].$get(function () {viewport.removeClass('loading');});
        $scope.template[id] = null;
        var tplEditting = false;
        for (var i in $scope.template) {
          if ($scope.template[i] !== null) {
            tplEditting = true
          }
        }
        if (tplEditting === false) {
          $scope.template = [];
        }
      }
    };
    $scope.saveCoach = function ($event, coach) {
      viewport.addClass('loading');
      coach.$save(function () {
        //todo: check if error
        //$scope.editRowDismiss($event, index);
        viewport.removeClass('loading');
      });
    };
    $scope.removeCoach = function ($event, coach, index) {
      viewport.addClass('loading');
      coach.$delete(function () {
        //todo: check if error
        $scope.editRowDismiss($event, index);
        $scope.coaches.splice(index, 1);
        viewport.removeClass('loading');
      });
    };

  });
