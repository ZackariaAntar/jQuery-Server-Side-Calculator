$(document).ready(onReady);


let expression;
let operator;

function onReady(){
    $('.input').on('click', displayInput)
    $('#clear').on('click', wipeTheInputs)
    $('#calc').on('submit', postToServer)

    getFromServer()
}

function displayInput(event){
    event.preventDefault()
    $('#exp').append($(this).attr("value"))
    if ($(this).attr("value") == '+'||'-'||'*'||'/'){
        operator = $(this).attr("value");
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
    let current = evaluations.length -1

    $('#that-number').empty()

    $('#that-number').text(evaluations[current])
    $("#history").append(
		`<li class="history">${first} ${operator} ${second} = ${evaluations[current]}</li>`
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