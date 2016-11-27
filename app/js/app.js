'use strict';

angular.module('ridewaveApp', [
        'oc.lazyLoad',
        'ui.router',
        'ridewave.modules',
        'mwl.bluebird',
        'mwl.calendar',
        'ui.bootstrap',
        'ngAnimate',
        'uiGmapgoogle-maps',
        'angular-growl',
        'restangular',
        'ngSanitize',
        'ui.select',
        'angularUtils.directives.dirPagination',
        'ui.bootstrap.datetimepicker'
    ])
    .constant("config", {
        "api": "http://localhost:8080",
        "maps": {
            lat: 14.651447,
            lng: 121.049575
        }
    })
    .config(function ($httpProvider, $urlRouterProvider, $locationProvider, RestangularProvider, Bluebird) {
        RestangularProvider.setBaseUrl("http://128.199.232.120");
        $urlRouterProvider.otherwise('/');
        Bluebird.config({
           warnings: false
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .config(function(growlProvider) {
        growlProvider.globalTimeToLive(5000);
        growlProvider.globalDisableCountDown(true);
        growlProvider.globalPosition('bottom-right');
    })
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyB29LEu3yRnvx7pxzk_Li_NamRLzeBRCWc',
            v: '3.20',
            libraries: 'weather,geometry,visualization,places'
        });
    })
    .config(function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            modules: [{
                name: 'AdminModule',
                files: ['/js/adminlte.js', '/css/AdminLTE.css', '/css/skins/skin-blue.css']
            }]
        });
    });
