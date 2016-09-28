'use strict';

angular.module("home-directive", [])
    .directive('homeTimeline', function(){
        return {
            restrict: 'A',
            templateUrl: "modules/templates/home-timeline.html",
            link: function(scope, element, attr) {
                var d1 = function () {
                    jQuery('#i1').hide().html('<img src="img/icons/h1.png" />').fadeIn("slow");
                    jQuery('#d1,#l1').fadeTo(1000, 1);
                    jQuery('#d2 p,#d3 p').fadeTo(1000, 0);
                    jQuery('#d3 h2, #d2 h2').fadeTo(1000, 0.5);
                    jQuery('#l2,#dd1').fadeTo(1000, 1);
                    jQuery('#l2,#l3').removeClass('blue');
                    jQuery('#dd2,#dd1').removeClass('dividerBlue');
                    jQuery('#l2,#dd1,#dd2,#l3').addClass('grey');
                    jQuery('#l2,#dd1,#dd2,#l3').fadeTo(1000, 0.5);

                };

                var d2 = function () {
                    jQuery('#i1').hide().html('<img src="img/icons/h2.png" />').fadeIn("slow");
                    jQuery('#d2 h2, #d2 p, #d2').fadeTo(1000, 1);
                    jQuery('#d1').fadeTo(1000, 0.5);
                    jQuery('#d3 p').fadeTo(1000, 0);
                    jQuery('#d3 h2').fadeTo(1000, 0.5);
                    jQuery('#l2,#dd1').removeClass('grey');
                    jQuery('#dd1').addClass('dividerBlue');
                    jQuery('#l2').addClass('blue', 1500);
                    jQuery('#l2').fadeTo(1500, 1);
                    jQuery('#l1,#dd1,#l3,#dd2').fadeTo(1000, 0.5);
                    jQuery('#l3').removeClass('blue');
                    jQuery('#dd2').removeClass('dividerBlue');
                    jQuery('#dd2,#l3').addClass('grey');

                };

                var d3 = function () {
                    jQuery('#i1').hide().html('<img src="img/icons/h3.png" />').fadeIn("slow");
                    jQuery('#d3 p, #d3 h2').fadeTo(1000, 1);
                    jQuery('#d2 p').fadeTo(1000, 0.5);
                    jQuery('#d1, #d2').fadeTo(1000, 0.5);
                    jQuery('#l2,#dd1,#l3,#dd2').removeClass('grey');
                    jQuery('#dd1').addClass('dividerBlue');
                    jQuery('#l2').addClass('blue', 1500);
                    jQuery('#dd2').addClass('dividerBlue');
                    jQuery('#l3').addClass('blue', 1500);
                    jQuery('#l3').fadeTo(1500, 1);
                    jQuery('#l1,#dd1,#dd2,#l2').fadeTo(1000, 0.5);
                };

                jQuery('#d1').click(d1);

                jQuery('#d2').click(d2);

                jQuery('#d3').click(d3);

                jQuery('#l1').click(d1);
                jQuery('#l2').click(d2);
                jQuery('#l3').click(d3);

                var interval = setInterval(function () {
                    if (jQuery('#d1').css("opacity") == 1) {
                        d2();
                    }
                    ;
                }, 5000);

                var interval2 = setInterval(function () {
                    if (jQuery('#d2').css("opacity") == 1) {
                        d3();
                    }
                    ;
                }, 10000);

                var interval = setInterval(function () {
                    if (jQuery('#d3').css("opacity") == 1) {
                        d1();
                    }
                    ;
                }, 15000);
            }
        }
    });