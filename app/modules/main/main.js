'use strict';

angular.module('main', [])
    .run(function($rootScope, $http, $location, Auth) {
        // keep user logged in after page refresh
    })
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: 'modules/main/main.html',
                controller: 'MainCtrl as main',
                onEnter: function($state, Auth){
                    return Auth.isAuthenticated() ? Auth.setHeaders() : $state.go("login");
                },
            });
    })
    .controller('MainCtrl', function($ocLazyLoad, $state, Auth){
        var vm = this;
        vm.user = Auth.getUser();

        vm.logout = function(){
            Auth.logout();
            $state.go("login");
        };

        $ocLazyLoad.load('AdminModule', {
            rerun: true,
            reconfig: true
        });
    });