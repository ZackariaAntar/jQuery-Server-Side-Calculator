$(document).ready(onReady);


let expression;
let operator;
let tracker;


function onReady(){
    console.log('loaded');
    $('.input').on('click', displayInput)
    $('#clear').on('click', wipeTheInputs)
    $('#calc').on('submit', postToServer)
    // getFromServer()
}

function displayInput(event){
    event.preventDefault();
    let testParam = new RegExp(/^[a-z0-9.]+$/i);
    let validate = testParam.test($(this).attr("value"));
    let input = $(this).attr("value");
    tracker+= input
    console.log('clicked');
    console.log(input);
    console.log(tracker);
    $("#exp").val(tracker.replace("undefined",''));
    if (!validate){
        operator = $(this).attr("value");
        console.log("this is an operator", operator);
    }

    // conditional to grab the operator which might be helpful to also send on server side for calc conditional.
}


function postToServer(event){
    event.preventDefault()
    expression = $('#exp').val()
    $.ajax({
        method: 'POST',
        url: '/calc',
        data:{
            exp: expression,
            oper: operator,
        }
    }).then(function(response){
        getFromServer();
    }).catch(function(error){
        console.log("whoops!", error);
    })


}

function getFromServer() {
    $.ajax({
		method: "GET",
		url: "/calc",
	}).then(function (response) {
			renderToDOM(response);
		}).catch(function (error) {
			console.log("whoops!", error);
		});


}

function renderToDOM(evaluations){
    let current = evaluations[evaluations.length -1]

    $('#that-number').empty()
    $('#that-number').text(current.eval)
    $("#history").append(
		`<li class="history">${current.history} = ${current.eval} </li>`
	);
}

function wipeTheInputs(){
    $("#exp").val("");
}





// keeping these here for easy reference.

// <form id="calc">
//      <input type="number" id="first">
//             <button value="+" id="plus" >+</button>
//             <button value="-" id="minus" >-</button>
//             <button value="*" id="times" >*</button>
//             <button value="/" id="divide" >/</button>
//      <input type="number" id="second">
//             <button value="=" type="submit" id="equals">=</button>
//             <button value="c" type="reset" id="clear">C</button>
// </form>