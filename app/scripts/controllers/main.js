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
    function checkVisible (elm, evalu) {
        evalu = evalu || "visible";
        var vpH = angular.element(window).height(), // Viewport Height
            st = angular.element(window).scrollTop(), // Scroll Top
            y = angular.element(elm).offset().top,
            elementHeight = angular.element(elm).height();

        if (evalu == "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
        if (evalu == "above") return ((y < (vpH + st)));
        if (evalu == "past") return ((y + elementHeight < (vpH + st)));
    }

    var secs = angular.element('[data=sec]'),
        text = angular.element('[data=text]');
    //var sec2 = angular.element('#sec-2');
    angular.element(window).scroll(function() {
        secs.each(function (i) {
            var sec = angular.element(this);
            if (checkVisible(sec, 'past')) {
                sec.addClass( (i%2) ? 'flipInY' : 'flipInX' );
            }
        });
        text.each(function (i) {
            var txt = angular.element(this);
            if (checkVisible(txt, 'past')) {
                txt.addClass( 'zoomInUp' );
            }
        });
    });
  });
