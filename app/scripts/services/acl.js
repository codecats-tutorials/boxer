'use strict';

/**
 * @ngdoc service
 * @name projApp.acl
 * @description
 * # acl
 * Service in the projApp.
 */
angular.module('projApp')
    .service('acl', function ($http) {
        var me = this;
        this.resourceBin = [];
        this.resources = {};
        this.actionBin = [];
        this.user = null;
        this.afterInit = function () {};
        this.hasAccessResource = function (resource) {
            for (var i in this.resourceBin) {
              if (this.resourceBin[i] === resource) {
                return true;
              }
            }
            return false;
        };
        this.setAccessResource = function (resource) {
        if ( ! this.hasAccessResource(resource)) {
          this.resourceBin.push(resource);
        }
        };
        this.removeAccessResource = function () {

        };
        this.reload = function (callback) {
            $http.get('/acl').then(function (data) {
                me.resourceBin = data.data;
                for (var i in me.resourceBin) {
                    me.resources[me.resourceBin[i]] = true;
                }
                if (typeof(callback) === 'function') {
                    callback();
                }
                me.afterInit();
            });
        };
        this.reload();
  });
