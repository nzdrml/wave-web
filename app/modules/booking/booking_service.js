angular.module('BookingService', [])
    .service('Booking', function($rootScope, moment, Restangular){
        var obj = {
            data: {
                points: [],
                routes: [],
                dates: [],
                form: {}
            },

            urlBase: "bookings",

            service: Restangular.service("bookings"),

            find_by_id: function(id) {
                return Restangular.one("bookings", id).get();
            },

            find_point: function(pointId){
                return _.find(this.data.points, ["id", pointId]);
            },

            find_route: function(routeId){
                return _.find(this.data.routes, ["id", routeId]);
            },

            set_origin: function(point) {
                console.log(point);
                this.data.form.origin = point;
                $rootScope.$broadcast( 'origin.set', point );
            },

            get_origin: function() {
                return this.data.form.origin;
            },

            set_destination: function(point) {
                console.log(point);
                this.data.form.destination = point;
                $rootScope.$broadcast( 'destination.set', point );
            },

            get_destination: function(point) {
                return this.data.form.destination;
            },

            set_route: function(route) {
                this.data.form.route = route;
            },

            get_route: function(route) {
                return this.data.form.route;
            },

            set_dates: function(date) {
                this.data.dates = date;
            },

            get_dates: function() {
                return this.data.dates;
            },

            has_dates: function() {
                return this.data.dates.length > 0;
            },

            create: function(){
                return this.service.post({
                    booking: {
                        route_id: this.data.form.route.id,
                        schedule: this.data.form.route.time
                    }
                });
            }
        };

        return obj;
    });