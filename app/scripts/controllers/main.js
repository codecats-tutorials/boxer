'use strict';

/**
 * @ngdoc function
 * @name projApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projApp
 */
angular.module('projApp')
  .controller('MainCtrl', function ($scope, $timeout) {

function isScrolledIntoView(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
$(window).on('DOMContentLoaded load resize scroll', function () {
      var sec1 = $('#sec-1');
  setInterval(function () {
    console.log('a')
    if (isScrolledIntoView('#sec-1')) {
      alert('a')
    }
  }, 500)
});
    //setTimeout(function () {
    //  var sec1 = angular.element('#sec-1');
    //  sec1.inViewport(function () {
    //    sec1.removeClass('animated bounce');
    //    sec1.addClass('animated bounce');
    //    //sec1.html ='seee';
    //    //sec1.hide();
    //    //sec1.show();
    //
    //
    //  });
    //}, 3000);
  });
