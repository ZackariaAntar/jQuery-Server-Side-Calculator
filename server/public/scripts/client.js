$(document).ready(onReady);

let operator ='';
let first ='';
let second = '';

function onReady(){
    $('.oper').on('click', tempMem)
    $('#clear').on('click', wipeTheInputs)
    $('#calc').on('submit', postToServer)

    getFromServer()
}

function tempMem(event){
    event.preventDefault()
    operator = $(this).attr("value");
}


function postToServer(event){
    event.preventDefault()
     first = $('#first').val()
     second = $('#second').val()
    $.ajax({
        method: 'POST',
        url: '/calc',
        data:{
            first: first,
            oper: operator,
            second: second,
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
    $("#first").val("");
	$("#second").val("");
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