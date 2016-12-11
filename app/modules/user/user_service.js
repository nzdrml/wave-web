angular.module('UserService', [])
    .service('User', function(Restangular){
        var self = this;

        self.data = {};

        self.usersUrlBase = "users";
        self.prefPointUrl = "set_preferred_point";

        self.service = Restangular.service(self.usersUrlBase);

        self.single = function(id) {
            return Restangular.one(self.usersUrlBase, id).get();
        };

        self.setPrefPoint = function(userId, dataObj) {
            return Restangular
                .one(self.usersUrlBase, userId)
                .all(self.prefPointUrl)
                .post(dataObj);
        };
    });