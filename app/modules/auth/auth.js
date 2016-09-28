/**
 * Created by mark5 on 24/07/2016.
 */

angular.module("auth", ["AuthService", "home-directive"])
    .config(function ($stateProvider) {
        $stateProvider
            .state("register", {
                url: "/register",
                templateUrl: "modules/auth/register.html",
                controller: "RegisterCtrl as register"
            })
            .state("login", {
                url: "/login",
                templateUrl: "modules/auth/login.html",
                controller: "LoginCtrl as login"
            })
    })
    .controller("RegisterCtrl", function ($q, $scope, $state, $ocLazyLoad, Restangular, growl, Auth) {
        var vm = this;

        vm.form = {
            company: "NULL"
        };

        vm.isPosting = false;

        vm.register = function () {
            console.log(vm.form);

            // vm.isPosting = true;
            //
            // Auth.requestToken()
            //     .then(function (accessData) {
            //         console.log(accessData);
            //         return Restangular.all('users').post({user: vm.form}, null, {
            //             Authorization: "Bearer " + accessData
            //         });
            //     })
            //     .then(function (response) {
            //         growl.success("Successfully Registered! Redirecting to login in...", {
            //             ttl: 3000,
            //             disableCountDown: false
            //         });
            //         return $q.delay(3000);
            //     })
            //     .then(function(){
            //         vm.form = {};
            //         return $state.go("login");
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //         return growl.error("Registration Failed");
            //     })
            //     .finally(function () {
            //         vm.isPosting = false;
            //     });
        };

        $scope.$watchGroup(['vm.form.password', 'vm.form.password_confirmation'], function () {

            if (vm.form.password === vm.form.password_confirmation) {

            }
        })
    })
    .controller("LoginCtrl", function ($q, $state, $window, $scope, Restangular, growl, Auth) {
        var vm = this;

        vm.isSending = false;

        if( Auth.isAuthenticated() ){
            Auth.logout();
            $window.location.reload();
        }

        vm.login = function() {
            console.log(vm.form);

            // vm.isSending = true;
            Auth.logout();
            Auth.login(vm.form)
                .then(function (response) {
                    growl.info("Successfully logged in! Redirecting in ", {
                        ttl: 3000,
                        disableCountDown: false
                    });
                    return $q.delay(3000);
                })
                .then(function(){
                    return $state.go("main.bookings");
                })
                .catch(function (err) {
                    return growl.error("Login Failed");
                })
                .finally(function () {
                    vm.isSending = false;
                });
        };
    });