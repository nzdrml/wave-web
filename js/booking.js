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


	getPoints();
  //console.log(myPoints);
  //console.log(myPoints.length);

  myRoutes=[];

  function getRoutes(){
    for(var i in myPoints){
      for(var j in myPoints){
        if(myPoints[j].id != myPoints[i].id){
        myRoutes.push({
          origin_id: myPoints[i].id,
          destination_id: myPoints[j].id,
          cost: "90"
        });
        }
      }
    }
  };


  getRoutes();


    for(var i in myPoints){
      //$('<option/>').val(myPoints[i].ID).text(myPoints[i].name).appendTo('#pPoints');
      document.getElementById("pPoints").innerHTML += '<option value='+myPoints[i].id+'>'+myPoints[i].name+'</option>'

    }

    function getRouteData(x){
      alert($(x).attr("id"));
    }

  $("#pPoints").on('change', function() {
    document.getElementById("routes").innerHTML = ''
    for(var i in myRoutes){
      if ($('#pPoints').val() == myRoutes[i].origin_id){

          if(i%2==0){
            document.getElementById("routes").innerHTML += '<li class="routeSelect a" id="routeLink'+i+'" \
            data-origin="'+myRoutes[i].origin_id+'" data-destination="'+myRoutes[i].destination_id+'" \
            data-cost="'+myRoutes[i].cost+'" data-ocoo="'+myPoints[(myRoutes[i].origin_id)-1].coordinates+'" \
            data-dcoo="'+myPoints[(myRoutes[i].destination_id)-1].coordinates+'">\
            <div class="row">\
              <div class="col-sm-4">'+myPoints[(myRoutes[i].origin_id)-1].name+'</div>\
              <div class="col-sm-1">To</div>\
              <div class="col-sm-4">'+myPoints[(myRoutes[i].destination_id)-1].name+'</div>\
              <div class="col-sm-3">P90</div>\
            </div></li>'

          }
          else{
            document.getElementById("routes").innerHTML += '<li class="b routeSelect" id="routeLink'+i+'" \
            data-origin="'+myRoutes[i].origin_id+'" data-destination="'+myRoutes[i].destination_id+'" \
            data-cost="'+myRoutes[i].cost+'" data-ocoo="'+myPoints[(myRoutes[i].origin_id)-1].coordinates+'" \
            data-dcoo="'+myPoints[(myRoutes[i].destination_id)-1].coordinates+'">\
            <div class="row">\
              <div class="col-sm-4">'+myPoints[(myRoutes[i].origin_id)-1].name+'</div>\
              <div class="col-sm-1">To</div>\
              <div class="col-sm-4">'+myPoints[(myRoutes[i].destination_id)-1].name+'</div>\
              <div class="col-sm-3">P90</div>\
            </div></li>'
          }

      }

    }


    routes = document.getElementsByClassName('routeSelect');
      for (var i = 0; i < routes.length; i++) {
        routes[i].addEventListener('click',selectFunction,false);
      }


    $('#routes').fadeIn(1000);
});

//bookedData=[];
var map;
origin ='';
destination='';
cost='';
oco='';
dco='';
olat='';
olon='';
dlat='';
dlon='';
maplat=["12.8797,121.7740"];

function selectFunction(){
  $(".routeSelected").removeClass("routeSelected");
  $('#'+(this.id)).addClass('routeSelected');
  //console.log(this.id);
  //var bookedData = $('#'+(this.id)).data();
  origin = $('#'+(this.id)).data('origin');
  destination = $('#'+(this.id)).data('destination');
  cost =$('#'+(this.id)).data('cost');
  oco = $('#'+(this.id)).data('ocoo');
  dco = $('#'+(this.id)).data('dcoo');
  mapFunction();
}



function mapFunction(){
maplat[0]=oco;
maplat[1]=dco;
/*
olat=oco.split(',')[0];
olon=oco.split(',')[1];
dlat=dco.split(',')[0];
dlon=dco.split(',')[1];
console.log(olat);
console.log(olon);
console.log(dlat);
console.log(dlon);**/
console.log(maplat);
initialize();

}

console.log(myPoints[3].coordinates);


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
      window.setTimeout(function() {
        window.location.href = "afterbooking.html";
      });
    },
    error: function(data){
      console.log("error");
      console.log(JSON.stringify(data));
    }
  });
}

$('#submitting').click(function(){
  pP = origin;
  dP = destination;
  d = $('#date').val() + "T";
  t = $('#t1').val();
  t2 =":"+ $('#t2').val();
  time = t.concat(t2);
  sched = d.concat(time);
  bookingFunction(pP,dP,sched);
});

function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(maplat[0].split(',')[0],maplat[0].split(',')[1]),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

  for (var i = 0; i < 2; i++) {
    var marker=new google.maps.Marker({
      position:new google.maps.LatLng(maplat[i].split(',')[0],maplat[i].split(',')[1]),
      map:map
    });
  }

}

google.maps.event.addDomListener(window, 'load', initialize);


});
