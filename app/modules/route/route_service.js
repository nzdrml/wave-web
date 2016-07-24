angular.module('RouteService', [])
    .factory('Route', function(Restangular){
        var usersUrlBase = "routes";
        return {
            service: Restangular.service(usersUrlBase),
            single: function(id) {
                return Restangular.one(usersUrlBase, id).get();
            }
        };
    });