/**
 * Created by mark5 on 24/07/2016.
 */

angular.module("auth", ["AuthService", "AuthDirective", "AddressService", "home-directive"])
    .config(function ($stateProvider) {
        $stateProvider
            .state("register", {
                url: "/register",
                templateUrl: "modules/auth/register.html",
                controller: "RegisterCtrl as register"
            })
            .state("verifyMobile", {
                url: "/verifyMobile",
                templateUrl: "modules/auth/verify_mobile.html",
                controller: "RegisterCtrl as registerCtrl"
            })
            .state("preferredLocations", {
                url: "/preferredLocations",
                templateUrl: "modules/auth/preferred_locations.html",
                controller: "RegisterCtrl as registerCtrl"
            })
            .state("login", {
                url: "/login",
                templateUrl: "modules/auth/login.html",
                controller: "LoginCtrl as loginCtrl"
            })
            .state("logout", {
                url: "/logout",
                templateUrl: "modules/auth/login.html",
                controller: "LoginCtrl as loginCtrl",
                onEnter: function($state, Auth){
                    Auth.logout();
                    return $state.go('login');
                }
            })
    })
    .controller("RegisterCtrl", function ($q, $scope, $state, $ocLazyLoad, Restangular, growl, Auth, Address) {
        var vm = this;

        vm.form = {};
        vm.isPosting = false;

        vm.verifyMobile = function(){

        };

        $scope.$watchGroup(['vm.form.password', 'vm.form.password_confirmation'], function () {

            if (vm.form.password === vm.form.password_confirmation) {

            }
        })
    })
    .controller("LoginCtrl", function ($q, $state, $window, $scope, Restangular, growl, Auth) {
        var vm = this;
    });