angular.module('BookingService', [])
    .factory('Booking', function(Restangular){
        var bookingsUrlBase = "bookings";
        return {
            service: Restangular.service(bookingsUrlBase),
            single: function(id) {
                return Restangular.one(bookingsUrlBase, id).get();
            }
        };
    });