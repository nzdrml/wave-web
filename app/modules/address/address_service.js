angular.module('AddressService', [])
    .factory('Address', function(Restangular){
        var addressesUrlBase = "addresses";

        return {
            service: Restangular.service(addressesUrlBase),
            single: function(id) {
                return Restangular.one(addressesUrlBase, id).get();
            }
        };
    });