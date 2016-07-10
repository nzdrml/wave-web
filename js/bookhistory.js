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
    console.log(myPoints);

  allBookings=[];

  function getBookings(){
    $.ajax({
      url: "http://128.199.232.120/user_bookings",
      method: "GET",
      success: function(data){
        console.log("Success");
        allBookings = JSON.parse(JSON.stringify(data));
      },
      error: function(data){
        console.log("error");
        console.log(JSON.stringify(data));
      },
      async: false

    });
  };
  getBookings();
  console.log(allBookings);

  for(var i in allBookings){
    var today = new Date();
    var old = new Date(allBookings[i].schedule);
    if(document.getElementById('oldTs') != null){
    if(today>old){
          document.getElementById("oldTs").innerHTML += '<li class="oldL">\
            <div>\
              <div class="row">\
                <div class="col-sm-12"><b>Trip Number #'+allBookings[i].id+'</b></div>\
              </div>\
              <div class="row">\
                <div class="col-sm-6"><b>Origin:</b> '+myPoints[(allBookings[i].origin_id)-1].name+'</div>\
                <div class="col-sm-6"><b>Date:</b> '+allBookings[i].schedule.substring(0,10)+'</div>\
              </div>\
              <div class="row">\
                <div class="col-sm-6"><b>Destination:</b> '+myPoints[(allBookings[i].destination_id)-1].name+'</div>\
                <div class="col-sm-6"><b>Time:</b> '+allBookings[i].schedule.substring(12,16)+'</div>\
              </div>\
            </div>\
          </li>'
        }
      }
    if(document.getElementById('newTs') != null){
        if(today<old){
              document.getElementById("newTs").innerHTML += '<li class="newL">\
                <div>\
                  <div class="row">\
                    <div class="col-sm-12"><b>Trip Number #'+allBookings[i].id+'</b></div>\
                  </div>\
                  <div class="row">\
                    <div class="col-sm-6"><b>Origin:</b> '+myPoints[(allBookings[i].origin_id)-1].name+'</div>\
                    <div class="col-sm-6"><b>Date:</b> '+allBookings[i].schedule.substring(0,10)+'</div>\
                  </div>\
                  <div class="row">\
                    <div class="col-sm-6"><b>Destination:</b> '+myPoints[(allBookings[i].destination_id)-1].name+'</div>\
                    <div class="col-sm-6"><b>Time:</b> '+allBookings[i].schedule.substring(12,16)+'</div>\
                  </div>\
                </div>\
              </li>'
            }

    }
  }

    if( ($("ul#oldTs").has("li").length === 0) ) {
      $("ul#oldTs").html("Sorry, you haven't taken any trips yet!");
    }

});
