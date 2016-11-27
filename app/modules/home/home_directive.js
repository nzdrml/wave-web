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
    })
    // <div form-register register="register.register()" ng-model="register.form"></div>
    .directive('formRegister', function(){
        return {
            restrict: 'A',
            scope: {
                form : "=ngModel",
                register: '&'
            },
            templateUrl: 'modules/templates/form-register.html',
            link: function(scope, element, attr){

                scope.form = {
                    user: {},
                    home: {},
                    work: {}
                };

                //jQuery time
                var current_fs, next_fs, previous_fs; //fieldsets
                var left, opacity, scale; //fieldset properties which we will animate
                var animating; //flag to prevent quick multi-click glitches

                jQuery(".next").click(function(){
                    if(animating) return false;
                    animating = true;

                    current_fs = jQuery(this).parent();
                    next_fs = jQuery(this).parent().next();

                    //activate next step on progressbar using the index of next_fs
                    jQuery("#progressbar li").eq(jQuery("fieldset").index(next_fs)).addClass("active");

                    //show the next fieldset
                    next_fs.show();
                    //hide the current fieldset with style
                    current_fs.animate({opacity: 0}, {
                        step: function(now, mx) {
                            //as the opacity of current_fs reduces to 0 - stored in "now"
                            //1. scale current_fs down to 80%
                            scale = 1 - (1 - now) * 0.2;
                            //2. bring next_fs from the right(50%)
                            left = (now * 50)+"%";
                            //3. increase opacity of next_fs to 1 as it moves in
                            opacity = 1 - now;
                            current_fs.css({'transform': 'scale('+scale+')'});
                            next_fs.css({'left': left, 'opacity': opacity});
                        },
                        duration: 800,
                        complete: function(){
                            current_fs.hide();
                            animating = false;
                        },
                        //this comes from the custom easing plugin
                        easing: 'easeInOutBack'
                    });
                });

                jQuery(".previous").click(function(){
                    if(animating) return false;
                    animating = true;

                    current_fs = jQuery(this).parent();
                    previous_fs = jQuery(this).parent().prev();

                    //de-activate current step on progressbar
                    jQuery("#progressbar li").eq(jQuery("fieldset").index(current_fs)).removeClass("active");

                    //show the previous fieldset
                    previous_fs.show();
                    //hide the current fieldset with style
                    current_fs.animate({opacity: 0}, {
                        step: function(now, mx) {
                            //as the opacity of current_fs reduces to 0 - stored in "now"
                            //1. scale previous_fs from 80% to 100%
                            scale = 0.8 + (1 - now) * 0.2;
                            //2. take current_fs to the right(50%) - from 0%
                            left = ((1-now) * 50)+"%";
                            //3. increase opacity of previous_fs to 1 as it moves in
                            opacity = 1 - now;
                            current_fs.css({'left': left});
                            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
                        },
                        duration: 800,
                        complete: function(){
                            current_fs.hide();
                            animating = false;
                        },
                        //this comes from the custom easing plugin
                        easing: 'easeInOutBack'
                    });
                });

                jQuery(".submit").click(function(){
                    return false;
                })

            }
        };
    });