/**
 * Created by t on 24.02.15.
 */

app
  .filter('capitalize', function() {
    return function(input, scope) {
      if (typeof scope !== 'undefined') {
        if (typeof input === 'undefined') {
          input = 'activeTab';
        }
        input = scope[input];
      }
      if ( ! input) return '';
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  })
  .filter('isArray', function () {
    return function (input) {
      return angular.isArray(input);
    }
  });
