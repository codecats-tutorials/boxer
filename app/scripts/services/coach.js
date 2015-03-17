'use strict';

/**
 * @ngdoc service
 * @name projApp.coach
 * @description
 * # coach
 * Service in the projApp.
 */
angular.module('projApp')
  .factory('Coach', function (RestResource, $http) {
    var Coach = RestResource('/coaches/:id', {id: '@id'}, {
        list : {
            isArray             : true,
            method              : 'GET',
            transformResponse   : function (data, headers) {
                for (var i in data.data) {
                    for (var j in data.data[i]['players']) {
                        if (typeof(data.data[i]['selectedPlayers']) === 'undefined') {
                            data.data[i]['selectedPlayers'] = [];
                        }
                        data.data[i]['selectedPlayers'][j] = data.data[i]['players'][j].id
                    }
                }

                return data.data;
            }
        }
    });

    angular.extend(Coach.prototype, {
        'id'      : null,
        'name'    : null,
        'surname' : null,
        'players' : [],
        'selectedPlayers': []
    });
    Coach.count = function (cb) {
        $http.get('/coaches?count=true').then(function (response) {
          cb(response.data.count);
        });
    };

    return Coach;
  });
