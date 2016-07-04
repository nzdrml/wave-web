$(document).ready(function(){
	$('#rSubmit').click(function(){
		var email= $('#registerInput').val();
		sessionStorage.setItem('email', email);
		window.setTimeout(function() {
    		window.location.href = "register.html";
		});
	});
	
	var email2 = sessionStorage.getItem('email');
	$('#rEmail').val(email2);
	
	
	/**if ($('#rEmail').is(':focus')){
		$('#eError').css('display','none');
	}**/
});

