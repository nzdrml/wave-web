'use strict';

angular.module("home", ["home-directive"])
    .config(function ($stateProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "modules/home/home.html",
                controller: "HomeCtrl as home"
            });
    })
    .controller("HomeCtrl", function ($http, uiGmapGoogleMapApi, growl) {
        var vm = this;

        vm.isSending = false;

        vm.map = {center: {latitude: 14.559918, longitude: 121.019780}, zoom: 15};
        uiGmapGoogleMapApi.then(function(maps) {

            vm.marker = {
                id: 0,
                coords: {
                    latitude: 14.559918,
                    longitude: 121.019780
                }
            }
        });


        vm.carousel = {
            template: "modules/templates/home-carousel.html",
            slides: [
                {
                    id: 0,
                    image: "img/c1.jpg",
                    caption: 'Wave takes care of your ride to work and back home.',
                },
                {
                    id: 1,
                    image: "img/c2.jpg",
                    caption: 'We provide peace of mind for your daily commute.',
                },
                {
                    id: 2,
                    image: "img/c3.jpg",
                    caption: 'Travel safely for a fixed price. Enjoy pre-secured, scheduled rides.'
                }
            ],
            myInterval: 3000,
            noWrapSlides: false,
            active: 0,
        };

        jQuery("#waveNav").affix({
            offset: {
                top: function () {
                    return jQuery("#wrap").outerHeight() - jQuery("#waveNav").outerHeight();
                }
            }
        });

        jQuery('#nvu li a').bind('click', function(event) {
            var anchor = jQuery(this);
            jQuery('html, body').stop().animate({
                scrollTop: (jQuery(anchor.attr('href')).offset().top - 50)
            }, 500);
            event.preventDefault();
        });

        vm.submitContact = function () {
            console.log("Sending", vm.form);
            vm.isSending = true;

            growl.info("Sending your message...");

            $http({
                method: 'POST',
                url: '/send.php',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: vm.form
            })
                .then(function (res) {
                    return growl.success("Message sent. Thank you!");
                })
                .catch(function (err) {
                    return growl.error("Message sending failed. Please try again in a while.");
                })
                .finally(function(){
                    vm.isSending = false;
                });
        };
    });