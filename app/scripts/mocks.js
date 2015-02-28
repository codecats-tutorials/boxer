'use strict';

/**
 * @ngdoc overview
 * @name projApp
 * @description
 * # projApp
 *
 * Main module of the application.
 */
angular.module('projApp')
  .constant('Config', {
    useMocks:              true,
    viewDir:               'views/',
    API: {
      protocol:           'http',
      host:               'localhost',
      port:               '9000',
      path:               '/api',
      fakeDelay:          500
    }
  })
  .config(function ($httpProvider, Config) {
    if(!Config.useMocks) return;

    $httpProvider.interceptors.push(["$q", "$timeout", "Config", function ($q, $timeout, Config) {
      return {
        'request': function (config) {
          console.log('Requesting: ' + config.url, config);
          return config;
        },
        'response': function (response) {
          var deferred = $q.defer();

          if(response.config.url.indexOf(Config.viewDir) == 0) return response; //Let through views immideately

          //Fake delay on response from APIs and other urls
          console.log('Delaying response with ' + Config.API.fakeDelay + 'ms');
          $timeout(function () {
            deferred.resolve(response);
          }, Config.API.fakeDelay);

          return deferred.promise;
        }

      }
    }]);

  })
  .factory('APIBase', function (Config) {
    return (Config.API.protocol + '://' + Config.API.host + ':' + Config.API.port  + Config.API.path + '/');
  })
  .run(function run ($http, $cookies, $rootScope, $httpBackend, Config) {
    function regEsc(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    //MOCKING
    //Escape string to be able to use it in a regular expression

    $httpBackend.whenGET( RegExp(regEsc('views/')) ).passThrough();
    $httpBackend.whenGET( RegExp(regEsc('players')) ).respond(function(method, url, data, headers) {
      return [200, [
        {
          name: 'Wladimir',
          surname: 'Klitschko',
          champion: ['IBF', 'WBA'],
          avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTd0CPzV7QBK5hhN2WT9YTdeqmnml6UT5OSDKC3YGqqXI5cnWqK'
        },
                  {
          name: 'Wladimir',
          surname: 'Klitschko',
          champion: ['IBF', 'WBA'],
          avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTd0CPzV7QBK5hhN2WT9YTdeqmnml6UT5OSDKC3YGqqXI5cnWqK'
        },
        {
          name: 'Deontay',
          surname: 'Wilder',
          champion: 'WBC',
          avatar: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR776lGonUnD4G5CyN1tmLbEc6u4dWEz2sU1oEsngr9wK6YZUp4'
        },
        {
          name: 'Deontay2',
          surname: 'Wilder',
          champion: null,
          avatar: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR776lGonUnD4G5CyN1tmLbEc6u4dWEz2sU1oEsngr9wK6YZUp4'
        },
        {
          name: 'Deontay3',
          surname: 'Wilder',
          avatar: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR776lGonUnD4G5CyN1tmLbEc6u4dWEz2sU1oEsngr9wK6YZUp4'
        }
      ], {/*headers*/}];
    });
    $httpBackend.whenGET( RegExp(regEsc('acl'))).respond(function () {
      return [200, [{'resources': ['BOXERS']}], {}]
    });
    $httpBackend.whenGET( RegExp(regEsc('organizations'))).respond(function () {
      return [200, [{'name': 'WBA', 'available': true}, {'name': 'WBC', 'available': false}, {'name': 'IBF', 'available': true}], {}]
    });
    //$httpBackend.whenPOST( RegExp(regEsc('players'))).passThrough();
    $httpBackend.whenPOST( RegExp(regEsc('players'))).respond(function () {
      var data    = arguments[2],
          player  = JSON.parse(data);
      player.errors = {};
      if (player.name.length > 10) {
        player.errors['name'] = ['too long!'];
      }
      if (angular.equals({}, player.errors)) player.id = 666;
      return [200, player, {}]
    });
  });
