'use strict';

angular.module('booking', ['BookingService', 'BookingDirective', 'RouteService', 'PointService', 'UserService', 'AddressService'])
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

        vm.booking = Booking;
        vm.showDatePicker = false;

        $q.join(Point.service.getList(), Route.service.getList(), function(points, routes){
            vm.booking.data.points = points.plain();
            vm.booking.data.routes = routes.plain();
        });

        $scope.$on('origin.set', function( event, origin ) {
            vm.dests = _.filter(vm.booking.data.routes, function(route){
                return route.origin_id == origin.id;
            });
        });

        $scope.$on('destination.set', function( event, destination ) {
            vm.showDatePicker = true;
        });

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