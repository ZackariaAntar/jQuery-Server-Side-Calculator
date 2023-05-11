const express = require("express"); // include express
const bodyParser = require("body-parser"); // include body-parser


const app = express(); // changing how we access express to use app for methods instead.

const port = 5000; // registering port we want to listen on.

app.use(express.static("server/public")); // use the static files in the public folder
app.use(bodyParser.urlencoded({ extended: true })); // configuuring options for body-parser


const calculation = []

function crunchNumbers(){
    let startNum = calculation[calculation.length -1].start;
    let endNum = calculation[calculation.length - 1].end;
    let op = calculation[calculation.length - 1].operator;


}


app.get('/calc', function(req, res) {// establishing the server path for data to travel on. Where to get it from.
  console.log('Requesting Calculator logic');

  res.send();
});

app.post("/calc", function (req, res) {
	// // establishing the server path for response data to travel on. Where to take it to.
console.log("Calculator data was sent");
	calculation.push(req.body); // once at the specified location, store the data.

	res.sendStatus(201);
});




app.listen(port, () => {
	console.log("listening on port", port);
}); // assigning the port to listen on.