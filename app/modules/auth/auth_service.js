"use strict";

angular.module("AuthService", ['UserService'])
    .service("Auth", function($q, $http, growl, Restangular, User){
        var self = this;

        self.isSending = false;

        self.data = {
          userRegistrationForm: {}
        };

        self.requestToken = function () {
            var data = $.param({
                client_id: "2d01f866507b7e8755be57d11da36d8493dcba57245c09321078d7b4d6d74198",
                client_secret: "eb59bdac73d3eec58706f9f2808666a69f8ff5a0c61fc541593236e80a7c1020",
                grant_type: "client_credentials"
            });

            var header = {
                "Content-Type": "application/x-www-form-urlencoded"
            };

            var token = self.getToken();

            if(token){
                return $q.resolve(token);
            }

            return Restangular.all("oauth/token").post(data, null, header)
                .then(function(data){
                    $http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;

                    self.setToken(data.access_token);

                    return data.access_token;
                })
                .catch(function(){
                    growl.error("Authentication failed from server");
                });
        };

        self.login = function (credentials) {
            self.logout();
            return self.requestToken()
                .then(function(){
                    return Restangular.all('login').post(credentials);
                })
                .then(function(user){
                    self.setUser(user.plain());
                    self.setHeaders();

                    return user;
                });
        };

        self.logout = function () {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        };

        self.setToken = function(token){
            return localStorage.setItem("token", token);
        };

        self.getToken = function(){
            return localStorage.getItem("token");
        };

        self.setUser = function(user){
            User.single(user.id)
                .then(function(userData){
                    var userObj = _.extend(user, userData);
                    User.data = userObj;
                    localStorage.setItem("user", JSON.stringify(userObj));
                });
            // return localStorage.setItem("user", _.extend(JSON.stringify(user), ));
        };

        self.getUser = function(user){
            return User.data;
        };

        self.isAuthenticated = function(){
            return self.getToken() && self.getUser();
        };

        self.setHeaders = function(){
            var user = self.getUser();
            
            $http.defaults.headers.common.Authorization = 'Bearer ' + self.getToken();
            $http.defaults.headers.common["X-Authorization"] = user.access_token;
        };

        self.register = function(formData){
            return self.requestToken()
                .then(function(accessData){
                    return Restangular.all('users').post({user: formData}, null, {
                        Authorization: "Bearer " + accessData
                    });
                });
        };
    });
