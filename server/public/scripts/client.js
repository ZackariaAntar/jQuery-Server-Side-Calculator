$(document).ready(onReady);
// setting up global variables to store
let expression;
let operator;
let tracker;

function onReady() {
	// registering our event handlers
	console.log("loaded");
	$(".input").on("click", displayInput);
	$("#clear").on("click", wipeTheInputs);
	$("#calc").on("submit", checkForErrors); // on submit run through checkForErrors before postToServer for exception handling.
	getFromServer();
}

function displayInput(event) {
	// function to capture the values of the .input buttons and display them in the input field.
	event.preventDefault();
	let testParam = new RegExp(/^[0-9.]+$/i); // storing a regular expression to differentiate between numeric and operator values in the testParam variable.
	let validate = testParam.test($(this).attr("value")); // testing the .input value against the testParam and storing the boolean value in the validate variable.
	let input = $(this).attr("value"); // storing the .input value in the input variable.
	tracker += input; // concatenating the .inputs and storing them in the global tracker value.
	$("#exp").val(tracker.replace("undefined", "")); // setting the value of the input field dynamically using the concatenation from tracker+=input and replacing the undefined that also appears.
	if (!validate) {
		// conditional that triggers if one of the .input values does not pass the regex validation test.
		operator = $(this).attr("value"); //store the operator value in the global operator variable if not true (aka doesn't pass)
		console.log("this is an operator", operator);
	}
}

function checkForErrors(event) {
	// exception handling using a regular expression that attempts to ensure only valid athrithmetic sequences are submitted.
	event.preventDefault();
	let checkParam = new RegExp(/^[-]?\d+(\.\d+)?([-+/*]?[-]?\d+(\.\d+)?)*$/gm);
	let entry = $("#exp").val();
	console.log(entry);
	let passParam = checkParam.test(entry);
	if (!passParam) {
		// tried || tracker.replace("undefined", "") <= 1
		alert(
			`Yoooooo, you good? ${tracker.replace(
				"undefined",
				""
			)} is invalid. Please try again.`
		);
		tracker = "";
		$("#exp").val(tracker);
	} else {
		postToServer();
	}
	//somthing like:
	//if ($('#exp').val() !regex){
	//alert(try again you little knuckle head.)
	//$('#exp').empty()
	//}else postToServer()
}

function postToServer() {
	// once a valid input has been submitted post the input to the server.
	console.log("posted");
	expression = $("#exp").val();
	$.ajax({
		method: "POST",
		url: "/calc",
		data: {
			exp: expression, // entire input field string
			oper: operator, // operator used during calculation.
		},
	})
		.then(function (response) {
			// after posting try to get data back from server.
			tracker = "";
			$("#exp").val("");
			getFromServer();
		})
		.catch(function (error) {
			console.log("whoops!", error);
		});
}

function getFromServer() {
	$.ajax({
		method: "GET",
		url: "/calc",
	})
		.then(function (response) {
			// after data has returned, use it in the renderToDOM function.
			renderToDOM(response);
		})
		.catch(function (error) {
			// console.log("whoops!", error);
			renderToDOM(response);
		});
}

function renderToDOM(evaluations) {
	let current = evaluations[evaluations.length - 1]; // setting current to the last object in the array stored on the server.
	$("#that-number").empty(); // clear the text in the area were going to put the result in.
	$("#that-number").text(current.ev); // put the result in that area.
	$("#history").append(`<li class="history"> </li>`); // add an li element to the DOM
	$("li").last().empty(); // empty the text in the last li element.
	$("li").last().text(current.history); // put the expression string text in the last li element on the DOM.
}

function wipeTheInputs(event) {
	// function to run when the clear button is pressed.
	event.preventDefault();
	$("li").last().remove(); //attempts to remove the last li element on the DOM.
	$.ajax({
		// ajax delete call.
		method: "DELETE",
		url: "/calc",
	})
		.then(function (response) {
			// get the data back from the server after the delete call is complete.
			getFromServer();
		})
		.catch(function (error) {
			console.log("Whoopsies!", error);
		});
}

// let index = $('li:last-child').data('index')

// might not need to use this since I'm not trying to delete by clicking on the actual list item?
// intuitively the clear button should .pop the last thing added to the array on server and then rerender.
