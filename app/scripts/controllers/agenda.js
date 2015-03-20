'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:AgendaCtrl
 * @description
 * # AgendaCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('AgendaCtrl', function ($scope, uiCalendarConfig, $alert) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */
    $scope.events = [
      //{title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [
        {title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']},
        {title: 'AF', start: new Date(date.getFullYear(), m+1, 29)}
      ];
      console.log("YYYUSU")
      callback(events);
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
        eventClick: function (date, jsEvent, view) {
          $alert({title:'a'})
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
