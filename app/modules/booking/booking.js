'use strict';

angular.module('booking', ['BookingService', 'RouteService', 'PointService', 'UserService', 'AddressService'])
    .config(function($stateProvider) {
        $stateProvider
            .state('main.bookings', {
                url: '/bookings',
                templateUrl: 'modules/booking/booking.html',
                controller: 'BookingCtrl as booking'
            });
    })
    .controller('BookingCtrl', function($q, $scope, $filter, $state, $uibModal, uiGmapGoogleMapApi, growl, Booking, Route, Point) {
        var vm = this;
        
        vm.selected = "";
        vm.input = {};
        vm.form = {};

        vm.pagination = {
            maxItems: 5,
            maxSize: 5,
            currentPage: 1
        };

        vm.selectedDates = [];

        $q.join(Point.service.getList(), Route.service.getList(), function(points, routes){
            vm.points = points.plain();
            vm.routes = routes.plain();
            console.log(vm.routes);
        });

        vm.setDest = function(route){
            var destPoint = _.find(vm.points, ['id', route.destination_id]);
            vm.form.destination = destPoint;
            vm.form.route = route;
            console.log(route);
            // vm.input.time = $filter('date')(route.time, 'hh:mm:ss a');
            vm.form.schedule = $filter('date')(route.time, 'MMMM dd, yyyy hh:mm a');
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
                options: {
                    scrollwheel: false
                },
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

        vm.mdtpicker = {
            oneDaySelectionOnly: function(event, date){
                console.log(event, date);
                vm.selectedDates.length = 0;
            },
            disableDaysBefore: moment(),
            disableDaysAfter: moment().add(3, 'months')
        };

        vm.open = function () {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/modal/booking_preferred.html',
                controller: 'BookingModalCtrl as prefModal',
                resolve: {
                    data: function () {
                        return {
                            points: vm.points,
                            routes: vm.routes
                        };
                    }
                }
            });

            modalInstance.result.then(function (form) {
                console.log(form);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    })
    .controller('BookingModalCtrl', function ($scope, $q, $uibModalInstance, $uibModal, growl, Auth, User, data) {
        var vm = this;

        vm.data = data;
        vm.selected = "";

        vm.ok = function () {
            var user = Auth.getUser();
            var points = {
                pickup: {
                    point_id: vm.form.pickup.id,
                    type: "pickup"
                },
                dropoff: {
                    point_id: vm.form.dropoff.id,
                    type: "dropoff"
                }
            };

            return $q.join(User.setPrefPoint(user.id, points.pickup), User.setPrefPoint(user.id, points.dropoff), function(pickup, dropoff){
                growl.success("Preferred Point Set!");
                return $uibModalInstance.close();
            })
            .catch(function(err){
                console.log(err);
                return growl.error("Preferred Point Set failed");
            });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.openManualPoint = function () {
            $uibModalInstance.dismiss('cancel');

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/modal/booking_preferred_manual.html',
                controller: 'BookingManualModalCtrl as prefManualModal'
            });

            modalInstance.result.then(function (form) {
                console.log(form);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    })
    .controller('BookingManualModalCtrl', function ($q, $uibModalInstance, $uibModal, growl, Auth, Address) {
        var vm = this;

        vm.ok = function(){
            var defaultInfo = {
                user_id: Auth.getUser().id,
                country: "Philippines",
                coordinates: ""
            };

            var addresses = {
                home: _.extend(vm.form.home, defaultInfo, {type: "home"}),
                work: _.extend(vm.form.work, defaultInfo, {type: "work"})
            };

            return $q.join(Address.service.post({address: addresses.home}), Address.service.post({address: addresses.work}), function(home, work){
                growl.success("Addresses set!");
                return $uibModalInstance.close();
            })
            .catch(function(err){
                console.log(err);
                return growl.error("Addresses Set failed");
            });
        };

        vm.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        };
    });