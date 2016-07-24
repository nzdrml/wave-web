'use strict';

angular.module('booking', ['BookingService', 'RouteService', 'PointService'])
    .config(function($stateProvider) {
        $stateProvider
            .state('main.bookings', {
                url: '/bookings',
                templateUrl: 'modules/booking/booking.html',
                controller: 'BookingCtrl as booking'
            });
    })
    .controller('BookingCtrl', function($q,$scope, $state, uiGmapGoogleMapApi, growl, Booking, Route, Point) {
        var vm = this;
        
        vm.selected = "";
        vm.form = {};

        vm.pagination = {
            maxItems: 5,
            maxSize: 5,
            currentPage: 1
        };

        $q.join(Point.service.getList(), Route.service.getList(), function(points, routes){
            vm.points = points.plain();
            vm.routes = routes.plain();
            console.log(vm.routes);
        });

        vm.setDest = function(route){
            var destPoint = _.find(vm.points, ['id', route.destination_id]);
            vm.form.destination = destPoint;
            vm.form.route = route;
            vm.setMarkerCoords(vm.markers[1], destPoint.coordinates);
        };

        vm.findPoint = function(pointId){
            return _.find(vm.points, ["id", pointId]);
        };

        vm.setMarkerCoords = function(marker, coord){
            var splitCoords = coord.split(",");
            if( splitCoords.length > 1 ){
                marker.latitude = splitCoords[0];
                marker.longitude = splitCoords[1];
            }
        };
        
        vm.createBooking = function(){
            var bookingData = {
                booking: {
                    route_id: vm.form.route.id,
                    schedule: (new Date(vm.form.schedule)).toJSON()
                }
            };

            Booking.service.post(bookingData)
                .then(function(booking){
                    console.log("Created Booking: ", booking);
                    growl.success("Created Booking!");
                    return $state.go("main.bookings");
                })
                .catch(function(err){
                    console.log(err);
                    return growl.error("Create booking failed");
                });
        };

        $scope.$watch('booking.form.origin', function(){
            vm.dests = _.filter(vm.routes, function(route){
                return route.origin_id == vm.form.origin.id;
            });

            if(vm.form.origin && vm.form.origin.coordinates){
                vm.setMarkerCoords(vm.markers[0], vm.form.origin.coordinates);
            }
        });

        uiGmapGoogleMapApi.then(function(maps) {
            vm.map = {
                center: { latitude: 14.638578, longitude: 121.065674 },
                zoom: 12,
                bounds: {}
            };
            vm.markers = [
                {
                    id: 0,
                    latitude: undefined,
                    longitude: undefined,
                    icon: "img/Markers/3.png"
                },
                {
                    id: 1,
                    latitude: undefined,
                    longitude: undefined,
                    icon: "img/Markers/2.png"
                }
            ];

        });
    });