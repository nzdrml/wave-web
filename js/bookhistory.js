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
    auth.setToken(data.access_token);
     },
  error: function(){
    //console.log("Nope");
  }

     });


 }

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

   function getPoints(){
     $.ajax({
       url: "http://128.199.232.120/points",
       method: "GET",
       success: function(data){
         ////console.log("Success");
         ////console.log(JSON.stringify(data))
         myPoints = JSON.parse(JSON.stringify(data));
         ////console.log(myPoints);
         ////console.log(JSON.stringify(myPoints[0].name))
       },
       error: function(data){
         ////console.log("error");
         ////console.log(JSON.stringify(data));
       },
       async: false

     });
   }


function getRoutes(){
  $.ajax({
    url: "http://128.199.232.120/routes",
    method: "GET",
    success: function(data){
      ////console.log("Success");
      ////console.log(JSON.stringify(data))
      myRoutes = JSON.parse(JSON.stringify(data));
      ////console.log(myPoints);
      ////console.log(JSON.stringify(myPoints[0].name))
    },
    error: function(data){
      ////console.log("error");
      //(JSON.stringify(data));
    },
    async: false

  });
};


$(document).ready(function () {

	 trueRequestFunction();

    myPoints=[];
    myRoutes=[];

  	getPoints();
    getRoutes();
    ////console.log(myPoints);

  allBookings=[];

  function getBookings(){
    $.ajax({
      url: "http://128.199.232.120/user_bookings",
      method: "GET",
      success: function(data){
        ////console.log("Success");
        allBookings = JSON.parse(JSON.stringify(data));
      },
      error: function(data){
        //console.log("error");
        //console.log(JSON.stringify(data));
      },
      async: false

    });
  };
  getBookings();
  //console.log(allBookings);

  //console.log(myRoutes[99]);

  for(var i in allBookings){
    var today = new Date();
    var old = new Date(allBookings[i].schedule);
    for (var j in myRoutes){
    if(document.getElementById('oldTs') != null){
    if(today>old){
      if(allBookings[i].route_id==myRoutes[j].id){
          document.getElementById("oldTs").innerHTML += '<li class="oldL">\
            <div>\
              <div class="row">\
                <div class="col-sm-12"><b>Trip Number #'+allBookings[i].id+'</b></div>\
              </div>\
              <div class="row">\
                <div class="col-sm-6"><b>Origin:</b> '+myPoints[myRoutes[j].origin_id].name+'</div>\
                <div class="col-sm-6"><b>Date:</b> '+allBookings[i].schedule.substring(0,10)+'</div>\
              </div>\
              <div class="row">\
                <div class="col-sm-6"><b>Destination:</b> '+myPoints[myRoutes[j].destination_id].name+'</div>\
                <div class="col-sm-6"><b>Time:</b> '+allBookings[i].schedule.substring(12,16)+'</div>\
              </div>\
            </div>\
          </li>'
        }
        }
      }
    if(document.getElementById('newTs') != null){
        if(today<old){
          if(allBookings[i].route_id==myRoutes[j].id){
              document.getElementById("newTs").innerHTML += '<li class="newL">\
                <div>\
                  <div class="row">\
                    <div class="col-sm-12"><b>Trip Number #'+allBookings[i].id+'</b></div>\
                  </div>\
                  <div class="row">\
                    <div class="col-sm-6"><b>Origin:</b> '+myPoints[myRoutes[j].origin_id].name+'</div>\
                    <div class="col-sm-6"><b>Date:</b> '+allBookings[i].schedule.substring(0,10)+'</div>\
                  </div>\
                  <div class="row">\
                    <div class="col-sm-6"><b>Destination:</b> '+myPoints[myRoutes[j].destination_id].name+'</div>\
                    <div class="col-sm-6"><b>Time:</b> '+allBookings[i].schedule.substring(12,16)+'</div>\
                  </div>\
                </div>\
              </li>'
            }
        }
    }
  }
  }
    if(document.getElementById('oldTs') != null){
      if( ($("ul#oldTs").has("li").length === 0) ) {
        $("ul#oldTs").html("Sorry, you haven't taken any trips yet!");
      }
    }
    if(document.getElementById('newTs') != null){
      if( ($("ul#newTs").has("li").length === 0) ) {
        $("ul#newTs").html("Sorry, you haven't booked any trips yet! Book now to get started!");
      }
    }

});
