//creates new object
// class creates an object
const xhr = new XMLHttpRequest();
//waits for an event the runs a function
//(load means the response has been loaded, function we run after this event)
//setup evenListener first before requesting.
xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
})

//sets the request method.
xhr.open('GET', 'https://supersimplebackend.dev')
//initiates the request
xhr.send()
//returns the response body
//undefined at first, takes time for request to travel across the internet.
// xhr.response()