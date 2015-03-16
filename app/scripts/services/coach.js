'use strict';

/**
 * @ngdoc service
 * @name projApp.coach
 * @description
 * # coach
 * Service in the projApp.
 */
angular.module('projApp')
  .factory('Coach', function (RestResource) {
      var Coach = RestResource('/coaches/:id', {id: '@id'}, {
        list:{
            isArray: true, method: 'GET',
            transformResponse: function (data, headers) {
                return data.data;
            }}
      });

      angular.extend(Coach.prototype, {
        'id'      : null,
        'name'    : null,
        'surname' : null,
        'players' : []
      });

      return Coach;
  });
