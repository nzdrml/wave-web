angular.module('BookingDirective', [])
    .directive('selectBookingOrigin', function(Booking) {
        return {
            restrict: 'A',
            scope: {
                points: "="
            },
            templateUrl: 'modules/booking/tmpl/select_booking_origin_tmpl.html',
            link: function (scope, element, attr) {
                scope.onSelected = function (selectedItem) {
                    Booking.set_origin(selectedItem);
                }
            }
        }
    })
    .directive('selectBookingDestination', function(Booking) {
        return {
            restrict: 'A',
            scope: {
                points: "=",
                destPoints: "="
            },
            templateUrl: 'modules/booking/tmpl/select_booking_destination_tmpl.html',
            link: function (scope, element, attr) {
                scope.pagination = {
                    maxItems: 5,
                    maxSize: 5,
                    currentPage: 1
                };

                scope.setDest = function(route){
                    var destPoint = _.find(scope.points, ['id', route.destination_id]);
                    Booking.set_destination(destPoint);
                    Booking.set_route(route);
                };

                scope.findPoint = function(pointId){
                    return Booking.find_point(pointId);
                };
            }
        }
    })
    .directive('selectBookingDate', function(Booking) {
        return {
            restrict: 'A',
            scope: {
            },
            templateUrl: 'modules/booking/tmpl/select_booking_date_tmpl.html',
            link: function (scope, element, attr) {
                scope.toggleDatePickerType = 'single';
                scope.selectedDates = Booking.get_dates();

                scope.mdtpicker = {
                    oneDaySelectionOnly: function(event, date){
                        Booking.get_dates().length = 0;
                    },
                    disableDaysBefore: moment(),
                    disableDaysAfter: moment().add(3, 'months')
                };

                scope.toggleDatePicker = function(type){
                    if(type !== scope.toggleDatePickerType){
                        scope.toggleDatePickerType = type;
                        scope.selectedDates = [];
                    }
                };

                scope.$watch('selectedDates', function(newValue){
                    Booking.set_dates(newValue);
                    console.log(Booking.get_dates().length, scope.selectedDates.length);
                });
            }
        }
    })
    .directive('selectBookingSummary', function($state, uiGmapGoogleMapApi, growl, Booking) {
        return {
            restrict: 'A',
            scope: {
            },
            templateUrl: 'modules/booking/tmpl/select_booking_summary_tmpl.html',
            link: function (scope, element, attr) {
                scope.booking = Booking;

                uiGmapGoogleMapApi.then(function(maps) {
                    scope.map = {
                        center: { latitude: 14.638578, longitude: 121.065674 },
                        zoom: 12,
                        options: {
                            scrollwheel: false
                        },
                        bounds: {}
                    };
                    scope.markers = [
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

                scope.$on('origin.set', function( event, origin ) {
                    if(origin && origin.coordinates){
                        scope.setMarkerCoords(scope.markers[0], origin.coordinates);
                    }
                });

                scope.$on('destination.set', function( event, destination ) {
                    scope.setMarkerCoords(scope.markers[1], destination.coordinates);
                });

                scope.setMarkerCoords = function(marker, coord){
                    var splitCoords = coord.split(",");
                    if( splitCoords.length > 1 ){
                        marker.latitude = splitCoords[0];
                        marker.longitude = splitCoords[1];
                    }
                };

                scope.createBooking = function(){
                    scope.booking.create()
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
            }
        }
    });