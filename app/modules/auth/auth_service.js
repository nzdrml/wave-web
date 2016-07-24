"use strict";

angular.module("AuthService", [])
    .service("Auth", function($q, $http, growl, Restangular){
        var self = this;

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
            return self.requestToken()
                .then(function(){
                    return Restangular.all('login').post(credentials);
                })
                .then(function(user){
                    console.log("zup", user);
                    $http.defaults.headers.common["X-Authorization"] = user.access_token;

                    self.setUser(user.plain());

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
            return localStorage.setItem("user", JSON.stringify(user));
        };

        self.getUser = function(user){
            return JSON.parse(localStorage.getItem("user"));
        };

        self.isAuthenticated = function(){
            return self.getToken() && self.getUser();
        };

        self.setHeaders = function(){
            var user = self.getUser();
            
            $http.defaults.headers.common.Authorization = 'Bearer ' + self.getToken();
            $http.defaults.headers.common["X-Authorization"] = user.access_token;
        };
    });
