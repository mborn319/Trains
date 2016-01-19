$(document).ready(function() {
	//use this function to initiate anything that has to be done AFTER the page loads - like attach event handlers.

	$("#sayHiBtn").on("click",sayHi);

	//start capturing slider value events and sending them to the PHP file.
	setupSlider({
		sliderid: "#speedSlider",
		messageDiv: "#speedHere",
		dataAction: "speed-control"
	});

	setupSlider({
		sliderid: "#volumeSlider",
		messageDiv: "#volumeHere",
		dataAction: "volume-control"
	});
});
function setupSlider(options) {
	/**
	* setupSlider()
	* \description
	* 	the beauty of this super-function is that we can use it for a gazillion different sliders
	* 	and send different data from each.
	* 	The data is always sent as action,param, where action is static for the slider, and param is the value of the slider.
	* \param {object} options - this is an object of options. Sliderid, messageDiv, and dataAction are all REQUIRED.
	* \returns {object} slider element.
	*/
	var whenChanged = function(event) {
		/**
		* whenChanged()
		* \brief this function is called by the event listener when a user changes the slider value.
		* \param {none}
		* returns {object} returns the slider control object.
		*/
		var slider = event.target;

		var data = {
			action: options.dataAction,
			param: slider.value
		};
		var whenDone = function(json) {
			$(options.messageDiv).html('<p class="pure-alert primary">' + json.message + 'mph</p>');
		};
		//send the data. We don't really care what it says back,
		//but we'll print it in a fancy alert message anyway.
		sendToPHP("/ajax.php",data,whenDone);
	};
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
	$(options.sliderid).on("change",whenChanged)

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
