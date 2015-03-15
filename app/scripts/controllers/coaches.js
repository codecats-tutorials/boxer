'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:CoachesCtrl
 * @description
 * # CoachesCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('CoachesCtrl', function ($scope) {
    $scope.template = [];
    $scope.coaches = [
      {name: 'Van Balan', surname: 'Eric', players: [{name: 'Wlad', surname: 'Klitshko'}]},
      {name: 'Van Balan1', surname: 'Eric1',
        players: [
          {name: 'Wlad2', surname: 'Klitshko2'},
          {name: 'Wlad3', surname: 'Klitshko3'}
        ]
      }
    ];
    $scope.editRow = function ($event, id) {
        if (angular.element($event.target).is('button,a')) return;
        $scope.template[id] = {
          coach: {
            name: {url: 'views/coach/fields/name.html'}
          }
        };

    };
    $scope.editRowDismiss = function ($event, id) {
      if ($scope.template[id]) {
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


  });
