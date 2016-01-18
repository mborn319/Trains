$(document).ready(function() {
	//use this function to initiate anything that has to be done AFTER the page loads - like attach event handlers.

	document.getElementById("webcamBtn").addEventListener("click",startWebcam);
	document.getElementById("sayHiBtn").addEventListener("click",sayHi);

	setupSlider("speedSlider");
});
function setupSlider(sliderid) {

	var whenChanged = function(event) {
		/**
		* whenChanged()
		* \brief this function is called by the event listener when a user changes the slider value.
		* \param {none}
		* returns {object} returns the slider control object.
		*/
		var slider = event.target;
		console.log("Value is changed!",slider.value);

		var data = {
			action: "speed-control",
			speed: slider.value
		};
		var whenDone = function(json) {
			$(".speedHere").html('<p class="pure-alert primary">Speed is now: ' + json.message + 'mph</p>');
		};
		//send the data. We don't really care what it says back,
		//but we'll print it in a fancy alert message anyway.
		sendToPHP("/ajax.php",data,whenDone);
	}
	var sendToPHP = function(url,datToSend,callback) {
		/**
		* sendToPHP()
		* \brief - this function sends data to a PHP file
		* 		and returns JSON (or errors if return data is not json.)
		* \param {string} url - URL of the page to post data to.
		* \param {object} datToSend - an object of all the data we want to send to the PHP file.
		* \param {function} - callback. This is a function which we call when the page responds.
		* \returns $.ajax for advanced jQuery/Zepto stuff.
		*/
		return $.ajax({
			type: "POST",
			url: url,
			data: datToSend,
			complete: function(returnData) {
				var json = JSON.parse(returnData.response);
				if (typeof callback == "function") {
					callback(json);
				}
			}
		});
	};


	//add the event listener to the slider control
	 document.getElementById(sliderid).addEventListener("change",whenChanged)

}
function sayHi() {
	/**
	* sayHi()
	* \brief This is a very simple example of an ajax POST request.
	* 		it sends some data to ajax.php and receives an answer in JSON format.
	* 		it then parses that response into a Javascript opject and displays the message part in the HTML.
	* \param {none}
	* \return {boolean} false - to prevent the <a> tag from following its URL.
	*/

	$.ajax({
		type: "POST",		//send variables in the POST scope, not in GET scope.
		url: "/ajax.php?", //call ajax.php.
		data: {action: "sayHi"},//can be accessed in ajax.php like $_POST['action']
		complete: function(returnData) {//HTTP response
			//assume JSON!!
			//Note this line will fail if you return invalid JSON.
			//To account for that problem, you can wrap a try{...} catch{} block around it.
			//See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#Unconditional_catch_clause
			var json = JSON.parse(returnData.response);

			//put the message in a fancy little alert...
			$(".ajaxAlert").prepend('<p class="pure-alert primary">The server says: ' + json.message + '</p>');
		}
	});
};
function startWebcam() {
	/**
	* startWebcam()
	* \brief this function is used to setup the webcam.
	* 		It asks for permission from the browser, initiates the video stream,
	* 		sends the video stream to a <video> tag,
	* 		and shows the <video> tag.
	* 		Please note this function is called by the click event from the #webcamBtn.
	* \param {none}
	* \return {boolean} false - to prevent the <a> tag from following its URL.
	*/
	videoTag = document.querySelector('#webcam');

	var browserSupportsWebcamAPI = function() {
		/**
		* browserSupportsWebcamAPI()
		* \brief This function does a test to see if navigator.mediaDevices exists.
		* 		if the browser does NOT support it, this function puts an error alert in the .webcamalert div.
		* \param {none}
		* \returns {boolean} - true if webcam api is supported, false if not supported.
		*/
		if (typeof navigator.mediaDevices == "object") {
			if (typeof navigator.mediaDevices.getUserMedia == "function") {
				return true;
			}
		}
		//show an error alert in the '<div class="webcamalert"></div>' element.
		$(".webcamalert").prepend('<p class="pure-alert error">This browser doesn\'t support the Webcam API!</p>');
		return false;
	}

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
		p.catch(function(e) {
			//permission denied error, most likely.
			console.log(e.name);
		}); // always check for errors at the end.
	}
	return false;
};
