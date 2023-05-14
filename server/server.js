const express = require("express"); // include express
const bodyParser = require("body-parser"); // include body-parser

const app = express(); // changing how we access express to use app for methods instead.

const port = 5000; // registering port we want to listen on.

app.use(express.static("server/public")); // use the static files in the public folder
app.use(bodyParser.urlencoded({ extended: true })); // configuuring options for body-parser

const answer = [];
const history = [];
const cache = {};

app.get("/calc", function (req, res) {
	// establishing the server path for data to travel back to the client.
	console.log("Requesting Calculator logic");

	res.send(answer); // sends the ansder array of objects back to the client side
});

app.post("/calc", function (req, res) {
	// // establishing the server path for post data to travel on.
	console.log("Calculator data was sent", req.body);
	history.push(req.body); // saving the integrity of the inputs
	// string.substring(0, string.indexOf(character)); //// before the special character
	// string.substring(string.indexOf(character) + 1) //// after special character.

	// logic below compares the value of the oper property against hard coded operator strings
	// once the operator is matched, then complete the calculation by capturing the numbers before and after the operator
	// store the result in the cache.ev property, store the original expression in the history property, and push it to the array to be returned in the GET call.

	if (req.body.oper === "+") {
		let history = req.body.exp;
		let firstNum = req.body.exp.substring(0, req.body.exp.indexOf("+"));
		let nextNum = req.body.exp.substring(req.body.exp.indexOf("+") + 1);
		cache.ev = firstNum * 1 + nextNum * 1;
		cache.history = history;
		answer.push(cache);
	} else if (req.body.oper === "-") {
		let history = req.body.exp;
		let firstNum = req.body.exp.substring(0, req.body.exp.indexOf("-"));
		let nextNum = req.body.exp.substring(req.body.exp.indexOf("-") + 1);
		cache.ev = firstNum - nextNum;
		cache.history = history;
		answer.push(cache);
	} else if (req.body.oper === "*") {
		let history = req.body.exp;
		let firstNum = req.body.exp.substring(0, req.body.exp.indexOf("*"));
		let nextNum = req.body.exp.substring(req.body.exp.indexOf("*") + 1);
		cache.ev = firstNum * nextNum;
		cache.history = history;

		answer.push(cache);
	} else if (req.body.oper === "/") {
		let history = req.body.exp;
		let firstNum = req.body.exp.substring(0, req.body.exp.indexOf("/"));
		let nextNum = req.body.exp.substring(req.body.exp.indexOf("/") + 1);
		cache.ev = firstNum / nextNum;
		cache.history = history;
		answer.push(cache);
	}

	res.sendStatus(201);
});

app.delete("/calc", function (req, res) {
	console.log("Delete request was sent");
	answer.pop(); // remove the last object in the answer array
	res.sendStatus(201);
});

app.listen(port, () => {
	console.log("listening on port", port);
}); // assigning the port to listen on.
