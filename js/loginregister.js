$(document).ready(function () {
    var auth = {
        getToken: function() {
            return localStorage.getItem('access_token');
			
        },
        setToken: function(access_token) {
            localStorage.setItem('access_token',access_token);
			console.log(access_token);
			
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
            Authorization:"Bearer "+ auth.getToken()
        },
        beforeSend: function(jqXHR, request) {
            if (request.url.indexOf("oauth/token") > -1 ){
                return true;
            }
            return auth.isAuthenticated();
        }
    });

    function trueRequestFunction() {
         $.ajax({
             url: "http://128.199.232.120/oauth/token",
             method: "POST",
             data: {
                 "client_id": "2d01f866507b7e8755be57d11da36d8493dcba57245c09321078d7b4d6d74198",
                 "client_secret": "eb59bdac73d3eec58706f9f2808666a69f8ff5a0c61fc541593236e80a7c1020",
                 "grant_type": "client_credentials"}, 
			success: function(data){
				console.log("Success");
				console.log(data);
				//var json_obj = $.parseJSON(data);
				auth.setToken(data.access_token);
   			 },
			error: function(){
				console.log("Nope");
			}

         });
		 
		 
     }
	 
	 
	 trueRequestFunction();
	 
	 function loginFunction(){
	 	$.ajax({
			url: "http://128.199.232.120/login",
			method: "POST",
			data:{
				"email":"test@test.com",
				"password":"password"	
			},
			success: function(data){
				console.log("Logged in");
				console.log(data);
			},
			error: function(){
				console.log("Can't Log In");
			}
		});
	 }
	 
	 function getUsers(){
	 	$.ajax({
			url: "http://128.199.232.120/users",
			method: "GET",
			success: function(data){
				console.log("Success");
				console.log(JSON.stringify(data));
			}
		});
	 
	 }
	 
	 function registerUser(e,f,l,p1,p2){
	 	$.ajax({
			url: "http://128.199.232.120/users",
			method: "POST",
			data:{
				"user":{
					"email": e,
					"first_name":f,
					"last_name":l,
					"password":p1,
					"password_confirmation":p2}
			},
			success: function(data){
				console.log(data);
			},
			error: function(){
				console.log("Cannot create");
			}
		});
	 }

	$("#button1").click(function(){
		loginFunction();
		
	});
	
	$("#button2").click(function(){
		var email=$('#rEmail').val();
	 	var fName=$('#fName').val();
	 	var lName=$('#lName').val();
	 	var pass1=$('#rPass').val();
	 	var pass2=$('#rPass2').val();
		registerUser(email,fName,lName,pass1,pass2);
	});

});