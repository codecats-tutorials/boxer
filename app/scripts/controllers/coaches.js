'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:CoachesCtrl
 * @description
 * # CoachesCtrl
 * Controller of the projApp
 */
angular.module('projApp').controller('CoachesCtrl', function (
    $scope, Coach, Players, $rootScope, $modal
  ) {
    var viewport  = angular.element('body'),
        coaches   = null;
    $scope.acl = $rootScope.acl;
    $scope.playersAll = Players.query();
    viewport.addClass('loading');
    $scope.template = [];

    $scope.coachPaginator = {};
    $scope.coachPaginator.totalItems = 0;
    $scope.coachPaginator.currentPage = 1;

    $scope.coachPaginator.pageChanged = function () {
      viewport.addClass('loading');
      coaches = Coach.list({page: $scope.coachPaginator.currentPage}, function () {
        $scope.coaches = coaches;
        Coach.count(function (count) {
          $scope.coachPaginator.totalItems = count;
        });
        viewport.removeClass('loading');
      });
    };

    coaches = Coach.list({page: $scope.coachPaginator.currentPage}, function () {
      $scope.coaches = coaches;
      Coach.count(function (count) {
        $scope.coachPaginator.totalItems = count;
      });
      viewport.removeClass('loading');
    });

    $scope.editRow = function ($event, id) {
        if ( ! $scope.acl.resources.BOXERS) return;
        if (angular.element($event.target).is('button,a')) return;
        $scope.template[id] = {
          coach: {
            name      : {url: 'views/coach/fields/name.html'},
            surname   : {url: 'views/coach/fields/surname.html'},
            players   : {url: 'views/coach/fields/players.html'}
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
      $scope.description = 'Usunąć profil : ' + coach.name + ' ' + coach.surname;
      $scope.coach = coach;
      $scope.coachIndex = index;
      $modal({
          show: true, prefixEvent: "coach.delete",
          scope: $scope, contentTemplate: 'views/confirm/modal.html'
      });

    };
    $scope.mouseOver = function ($event) {
      if ($scope.acl.resources.BOXERS) {
        angular.element($event.currentTarget).css({cursor:'pointer'});
      } else {
        angular.element($event.currentTarget).css({cursor:'auto'});
      }
    };
    $scope.$on('coach.delete.show', function(e, $modal){
      $modal.$scope.action = function () {
        $modal.$scope.$hide();

        viewport.addClass('loading');
        $scope.coach.$delete(function () {
          //todo: check if error
          $scope.editRowDismiss(e, $scope.coachIndex);
          $scope.coaches.splice($scope.coachIndex, 1);
          viewport.removeClass('loading');
        });
      }
    });
  });
