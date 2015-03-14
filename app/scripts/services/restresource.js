'use strict';

/**
 * @ngdoc service
 * @name projApp.RestResource
 * @description
 * # RestResource
 * Service in the projApp.
 */
angular.module('projApp')
  .factory('RestResource', function ($resource) {
    return function( url, params, methods ) {
      var defaults = {
        'create': {method: 'POST'},
        'query' : {method: 'GET', isArray: true},
        'update': {method: 'PUT'},
        'delete': {method: 'DELETE'}
      };

      methods = angular.extend( defaults, methods );

      var resource = $resource( url, params, methods );

      resource.prototype.$save = function() {
        if ( ! this.id ) {
          return this.$create.apply(this, arguments);
        }
        else {
          return this.$update.apply(this, arguments);
        }
      };

      return resource;
    };
  });
