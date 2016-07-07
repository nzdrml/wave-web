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

	function trueRequestFunction() {
         $.ajax({
             url: "http://128.199.232.120/oauth/token",
             method: "POST",
             data: {
                 "client_id": "2d01f866507b7e8755be57d11da36d8493dcba57245c09321078d7b4d6d74198",
                 "client_secret": "eb59bdac73d3eec58706f9f2808666a69f8ff5a0c61fc541593236e80a7c1020",
                 "grant_type": "client_credentials"},
			success: function(data){
				//console.log("Success");
				//console.log(data);
				//var json_obj = $.parseJSON(data);
				auth.setToken(data.access_token);
   			 },
			error: function(){
				console.log("Nope");
			}

         });


     }


	 trueRequestFunction();


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

  myPoints=[];

	function getPoints(){
		$.ajax({
			url: "http://128.199.232.120/points",
			method: "GET",
			success: function(data){
				console.log("Success");
				//console.log(JSON.stringify(data))
        myPoints = JSON.parse(JSON.stringify(data));
        //console.log(myPoints);
        //console.log(JSON.stringify(myPoints[0].name))
			},
			error: function(data){
				console.log("error");
				console.log(JSON.stringify(data));
			},
      async: false

		});
	}

  allBookings=[];
  function getBookings(){
		$.ajax({
			url: "http://128.199.232.120/bookings",
			method: "GET",
			success: function(data){
				console.log("Success");
				//console.log(JSON.stringify(data))
        allBookings = JSON.parse(JSON.stringify(data));
        //console.log(myPoints);
        //console.log(JSON.stringify(myPoints[0].name))
			},
			error: function(data){
				console.log("error");
				console.log(JSON.stringify(data));
			},
      async: false

		});
	}
  getBookings();
  //console.log(allBookings);

	getPoints();
  //console.log(myPoints);
  //console.log(myPoints.length);


    for(var i in myPoints){
      //$('<option/>').val(myPoints[i].ID).text(myPoints[i].name).appendTo('#pPoints');
      document.getElementById("pPoints").innerHTML += '<option value='+myPoints[i].id+'>'+myPoints[i].name+'</option>'

    }

    function getRouteData(x){
      alert($(x).attr("id"));
    }

  $("#pPoints").on('change', function() {
    //console.log("These are the points"+$('#pPoints').val());
    document.getElementById("routes").innerHTML = ''
    for(var i in allBookings){
      //console.log("i"+i);
      if ($('#pPoints').val() == allBookings[i].origin_id){
          //console.log("Booking id"+allBookings[i].origin_id);
          //console.log("Point id"+(myPoints[allBookings[i].origin_id].id-1));
          //console.log("Point name"+myPoints[allBookings[i].origin_id].name);
          //console.log(myPoints[myPoints[i].id].name);
          if(i%2==0){
            document.getElementById("routes").innerHTML += '<a class="routeSelect" id="routeLink'+i+'">\
            <div id="routeDiv'+i+'" class="row a routeSelect">\
              <div class="col-sm-4">'+myPoints[(allBookings[i].origin_id)-1].name+'</div>\
              <div class="col-sm-1">To</div>\
              <div class="col-sm-4">'+myPoints[(allBookings[i].destination_id)-1].name+'</div>\
              <div class="col-sm-3">P90</div>\
            </div></a>'

          }
          else{
            document.getElementById("routes").innerHTML += '<a class="routeSelect" id="routeLink'+i+'">\
            <div id="routeDiv'+i+'" class="row b routeSelect">\
              <div class="col-sm-4">'+myPoints[(allBookings[i].origin_id)-1].name+'</div>\
              <div class="col-sm-1">To</div>\
              <div class="col-sm-4">'+myPoints[(allBookings[i].destination_id)-1].name+'</div>\
              <div class="col-sm-3">P90</div>\
            </div></div>'
          }
          document.getElementById("routeLink"+i).onclick = function() {
            alert("dsfa");
            getRouteData(this);
          };
      }

    }

    $('#routes').fadeIn(1000);
});

console.log(myPoints[3].coordinates);

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(14.5249392,121.0436613),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);

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
