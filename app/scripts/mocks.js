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
          avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUUEhQVFhUWGBgaGRcYFxgYFBgXGBcXFxcYFxYYHSggGholHRYUITEhJSksLi4uFx8zODMsNygtLiwBCgoKDg0OFxAQGywkHyQsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsNywsLP/AABEIAPcAzAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAwQFBgECBwj/xAA+EAABBAADBQYEBAUDAwUAAAABAAIDEQQSIQUxQVFhBhMicYGRBzKhsUJSwdEUI2Jy8ILC4SRTkhYzQ4Px/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAJREBAQACAgICAgEFAAAAAAAAAAECEQMhEjEEQTJRYRMUIjOR/9oADAMBAAIRAxEAPwDhqEIQCEIQCEIQCEIQCELICDCUjYXEAAk8ANT6BSGz9hTy5S2KTIa/mZHZAOLs1UQBrpyVuw2CjwjKpkjjp3oaWuyglxprgdbAFjl7RbpMitt7KYohpyE3rW8t3fM3e3eN4TlnYyRzczZYqoEglwOtaABpv5m+6ksXta6yF1NylosnKTVEHhVb9+iyzbDzG4kAuGjd2lmsuo1bROgqifJV3VvFEYnsVimtzNa2UDf3ThIQPIan0tQWIwzozT2uad1EEHTfvV4l2sajDKDaJLaAo/LppRrLWuv3TzD7WbIzJiAHR6BzDqCDdFpu2kHUEbrOnBPI8XNVklXLb3Y7Kwy4YlwOvdfM4DjkePnHHddHjRVNIVpZfStmmEIQpQEIQgEIQgEIQgEIQgEIQgEIQgEIQgFvGNVotmlB1rAY2OPBBjKBa1ubKSRZ1IB0a436KqYvFvdfEaiuQG70o7uqdw4how0DGiiY2nT2J9wU0LdddOmn+cQsPttJ0aN1qhzJ99P0T2PZ7gN2hPLflvQepTjCQ07TmrLHhMzhfygNA6cT6nT2S5NePi8lQfq4jUcjz5gt5IDKfvth0160NTyux6K6YzAxBgaKLrAHPV2v3+ire09mlmchpyCq6mta/wA4qJktnw2HGwdouDe6LszdKu9PxbxxG8eZ8jA9udmMY8SsDQJNSBej9S7edOBpP9nb64G/3J6/KtO2PyEEfLXuKH+5Wx6y6YZTpSEIQtmIQhCAQhCAQhCAQhCAQhCAQhCAQhCAW0e8WtVkILvO4ueGxgkNAADQTo0Dlw1SLWG9d/8Al0pLY0A7gSvlMbWgW5pNkhugNcLINdE/w+EZO1sjQCLouogO5mvfRc9undjxbxlY2Lsku8ZNDl/yrEzwVncK8tfol42jKA1RG09kTPNiQAeR/RU9ujGeM6S38Rh+L2+R0KUlw8EzdHNHXn7Lnm2MNI2g14kPEAZXDlQJtSfZvA4l7sptg5u/ZWuMVxztuqsknZZmTwnVu7UnS74nfRI9VTPiJIQxjargeZ1zEn1pOT2omjkLdxa8tJcDVgkEfQqG+I20O+lifpbowXAbg6y264WGgq2Eu3Pz5TV0qCEIW7jCEIQCEIQCyAsLIcgwhCEAhCEAhCEAhCEAshYWQg6h2ekY+ANcLGhDQLt1AXryo6KwYOXwZPy9KvjdKg9kJS+F7eLCKPQ3StmyWPa13eOJs6XvA5Llzmq9TivlxxJvmLdyMPtQg07d5JnLPqiNodvURr6TU3dOGYgHzC1wergQKH0TLuQWloNaVfEKrYnZ+Jw7s0UskgJ1bxvoOXkp1s3ruRa9r9me8xDnuDO7ecx08QcQLIIOhuyuR9qwBi5mj5WPLG8qZ4R9r9V1DBbWmDS2f5qGnQ7rK5HtbEd5PK8Gw57iD0s19KWvH7ri+TrUNEIQtXGEIQgEIQgEIQgEIQgEIQgEIQgEIQgFlYWQEF2+HrPBMf6m/Zys881BQ/w8w5GGe4jR0hrqGgA162PQqT2izRcuf5PT+P8A64GvtKg0CoqCet6kG4hrhVqGntG7SxuIYM0Tc2/dqQOYbxVei7UYlsmbvXBw9PSlcMVg5HD+Vv4I2fFir/nRNA/7ha0u6U7ffVXxs13GfJhlvcqM25tk/wAKZD/7jgGXutxuz5gWueKd7VYwF4ib8sVg9X/i9qr0UEtsJqOHmz8sghCFZkEIQgEIQgFlYQgEIQgEIQgEIWQEGFmlYdj9iMfihcGFlcOZAY30MhAPor1sT4RuhaJdohx5QxnT/wCyQfZvvwUWyLY423UcpwuGfI4MjY57jua0Fzj5AK8bD+Gc76diiIGflsOnd5NGjOOrjfQrqGAijhbkw8bIW8mNAJ/ud8zvUlKSm1jlzfp14/F1+SJkwbI42sjblYwZWjoOvEnUk8yVCY6PMKVhx8mlKEmFarF14zUVrERltg+qYPlIOimtrEEWOCgHGitIztP8LtuRm77p5jO1UjIHOIOttbvrORpfDTfSabIwneOsjT7rrnZVkQw7oZI43sebLHNBadANx8ik1L2rncvHp5mcddVhd17WfB7DzAybPd3Mm/uXkmJ3Rrj4mHzseS45tPYGJw7zHPBKxw3gsNeYI0I6g0uiWV51lntGoWSFhSgIQhAIQhAIQhAIQhAIQrR2G7KOxsuttgZrI8fRjf6j9BryuLdJktuoz2K7HvxrsxJZA0+J9ak/lZe89dwXZtiYKDBty4aGNnN5GaV3V0h8R46buQCWiw7I2NjiaGMYKa0aAD/NfNaFc+XJa7+Lhxk79pOPtFK07wfMJ2ztad0jG10/ZV5sW/U6njw6DotXNVJlY2vFx36LY2djpMzAGg8BuvoiVumiajDuyPkynJGC57uAAFk9TXAKkbX7dudbMM0Mb/3XC5CP6W/Kz6nTgrY4XJTk5cePpbsWOZHqa9lEY1lLnuNmc829xceZNn6qR7P7ReDkLiWncDrrwAPBWvDplPly3uJPGN39VBTRm/JXCHCd5pRaeIO//kLMvZonX6KsunRqZzcRmw2VS6DstpoVvUBs/Y+SifZTWHlIIrSlW+0+PWlqc18YDiEpF2rrQsPum+H2yXMyyC9N6i58Pqa3KfLXpn/TmX5xJ7SOCxY/6nCRSnUZnMaXgHfT6zD0KonaD4RYWZrnYCR8Mm8RSkuiOm4PPib5kuVpiFUpLC4gDerTkyZ5/Hw+nl7auzZcPK6KdhZIw0Wn7g8Qd4ITNejviB2Wj2jDbabiGDwP58cjj+Q/Qm+d+d8Vh3Rvcx4LXMJa5p0IINEHqt8cpk5M+O4kUIQrMwhCEAhCEDnZ+EdLIyNgtz3Bo8z+i9DbB2YzC4dkMe5o1PFzvxOPUrlHwswGad8xGkTaH9z9L9Gh3uutCXRYcuXenZ8fj68mz3pJzkJCQrF1xu6dP9h4QyvsgljTqPzHl5c/+VXMRKcwA1LjQG/7Jxie0pwxlYcroosvykDO9wGSJxo2HeKQ1rQI4UbYTdY8nJqaX3tFhu9wGJja0NuGWg0ggWx1VWl2vM0Edr1Ls54dAA9hZnaLa4gvGYah1ceC85v2QW4iWEEXG9zTeh8LiBoele66sXn5IjEsU72NwYfIOhtJ4zYzwLq/LVWP4bYECRxeQAGnfxvStVNVSO0pWwSxuDgW52hzeTZAW+lEX6KwVS5523xjQ94bu7wAa8G//q6RI0ENPMA/Rc/LHo/Cy6srRpHJD4gd2iwWUto1i7SkLKTyM2mrXBOInIpYJIUxmnyqT7xRe1YxWboik/lmHGFc8+L2wQcuMjGppstc9zH/AO0/6VbMNirKd4+ESwvjf8r2lp9RV/qrYZeNU5MJnNPO6wl8bhnRyPjf8zHFp82mikF2PLs0EIQgfd2OQSGJaBVJzSaTOsoOrfC7CVhc1ave4+gpo+xV5bEo/sTsswYOFrhTsgJB4F3io9dVN5Vx5/lXo8fWMhERJCaJOi5NJ5VVpDGFoHeuLgwhraedzQ6RrXE8hRIPRxUNJAJdp4aLuzHCA7Gvaap0jvCBpwaWxjn4nXvVpOyXhpkeS3M0soC3Brx83RwIa7pRUJs3GiKV7JGxgta4gsGVjGuLXOY1taM8DX2T8ziujjnTh57Ll0vc21o4mufK4NaNXPcQAAdxs+y4B2526yfHzTYfRji0B2oL6Y1pdXK2mvfiku2faJ2LloOJhjJEY4dXnmTwvgq8xpcaaLPRayMEhHtiVooPNLA21KBQe4Doa91rHsl53kD1SmP2G+KJspILXGtLscr5A8EtTMbfQbO6Z7Q43bvXUhd3c2so6Aey4v2G2Q+bFRmj3cbg57uArUNvmTQrzXap33RCw5b3p2/FmpaHLQlAetHOWenXKUCWYU0tLxu0VVqWLlHbXmqJ55NJ+hTp71CdotoxxxkPPzA0OJ/4TW2eXUMtksJpWVsFtVGwXbKOJhJhLnHRuYkN05hpBPv6FSGC+JkjGAPwcbhzOpPqW7t37rWcVvtyX5Mih/E/ZvdY0uA0la148/ld9W36qoLse1e0eB2iGtxWBe1zbyvikqiaugS3TQaHkq12t+HRhhdisG908DADI1wqaK+LhQD2X+IAVxFAldGM1NOXKy5WxQUIQpVO5zQVi+HGwP4nEh7x/KhpzuTnfgb7i/IdVWMSda5Ltnw+2aIMEyxTpBnd5uGg9BSpyZajXhw8slolxK0GI5qObKXnklJyeG4b+XmuPyepePxnbebEck6wsQjcDKPFoQD+Hqf6unBSnZvZ7WxsleLkeMw/pDhbR/dRFnna32jRJNAk+/DT1AIWnjXLefH0aY3F940ga3ofXj5LjPa/aswLoHgAbu8HzPYDo0n7810HHYswOJuydx/C5hG5U3tU6Gai0m+LSNR1DuPqtsa5c8Z9KJGwvdlap/A4NrBQ1J3n/OC02fgMmatep4DkFuwuvQUBvPEq9yMOPftJwMDd9EqXwkocC1wBB0IIBFeSr8btE7w2IIKxvbuw1jOlz2e2hlaGNZ/Ty40KABUuJhu4KuYDE5t3BSkMlaLPXbS5bSFoe5MJJ6Sf8UrUlOzLqlGzqMfMsNm6qjTcST5lyzau0v4iSRxJsatHAMG7/b7lXJ+2iJshBrStPDyIJ4HiqZ23wYilBjADXi6FDUHXcBzHutOPquP5Ftx6MDjxmtg5aHdoK3KybL2oX6OAIPCvsqNGU+wmKI3FdDz7Fl2mzu3ggUCVbPhttUtx7A51tnY6MtJsXWdtjdvbX+pc7dI5wPHipHs9IWyskB8THNc3zaQ4fUBBn4v9jmYDF3BXcygvDOMfiotr8t7vUcFQF6a+Imy8NisKMaQXDucvhr5JXsHeG+MQc94HMdF5v2nhDDK+JxsscW3wNGrHQ7/VIk52Ds12KxMcTd73C+jd7j6C16A7gCm7mt0AGm7nxXMvhZAGCScjxE5GnkBRdXma9ldpNoErn5bu6d3x8LJtKOY274pHFyAsc2/mBHuKUVJjuqY4jHdVnI6rN+1r2LtzPho3E05jQx4G8SRgMe2upFjoQjaO0sul0OB6bwVzbE4+SF7pYTYdXeM4OrQO6Orj0CVZ2jEo8JNj8J3tP6LedvNzx8bpL7a2mHAirad1HVruNdDyVRnjt2ic4mcuPnwWYY681a3Rhja3Iptf4Ui4J1IRQ6pHvGrN1euiOROIIlqJhe5P8HK29QoqZEpsqIghS7mlY2fI2x6KUxAAVNroWRhSBbSmYy21vLCzop2lBOJATd2IPLyUliMO3gmskAFKNlRweL3aqt9ssUHvbHxY0uP+ogfornPG29BquUYrHd5iXP4OcQP7flH6LTjm7tzc2Wpom1y3a6kk8UUArocdSUOKpYbiCCTdKP7ylgylQh6I7CYou2TCHEOtkmhoijJJQIO/lS8/9q5w/GTuG7vHC7u68N3x3K1/DjamJ/iI8Ox7u6eSHMJtrQfmkaPwkEg6b9x3qB+IWBEWPmDRQcQ8DkXC3D/yzKJ7W10m+xeJ/wCnyjg91/Q/qp5+JUB2Ew4OHe47+8P0a391JYo8lhnP8q9Dh645W82KpRuJxqaYmQ8EzfIeKtMUZch06Y8So3EhpdY0PMaH6IklJ3lMcVia0G9aTFz55rFs/DEfNebqbT+LiUjsl+eFkn9NHzGh+xUdj8UT4R8v3Wd3a0xskOMbjBuBTdjk0anrVOtJ3tsHpxDMkGx2nWGhFhVXxT2zsU62+YVjfKaVf2azxClPOBpZ1rpHHEOtLyYk0kJHa6JZ4toRaG/8SbWrpSTS2IRI3VEZRvjYv5T635He9EBcVXc8OywQVw+dlOI5Ej2K24fVcXyPo57zML48UMY53ytJ8gT9k0Y4ggjeFZdmY3NGb33r7b1pbqMcJMrqmUWyX6F/hB9T7J7FAxtU0XzOpWGYjKMriaG47/Q/usidv5gplTcZFt7DTMhcT4W/iJ40L3nkNTXW1UviJiO8xhf+ZjT5ZiXUfdbx4k3Q0bxPEjefIaeqgdrYzvZXvPE6eQ0H0CiTvaLrSY7M7YMbXRcCc30o/ZSOJ2iSqYx5BsaEKUbtIEaij9EuLTDlsmqfyYnim82JA1J/f2UZPjSd2g+qbEqZFcuTZ7Nj7+UV1P7JlawhSzt2s/ZyRxgkHAOFeoN/YJKZa9n8QGwy5j+JmnutZsW3qfT91SztrjlNRvEnBnTF+PHBp90Z5C3N3ZrXXWtBZ1UWLTORJRzlSGCk1sqtsxDvyp3Bj38GD1Puq3Grzmxi/wCyDZvkpfEHSlQMN2rnYKbFHXm7d1Sn/rKe7MMZ9XWqXjyaf3GC4PhO8LeRvhCq8Pbkf/JA8f2uDvoaUh/6vwjx8zmnk5hH1FhRcMv0tjzY37LTT0U2ftGiNeay/HwvHgkYfIhRhwxc7Tco1+17lL6PsVtTTSzp9VzTaB/mvPNzj7m/1XQ8VhA1qoG1mVK/z/Ra8X25Of6M04wmJLDY3HeE3QtnMnGSB4sH04hKRxKABW5nd+Z3uVGlvJKY7GgNLWnU6E8godCFKLdhCEIgIQhALIWFvCLI80D9raAGbqfP/j9EnlC2Kw4/5/nogsHYfBiTFszCwwF5HkKF+pCveDx+IkxkxzyMhY3uwCXCI18xF6E21xzcq4KofD5n82R39LR11df+1K7N7QzTYiITTOMRkzZCfBrq1tcGXlFblxcuNyzy/iOjCyYwbT7NyipG92I5pX5fEBkBe7uw/gwkUMu8GgQCaTKXYc4nbBkuV25gc1xo7rLT4dNda01UzKZcNHjGy2YzZicfxyPdoW3vd+J3IsPMW57aTFkss7DlM0UbGOGhF5u8IPDwsa3/AFq2PJlvX/FbhPaAn2DiGluZgaQ8sGaSJmZwOUhhc8Z9dLbYQNj4gBxMMnhcWu8DtHcjpv1HuFcNrYjDyzYN0jJHtdCTE6M28PaQfkOjjdXd7qpQjsfPLioYJnOcG4hrwXxiN7gMuUuaAPwt0vmddynHlysRcMYrOMw7mUHsez+9pbpx+YBaOYNar/ArRtLaz24uaJpNPxEVEGg0N8Dq8/Du/L1S+35hDM6V8LJA85WZmtyMaGAnUAgyF5caOoaP6lect66R/Tn7UzD4MSODczWF10TeUu4N8INEnTlzpKYKGfMWwCXOASWxhziKPFrQSRqFLwwsDMIe7b3j3s8YLh8sg1y3lJIAs1xKlMZs9skcWKh/AHRy8w5rHNB9y3Xk5pTLl1U44K07b87CWyUSN4e3K4Hrur1URtObvXZqo1R5FOtrTvfK4vc550FuJcaG4WTuTMNWuMntTK30YubW9YS2J3+gSKsqEIQgEIQgEIQgEIQgE4wbbPkkAFJ4fDlg8QN768tavnSDV4WuVPe4bRo2aseXCyN2izFFe8NHI7/MnmoD3ZO33wMyRMh1+ZxjDnu37yTVC9KA9VHS4qyTTQSToAGtF/laNw6BYERJsAkczqlHAacxxO/2UTGS7TcqMXtSWTLneTkGVt8B5czx5pxtDb8k7Y2yZKjGVtDWqA111+UfVNn1wvdrrx4G+ay+HS6cBx0sdU8YjyqS2f2idEIwGROMRcY3uBc5hfqS0Z8pNgEZmmljAbeyYgYiRjpnAk/Pltx0snK69OFcuSicrSbaNBwPJKDCNs0Pqo8Mf0nyqSZtWJ+LEzw9je8EhFCR1hwfX4dL0vlW9Sz9qQSOxje9AE2QsD2ubTmMcAdAQCPDr+yqT4spIs1zu9PJaiJ2nXoNVW8UqZnYucWHzHB5HRvEeUvLZGHKQWE2LveHJPs3iHsfPhntcBMHeGjYe0FwJ6Ftj/xVUdhHigQLq6vX2SmB2jLC7PFLJG46WL1A4Gt43aVSreLcsWmfcrO12VPJ0e4exTYWNycYrFmR5fKWuc6rLWtbZ4mmgCzxNJuWjgVrj1JFLd0yxnzen7punWNb8p53+h/VNVZAQhCAQhCAQhCAQhCBxgH5XtNXXBTT9rCh4aI1oVlvj1pCECB2iDoWA+ZJ++iewitfmvnrpy1WEKBISOoDhXp9lGTzRl2Z7iTyDf1QhBucXGTvvkC3d9E2lxuc0SQBy3eyEIgvjGNawChZ1qtD1WmCZmdu1rUoQgWkbmPzFrm1zo+icYqMFvi3UPMdUIQIRtAc0v1sjK/mORHOk7GHDo6F2MwB0vjfRZQgZxbPBhzaPu6dqCOA38dK5JF2CYQzK424ag8OHrr90IRKJ2jWgHCx14JkhCkCEIQCEIQf/9k='
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

  });
