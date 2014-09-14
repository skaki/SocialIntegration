

// Requires jquery and understanding of $.Deferred() concept.
// Javascript code snippet to add linkedIn login to your site


var linkedInReady = $.Deferred();

function OnlinkedReady() {
	linkedInReady.resolve();
}

$.getScript("//platform.linkedin.com/in.js?async=true", function success() {
	IN.init({
	    onLoad: 'OnlinkedReady',
		api_key: 'Your API Key',
		scope: 'r_fullprofile r_emailaddress r_network r_contactinfo w_messages',
		authorize: true,
		credentials_cookie: true,
		credentials_cookie_crc: true
	});
}); 


function lnlogin (options) {
    var promise = $.Deferred();
	$.when(linkedInReady).done( function() {
      	IN.User.authorize(function() {
           IN.API.Profile('me')
            .fields(['id', 'pictureUrl','summary','headline'])
            .result(function(me_data){
            	// Reference me_data.values[0] for id, pictureUrl, etc
            	promise.resolve(me_data.values[0]);
			 })
				.error(function(error){ promise.reject(error)});
		})
    });
	return promise; 
};