'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:AgendaCtrl
 * @description
 * # AgendaCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('AgendaCtrl', function (
        $scope, $rootScope, uiCalendarConfig, $alert, Event, $timeout
  ) {
    var viewport = angular.element('body');
    $scope.events = [];
    $scope.acl = $rootScope.acl;
    $scope.event = null;
    $scope.start = null;
    $scope.end = null;
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      viewport.addClass('loading');
      $scope.start = start;
      $scope.end = end;
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
        eventRender: function () {console.log(arguments)}
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

    $scope.saveEvent = function (e) {
      var btn = angular.element(e.target);
      $scope.event.errors = null;
      btn.addClass('loading');
      $scope.event.$save(function (data) {
        $scope.event.errors = data.errors;
        btn.removeClass('loading');
        if (angular.equals($scope.event.errors, {}) || $scope.event.errors === null) {
          btn.addClass('loading');
          $scope.events = Event.query({start: $scope.start, end: $scope.end}, function () {
            btn.removeClass('loading');
            $timeout(function () {
              btn.closest('form').find('[rel-btn=cancel]').trigger('click');
            }, 1);
          });
        }
      });
    };
    $scope.addEvent = function (e) {
      $scope.event = new Event();
    };


  });
