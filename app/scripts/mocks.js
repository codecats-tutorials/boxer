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
    $httpBackend.whenGET( RegExp(regEsc('players') + '$') ).respond(function(method, url, data, headers) {
      return [200, [
        {
          id: 'xe332e6h',
          name: 'Wladimir',
          surname: 'Klitschko',
          champion: ['IBF', 'WBA'],
          avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTd0CPzV7QBK5hhN2WT9YTdeqmnml6UT5OSDKC3YGqqXI5cnWqK'
        },
        {
          id: '23e32e9hs',
          name: 'Deontay',
          surname: 'Wilder',
          champion: 'WBC',
          avatar: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR776lGonUnD4G5CyN1tmLbEc6u4dWEz2sU1oEsngr9wK6YZUp4'
        },
        {
          id: 'lf1xd32e93s',
          name: 'Alexander',
          surname: 'Povietkin',
          champion: null,
          avatar: 'data:image/jpeg;base64,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'
        },
        {
          id: 'ni2fk124',
          name: 'Anthony',
          surname: 'Joshua',
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzydMEWa_k9srttz5WCSGGDicSpi6pXLM4pB4JoiTa1CWwdtQoDw'
        }
      ], {/*headers*/}];
    });
    $httpBackend.whenGET( RegExp(regEsc('acl'))).respond(function () {
      return [200, ['BOXERS'], {}]
    });
    $httpBackend.whenGET( RegExp(regEsc('organizations'))).respond(function () {
      return [200, [{'name': 'WBA', 'available': true}, {'name': 'WBC', 'available': false}, {'name': 'IBF', 'available': true}], {}]
    });
    //$httpBackend.whenPOST( RegExp(regEsc('players'))).passThrough();
    var playerFunc = function () {
      var data    = arguments[2],
          player  = JSON.parse(data);
      player.errors = {};
      if (player.name.length > 10) {
        player.errors['name'] = ['too long!'];
      }

      if (angular.equals({}, player.errors) && player.id === undefined) player.id = 666;
      return [200, player, {}]
    };
    $httpBackend.whenPOST( RegExp(regEsc('players'))).respond(playerFunc);
    $httpBackend.whenPUT( RegExp(regEsc('players'))).respond(playerFunc);
    $httpBackend.whenDELETE( RegExp(regEsc('players'))).respond(function () {
      return [200, {}, {}];
    });
    $httpBackend.whenGET( RegExp(regEsc('players/'))).respond(function () {
      var id = arguments[1].match('[0-9]')[0];
      return [200, {
        id: id, name: 'Joseph', surname: 'Parker', birthdate: '1992-01-09', division: { label: 'Ciężka', value: 1 },
        stance: 'Praworęczny', height: 193, reach: 193, country: 'New Zealand',
        avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRlTTDhOZ9bSoHA_3YccvSUJBYUC78mG-r5BXgskMCoO0vX2GGY',
        champion: null, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet varius lectus, sed consequat risus.',
        ratings: [{organization: 'WBA', value: 14}, {organization: 'WBC', value: 20}, {organization: 'IBF', value: 16}]
      }, {}];
    });
    $httpBackend.whenGET( RegExp(regEsc('/users/login'))).respond(function () {
      return [200, {email: '', isAuthenticated: false, id: null}, {}]
    });
    $httpBackend.whenPOST( RegExp(regEsc('/users/login'))).respond(function () {
      var date = JSON.parse(arguments[2]);
      if (date.email.length < 2) {
        return [200, {
          email: '', isAuthenticated: false, id: null, loginError: ['too long']
        }, {}]
      }
      return [200, {
        email: 'antonio.banderas@gmail.com', isAuthenticated: true, id: 54
      }, {}];
    });
    $httpBackend.whenGET( RegExp(regEsc('/users/logout'))).respond(function () {
      return [200, {email: '', isAuthenticated: false, id: null}, {}]
    });
    $httpBackend.whenGET(RegExp(regEsc('/coaches') + '.+page.+$')).respond(function () {
      var coaches = [
        {id:'134aaweb3', name: 'Van Balan', surname: 'Eric', rate: 4,
          players: [{id: 'lf1xd32e93s', name: 'Wlad', surname: 'Klitshko'}]
        },
        {id: 'abd32e93s', name: 'Van Balan1', surname: 'Eric1', rate: 2,
          players: [
            {id: 'xe332e6h', name: 'Wlad2', surname: 'Klitshko2'},
            {id: '23e32e9hs', name: 'Wlad3', surname: 'Klitshko3'}
          ]
        }
      ];
      return [200, {data: coaches}, {}];
    });
    $httpBackend.whenGET(RegExp(regEsc('/coaches') + '.+count=true$')).respond(function () {
      return [200, {count: 123}, {}];
    });
    $httpBackend.whenGET(RegExp(regEsc('/coaches/'))).respond(function () {
      return [200, {
        id: arguments[1].match('[a-zA-Z0-9]+$')[0], name: 'Eric', surname: 'Van Dalam', players: []
      }, {}];
    });
    $httpBackend.whenDELETE( RegExp(regEsc('/coaches/'))).respond(function () {
      return [200, {}, {}];
    });
    $httpBackend.whenPUT( RegExp(regEsc('/coaches/'))).respond(function () {
      return [200, {
        id:'32Dfi3r3w', name: 'updated', errors: {name: ['too long']}
      }, {}];
    });
    $httpBackend.whenPOST( RegExp(regEsc('/vote/coach/'))).respond(function () {
      return [200, {}, {}];
    });


    $httpBackend.whenGET( RegExp(regEsc('events'))).respond(function () {
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();
      if (arguments[1].indexOf('start') !== -1) m += 1;
      return [200, [
        //{title: 'All Day Event',start: new Date(y, m, 1)},
        {id: 'pf03s', title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        {id: 'oer2',title: 'Repeating Event', description: 'descr',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        {id: '9923scw',title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        {id: 'af32', title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        {id: 'n84l', title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: '#/agenda'}
      ], {}];
    });
    $httpBackend.whenPOST( RegExp(regEsc('events'))).respond(function () {
      var date = JSON.parse(arguments[2]);
      if (date.title.length < 2) {
        date.errors = {'title': ['too short']};
        return [200, date, {}];
      }
      date.id = '34if2xg0';
      return [200, date, {}];
    });
    $httpBackend.whenPUT( RegExp(regEsc('events'))).respond(function () {
      var date = JSON.parse(arguments[2]);
      if (date.title.length < 2) {
        date.errors = {'title': ['too short']};
        return [200, date, {}];
      }
      return [200, date, {}];
    });
    $httpBackend.whenGET( RegExp(regEsc('/'))).respond(function () {
      var data = [
        {
          player: {
            avatar: 'data:image/jpeg;base64,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',
            name: 'Wladimir',
            surname: 'Klitshko'
          },
          description:
            'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa' +
      'aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa'
        },
        {
          player: {
            avatar: 'data:image/jpeg;base64,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',
            name: 'Many',
            surname: 'Pacquiao'
          },
          description:
            'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb' +
      'bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb bbbb'

        },
        {
          player: {
            avatar: 'data:image/jpeg;base64,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',
            name: 'Wladimir',
            surname: 'Klitshko'
          },
          description:
            'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc' +
      'cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc cccc'

        },
        {
          player: {
            avatar: 'data:image/jpeg;base64,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',
            name: 'Wladimir',
            surname: 'Maywather'
          },
          description:
            'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd' +
      'dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd'

        }
      ];
      return [200, data, {}];
    });
  });
