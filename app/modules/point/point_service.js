angular.module('PointService', [])
    .factory('Point', function(Restangular){
        var usersUrlBase = "points";
        return {
            service: Restangular.service(usersUrlBase),
            single: function(id) {
                return Restangular.one(usersUrlBase, id).get();
            }
        };
    });