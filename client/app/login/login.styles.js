$(document).ready(function(){
	$('#username').blur(function(e){
		var username = $('#username').val();
		if(username === undefined || username === '') {
			$('#userError').html('You must input a username value!');
		} else if(username.length > 128) {
			$('#userError').html('Your username must be fewer than 129 characters!');
		} else {
			$('#userError').html('');
		}
	});
	$('#password').blur(function(e){
		var password = $('#password').val();
		if(password !== undefined && password.length > 128) {
			$('#passError').html('Your password must be fewer than 129 characters!');
		} else {
			$('#passError').html('');
		}
	});
});