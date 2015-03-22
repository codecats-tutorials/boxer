'use strict';

/**
 * @ngdoc service
 * @name projApp.event
 * @description
 * # event
 * Service in the projApp.
 */
angular.module('projApp')
  .factory('Event', function (RestResource) {
    var Event = RestResource('/events/:id', {id: '@id'}, {
    });

    angular.extend(Event.prototype, {
        'id'            : null,
        'title'         : null,
        'description'   : null,
        'allDay'        : null,
        'start'         : null,
        'end'           : null,
        'reminder'      : null
    });

    return Event;
  });
