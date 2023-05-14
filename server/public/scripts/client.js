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



