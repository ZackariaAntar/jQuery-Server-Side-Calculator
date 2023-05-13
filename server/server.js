const express = require("express"); // include express
const bodyParser = require("body-parser"); // include body-parser


const app = express(); // changing how we access express to use app for methods instead.

const port = 5000; // registering port we want to listen on.

app.use(express.static("server/public")); // use the static files in the public folder
app.use(bodyParser.urlencoded({ extended: true })); // configuuring options for body-parser



const answer = []


app.get('/calc', function(req, res) {// establishing the server path for data to travel on. Where to get it from.
  console.log('Requesting Calculator logic');

  res.send(answer);
});

app.post("/calc", function (req, res) {
	// // establishing the server path for response data to travel on. Where to take it to.
	console.log("Calculator data was sent");
	// string.substring(0, string.indexOf(character)); //// before the special character

	// string.substring(string.indexOf(character) + 1) //// after special character.

	if (req.body.oper === "+") {
		let eval = req.body.first * 1 + req.body.second * 1;
		answer.push(eval);
	} else if (req.body.oper === "-") {
		let eval = req.body.first - req.body.second;
		answer.push(eval);
	} else if (req.body.oper === "*") {
		let eval = req.body.first * req.body.second;
		answer.push(eval);
	} else if (req.body.oper === "/") {
		let eval = req.body.first / req.body.second;
		answer.push(eval);
	}

	res.sendStatus(201);
});






app.listen(port, () => {
	console.log("listening on port", port);
}); // assigning the port to listen on.