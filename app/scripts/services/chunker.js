'use strict';

/**
 * @ngdoc service
 * @name projApp.chunker
 * @description
 * # chunker
 * Service in the projApp.
 */
angular.module('projApp')
  .service('chunker', function () {
      return {
        getChunks: function chunks(arr, size) {
          if (typeof size === 'undefined') size = 3;
          var newArr = [];
          for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
          }
          return newArr;
        }
      }

    // AngularJS will instantiate a singleton by calling "new" on this function
  });
