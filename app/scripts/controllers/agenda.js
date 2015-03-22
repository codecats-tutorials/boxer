'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:AgendaCtrl
 * @description
 * # AgendaCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('AgendaCtrl', function ($scope, uiCalendarConfig, $alert, Event) {
    var viewport = angular.element('body');
    $scope.event = null;
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      viewport.addClass('loading');
      $scope.events = Event.query({start: start, end: end, timezone: timezone}, function () {
        viewport.removeClass('loading');
        callback($scope.events);
      });
    };

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: function (event, jsEvent, view) {
          $scope.event = event;
        },
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };
    $scope.uiConfig.calendar.dayNames = [
      "Poniedziałek", "Wtorek", "Sroda", "Czwartek", "Piątek", "Sobota", "Niedziela"
    ];
    $scope.uiConfig.calendar.dayNamesShort = ["Pn", "Wt", "Sr", "Czw", "Pt", "So", "N"];
    $scope.uiConfig.calendar.monthNames = [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień',
      'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];
    var months = [];
    //$scope.uiConfig.calendar.monthNamesShort = $scope.uiConfig.calendar.monthNames;
    for (var i in $scope.uiConfig.calendar.monthNames) {
      months[i] = $scope.uiConfig.calendar.monthNames[i].substr(0, 3);
    }
    $scope.uiConfig.calendar.monthNamesShort = months;

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventsF];


  });
