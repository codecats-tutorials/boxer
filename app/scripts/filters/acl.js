'use strict';

/**
 * @ngdoc filter
 * @name projApp.filter:acl
 * @function
 * @description
 * # acl
 * Filter in the projApp.
 */
angular.module('projApp')
  .filter('acl', function (acl) {
    return function (input) {
      return acl.hasAccessResource(input);
    };
  });
