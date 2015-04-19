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
            transformResponse   : function (dataRaw, headers) {
                var data = JSON.parse(dataRaw);
                for (var i in data.data) {
                    //if already voted show this vote as rate
                    Coach._setRate(data.data[i]);
                    Coach._selectPlayers(data.data[i]);
                }

                return data.data;
            }
        },
        get: {
            transformResponse   : function (dataRaw, headers) {
                var data = JSON.parse(dataRaw);
                Coach._setRate(data)
                Coach._selectPlayers(data)
                return data;
            }
        },
        put: {
            transformResponse   : function (dataRaw, headers) {
                var data = JSON.parse(dataRaw);
                Coach._setRate(data)
                Coach._selectPlayers(data)
                return data;
            }

        },
        post: {
            transformResponse   : function (dataRaw, headers) {
                var data = JSON.parse(dataRaw);
                Coach._setRate(data)
                Coach._selectPlayers(data)
                return data;
            }

        }
    });

    angular.extend(Coach.prototype, {
        'id'      : null,
        'name'    : null,
        'surname' : null,
        'rate'    : null,
        'players' : [],
        'selectedPlayers': []
    });
    Coach.count = function (cb) {
        $http.get('/coaches?count=true').then(function (response) {
          cb(response.data.count);
        });
    };
    Coach._selectPlayers = function (data) {
        for (var j in data['players']) {
            if (typeof(data['selectedPlayers']) === 'undefined') {
                data['selectedPlayers'] = [];
            }
            //selectedPlayers for choice field
            data['selectedPlayers'][j] = data['players'][j].id
        }
    };
    Coach._setRate = function (data) {
        data['rate'] = (data['vote']) ? data['vote'] : data['rate'];
        data['percent'] = 100 * ( data['rate'] / Coach.RATE_MAX );
    };
    Coach.RATE_MAX = 5;

    return Coach;
  });
