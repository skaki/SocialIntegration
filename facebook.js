

// Requires jquery and understanding of $.Deferred() concept.
// Javascript code snippet to add linkedIn login to your site

var facebookReady = $.Deferred();

$.getScript('//connect.facebook.net/en_US/all.js', function(){
	try {
		FB.init({
		    appId      : 'Your App Id',
		    channelUrl : 'channel url',
		    status     : false,                                 // Check Facebook Login status
		    xfbml      : true
		});

		facebookReady.resolve();
	}
	catch(e) {
		facebookReady.reject(e.message);
	}
});

function fblogin(options) {
	var promise = $.Deferred();
	$.when(facebookReady).done( function() {
		try {
      		FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
					var fbUserID = response.authResponse.userID;
                    promise.resolve(response.status);
              } else if (response.status === 'not_authorized' ) {
                  promise.reject("Facebook Interface has not been authorized. Please clear your browser cache, logout all your facebook sessions from all browsers. Connect again");
              } else {
                  FB.login(function(response) {
                       if (response.authResponse) {
                       		var fbUserID = response.authResponse.userID;
                          	promise.resolve('Welcome! Facebook Logged you in.');
                       }
                       else { 
		                    promise.reject("Facebook Interface has not been authorized. Please connect again");
                       }
                  }); 
              }
      	  	}, true);
      	}
      	catch( e ) {
      		console.log(e.message);
      		promise.reject("An error occured connecting to Facebook Interface. Please clear your browser cache. logout all your facebook sessions from all browsers. connect again. Details: " + e.message );
      	}

	}).fail(function(response) { 
			promise.reject("Facebook Interface has not been connected. Please clear your browser cache. logout all your facebook sessions from all browsers. Connect again.");
	});

	return promise;
};


// usage

$.when( fblogin () ).done( function(result) { console.log ( result)});




