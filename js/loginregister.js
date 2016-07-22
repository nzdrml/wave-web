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
  },
  async:false

     });


 }


 function loginFunction(e,p){
  $.ajax({
    url: "http://128.199.232.120/login",
    method: "POST",
    data:{
      "email": e,
      "password": p
    },
    success: function(data){
      console.log("Logged in");
      console.log(data);
      auth.setXToken(data.access_token);
      window.location.href = "booking3.html";
    },
    error: function(data){
      console.log("Can't Log In");
      console.log(data);
      var obj = JSON.parse(JSON.stringify(data));
      //console.log(obj);
      console.log(obj['responseText']);
      if(obj['responseText']=='{"message":"Invalid Username or Password."}'){
        $('#pError').fadeIn(1000);}
    },
    async:false
  });
 }

 function getUsers(){
  $.ajax({
    url: "http://128.199.232.120/users",
    method: "GET",
    success: function(data){
      //console.log("Success");
      //console.log(JSON.stringify(data));
    }
  });

 }

 function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
 }

 function validatePhone(phone){
  var re = /\(?09([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return re.test(phone);
 }

 function registerUser(e,f,l,p1,p2,ph,com){
  $.ajax({
    url: "http://128.199.232.120/users",
    method: "POST",
    data:{
      "user":{
        "email": e,
        "first_name":f,
        "last_name":l,
        "password":p1,
        "password_confirmation":p2,
        "phone":ph,
        "company": com}
    },
    success: function(data){
      if(validateEmail(e) && validatePhone(ph)){
      window.setTimeout(function() {
        window.location.href = "postregister.html";
  });
      }
      sessionStorage.removeItem('email');
    },
    error: function(data){
      console.log(data);
      console.log("Cannot create");
      var obj = JSON.parse(JSON.stringify(data));
      //console.log(obj);
      //console.log(obj['responseText']);
      if(obj['responseText']=='{"message":{"email":["has already been taken"]}}'){
        $('#eError').fadeIn(1000);}
    },
    async:false
  });
 }

$(document).ready(function () {

	 trueRequestFunction();
   $.ajaxSetup({
       headers: {
           Authorization:"Bearer "+ auth.getToken()
       },
       beforeSend: function(jqXHR, request) {
           if (request.url.indexOf("oauth/token") > -1 ){
               return true;
           }
           return auth.isAuthenticated();
       },
       async:false
   });



	$("#button1").click(function(){
		var e = $('#lEmail').val();
		var p = $('#lPass').val();
		loginFunction(e,p);

	});

	$("#button2").click(function(){
		var email=$('#rEmail').val();
	 	var fName=$('#fName').val();
	 	var lName=$('#lName').val();
	 	var pass1=$('#rPass').val();
		var phone = $('#pnumber').val();
		console.log(phone);
		registerUser(email,fName,lName,pass1,pass1,phone,"NULL");
	});

});
