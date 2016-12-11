'use strict';

angular.module('trip', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('main.trips', {
                url: '/trips',
                templateUrl: 'modules/trip/trips.html',
                controller: 'TripCtrl as trip'
            })
            .state('main.trips.history', {
                url: '/trips/history',
                templateUrl: 'modules/trip/trips_history.html',
                controller: 'TripHistoryCtrl as tripHis',
                parent: 'main'
            });
    })
    .controller('TripCtrl', function($q,$scope, $state, Restangular, growl, Booking, Route, Point) {
        var vm = this;
        console.log("TRIP");
        $q.join(Route.service.getList(), Point.service.getList(), Restangular.all('user_bookings').getList(), function(routes, points, bookings){
            vm.routes = routes.plain();
            vm.points = points.plain();
            vm.bookings = bookings.plain();

            _.forEach(vm.bookings, function(booking){
                // if( moment(booking.schedule) < moment() ) return;
                var today = moment();
                var route = _.find(vm.routes, ["id", booking.route_id]);

                route.origin = _.find(vm.points, ["id", route.origin_id]);
                route.destination = _.find(vm.points, ["id", route.destination_id]);

                booking.isOld = moment(booking.schedule).isBefore(today);
                booking.today = moment(booking.schedule).isBetween(moment().startOf('day'), moment().endOf('day'), 'day', [])
                booking.route = route;
            });
        });
    })
    .controller('TripHistoryCtrl', function($q,$scope, $state, Restangular, growl, Booking, Route, Point) {
        var vm = this;

        $q.join(Route.service.getList(), Point.service.getList(), Restangular.all('user_bookings').getList(), function(routes, points, bookings){
            vm.routes = routes.plain();
            vm.points = points.plain();
            vm.bookings = bookings.plain();

            _.forEach(vm.bookings, function(booking){
                var route = _.find(vm.routes, ["id", booking.route_id]);

                route.origin = _.find(vm.points, ["id", route.origin_id]);
                route.destination = _.find(vm.points, ["id", route.destination_id]);

                booking.isOld = moment(booking.schedule) < moment() ? true : false;
                booking.route = route;

            });
        });

    });