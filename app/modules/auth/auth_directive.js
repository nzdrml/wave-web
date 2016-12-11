angular.module('AuthDirective', [])
    .directive('userRegistrationForm', function($q, $state, growl, Auth) {
        return {
            restrict: 'A',
            scope: {
            },
            templateUrl: 'modules/auth/tmpl/user_registration_form_tmpl.html',
            link: function (scope, element, attr) {
                scope.auth = Auth;

                scope.form = {
                    first_name: '',
                    last_name: '',
                    phone: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    company: 'Company'
                };

                scope.register = function(){
                    Auth.isSending = true;

                    console.log(scope.form, Auth.isSending);

                    Auth.logout();
                    Auth.register(scope.form)
                        .then(function (response) {
                            growl.success("Successfully Registered! Redirecting to login in...", {
                                ttl: 3000,
                                disableCountDown: false
                            });
                            return $q.delay(3000);
                        })
                        .then(function(){
                            scope.resetForm();
                            return $state.go("login");
                        })
                        .catch(function (err) {
                            console.log(err);
                            return growl.error("Registration Failed");
                        })
                        .finally(function () {
                            Auth.isSending = false;
                        });
                };

                scope.resetForm = function(){
                    scope.form = {
                        first_name: '',
                        last_name: '',
                        phone: '',
                        email: '',
                        password: '',
                        password_confirmation: '',
                        company: 'Company'
                    };
                };
            }
        }
    }).directive('userLoginForm', function($q, $state, growl, Auth) {
        return {
            restrict: 'A',
            scope: {
            },
            templateUrl: 'modules/auth/tmpl/user_login_form_tmpl.html',
            link: function (scope, element, attr) {
                scope.auth = Auth;

                scope.form = {
                    email: '',
                    password: '',
                    rememberMe: false
                };

                scope.login = function(){
                    Auth.isSending = true;

                    Auth.logout();
                    Auth.login(scope.form)
                        .then(function (response) {
                            // growl.info("Successfully logged in! Redirecting in ", {
                            //     ttl: 3000,
                            //     disableCountDown: false
                            // });
                            return $q.delay(500);
                        })
                        .then(function(){
                            return $state.go("main.bookings");
                        })
                        .catch(function (err) {
                            return growl.error("Login Failed");
                        })
                        .finally(function () {
                            Auth.isSending = false;
                        });
                };

                scope.resetForm = function(){
                    scope.form = {
                        email: '',
                        password: '',
                        rememberMe: false
                    };
                };
            }
        }
    });