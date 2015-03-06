'use strict';

/**
 * @ngdoc service
 * @name projApp.User
 * @description
 * # User
 * Service in the projApp.
 */
angular.module('projApp')
  .service('User', function ($resource) {
        var Users = $resource('/users/:id', {id: '@id'}, {
            'save'        : {method: 'POST'},
            'query'       : {method: 'GET', isArray: true},
            'update'      : {method: 'PUT'},
            'delete'      : {method: 'DELETE'},

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
