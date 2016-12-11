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
                }
            });
    })
    .controller('MainCtrl', function($ocLazyLoad, $state, Auth){
        var vm = this;
        vm.user = Auth.getUser();

        vm.logout = function(){
            $state.go("logout");
        };

        $ocLazyLoad.load('AdminModule', {
            rerun: true,
            reconfig: true,
            cache: false
        });
    })
    .filter('padNum', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });;