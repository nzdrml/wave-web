angular.module('UserService', [])
    .factory('User', function(Restangular){
        var usersUrlBase = "users";
        var prefPointUrl = "set_preferred_point";

        return {
            service: Restangular.service(usersUrlBase),
            single: function(id) {
                return Restangular.one(usersUrlBase, id).get();
            },
            setPrefPoint: function(userId, dataObj) {
                return Restangular
                    .one(usersUrlBase, userId)
                    .all(prefPointUrl)
                    .post(dataObj);
            }
        };
    });