$(document).ready(function () {
    var auth = {
        getToken: function() {
            return localStorage.getItem('access_token');

        },
		getXToken:function(){
			return localStorage.getItem('x_token');
		},
        setToken: function(access_token) {
            localStorage.setItem('access_token',access_token);

        },
		setXToken: function(access_token){
			localStorage.setItem('x_token',access_token);
		},
        isAuthenticated: function() {
            return this.getToken()!=null;
        },
        requestToken: function() {
            return "Random String";
        }
    };
	
	$.ajaxSetup({
        headers: {
            Authorization:"Bearer "+ auth.getToken(),
			"X-Authorization": auth.getXToken()
        },
        beforeSend: function(jqXHR, request) {
            if (request.url.indexOf("oauth/token") > -1 ){
                return true;
            }
            return auth.isAuthenticated();
        }
    });
	/**
	function getPoints(){
		$.ajax({
			url: "http://128.199.232.120/points",
			method: "GET",
			success: function(data){
				console.log("Success");
				console.log(JSON.stringify(data));
			},
			error: function(data){
				console.log("error");
				console.log(JSON.stringify(data));
			}
			
		});
	}
	
	getPoints();**/
	
	
	function bookingFunction(pP,dP,sched){
		$.ajax({
			url: "http://128.199.232.120/bookings",
			method: "POST",
			data:{
				"booking":{
    			"origin_id":pP,
    			"destination_id":dP,
    			"schedule":sched
				}
			},
			success: function(data){
				console.log("Success");
				console.log(JSON.stringify(data));
			},
			error: function(data){
				console.log("error");
				console.log(JSON.stringify(data));
			}
		});
	}
	
	$('#submitRide').click(function(){
		pP = $('#pP1').val();
		dP = $('#dP1').val();
		d = $('#date').val() + "T";
		t = $('#t1').val() +"Z";
		sched = d.concat(t);
		bookingFunction(pP,dP,sched);
	});
	
	

});