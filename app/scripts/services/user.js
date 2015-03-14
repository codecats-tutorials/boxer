'use strict';

/**
 * @ngdoc service
 * @name projApp.User
 * @description
 * # User
 * Service in the projApp.
 */
angular.module('projApp')
  .service('User', function (RestResource) {
        var Users = RestResource('/users/:id', {id: '@id'}, {
            'getLogin'    : {method: 'GET', params: {id: 'login'}},
            'getLogout'   : {method: 'GET', params: {id: 'logout'}},
            'postLogin'   : {method: 'POST', params: {id: 'login'}}
        });

        angular.extend(Users.prototype, {
            'id'        : null,
            'email'     : null

        });

        return Users
  });
