console.log("Well come to magic note");
showNotes();
//when a user gives any input add it to localstorage
let addBtn = document.getElementById('addBtn');
//when some click on add Note funtion will run
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    //what is in localStorage with name notes take it 
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        // When receiving data from a web server, the data is always a string.
        // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
        // JSON.parse turns a string of JSON text into a JavaScript object
        notesObj = JSON.parse(notes);
    }
    //adding value to array
    notesObj.push(addTxt.value);
    //updating the local storage and adding in notes after changing the array to string
    // JSON.stringify turns a JavaScript object into JSON text and stores that JSON text in a string,
    localStorage.setItem("notes", JSON.stringify(notesObj));

    //after submitting the submitting space will clear
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
});
//function to show whats note in the local storage
function showNotes() {
    //what is in localStorage with name notes take it 
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj =[];
    }
    else {
        // When receiving data from a web server, the data is always a string.
        // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
        notesObj = JSON.parse(notes);
    }
    let html = "";
    let html1=`<div class="noNote">
                <p>There is no Note! Use "Add a Note " to add notes</P>
                </div>`
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard card" id="notecard" style="width:;">
            <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element }</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="delete-btn">Delete Note</button>
            </div>
        </div>
        `;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML= html1;
    }
}

//function to delete notes
function deleteNote(index){
//console.log('Node deleted:',index);
//what is in localStorage with name notes take it 
let notes = localStorage.getItem("notes");
if (notes == null) {
    notesObj = [];
}
else {
    // When receiving data from a web server, the data is always a string.
    // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    notesObj = JSON.parse(notes);
}
//splice takes a index and delete after given no of element
notesObj.splice(index,1);
//updating the local storage
localStorage.setItem("notes", JSON.stringify(notesObj));
showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        console.log(cardTxt);
    })
})