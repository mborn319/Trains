$(document).ready(function() {
	//use this function to initiate anything that has to be done AFTER the page loads - like attach event handlers.

});
function sayHi() {

	$.ajax({
		type: "POST",		//send variables in the POST scope, not in GET scope.
		url: "/ajax.php?", //call ajax.php.
		data: {action: "sayHi"},//can be accessed in ajax.php like $_POST['action']
		complete: function(returnData) {//HTTP response
			//assume JSON!!
			var json = JSON.parse(returnData.response);

			//put the message in a fancy little alert...
			$(".ajaxAlert").prepend('<p class="pure-alert primary">The server says: ' + json.message + '</p>');
		}
	});
};
function startWebcam() {
	videoTag = document.querySelector('#webcam');

	//returns false, OR the browser's impl. of the webcam API function.
	if (browserSupportsWebcamAPI()) {


		//Request webcam permissions. User has to click "Allow".
		//this is JSON. If you wish to add audio, use "{video:true,audio:true}";
		var p = navigator.mediaDevices.getUserMedia({ audio: false, video: true });

		p.then(function(stream) {
			videoTag.src = window.URL.createObjectURL(stream);
			videoTag.onloadedmetadata = function(e) {
				videoTag.style.display=block;//show the video just before we play the video
				video.play();
			};
		});

		p.catch(function(e) { console.log(e.name); }); // always check for errors at the end.
	}
};
function browserSupportsWebcamAPI() {

	if (typeof navigator.mediaDevices == "object") {
		if (typeof navigator.mediaDevices.getUserMedia == "function") {
			return true;
		}
	}
	//show an error alert in the '<div class="webcamalert"></div>' element.
	$(".webcamalert").prepend('<p class="pure-alert error">This browser doesn\'t support the Webcam API!</p>');
	return false;
}
