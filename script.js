
let notes = [];
let trash = [];

function showNotes() {
    document.getElementById('myNotes').innerHTML = ''; //Liste myNotes soll gelöscht werden, da sonst alle bestehenden noch ein mal angezeigt werden
    trash = getArray('trash');
    notes = getArray('notes'); //array aufrufen

    for (let i = 0; i < notes.length; i++) {
        myNotes.innerHTML += `
        <div class="notes">
        ${notes[i]}
        <div class="notes-btn-container">
        <button class="delete-btn" onclick="moveDeletedNote(${i})">Löschen</button>
        </div>
        </div>`;
    }
    document.getElementById('note').value = ''; // Wert aus Eingabefeld rauslöschen
}


function addNote() {
    let text = document.getElementById('note').value; // füge die Notizen aus dem Feld mit der id "note" der variablen "text" hinzu
    if (text == '') {
        alert('Bitte etwas eintragen!');
        } else {
    notes.push(text); // füge den text dem array "notes" hinzu
   
    setArray('notes', notes); // array bestimmen
   
    showNotes(); //führe Funktion showNotes aus, damit die Notizen angezeigt werden
        }
}

// show trash notes in trash
function showTrash() {
    document.getElementById('myTrash').innerHTML = ''; //Liste myTrash soll gelöscht werden, da sonst alle bestehenden noch ein mal angezeigt werden
    trash = getArray('trash');

    for (let i = 0; i < trash.length; i++) {
        myTrash.innerHTML += `
        <div class="notes">
        ${trash[i]}
        <div class="notes-btn-container">
        <button class="delete-btn" onclick="moveDeletedNote(${i})">Löschen</button>
        </div>
        </div>`;
    }

}
/*
// function delete note in array and move into trash array
function deleteNote(position) {
    notes.splice(position, 1);
    setArray('notes', notes); // aktualisiert local storage, da sonst die notiz noch dort drinsteht udn durch shownotes auch weiterhin angezeigt wird
    showNotes(); 
}
*/
// function to delete note and move note to trash
function moveDeletedNote(i){
    let trashNote = notes.splice(i, 1); // deletes note in notes and defines variable to push into trash array
   // let trashNote = notes[i]; // der pusht das ganze array rein, anstatt nur die gelöschte position, wenn ich aber noch [i] dahinter schreibe, funktioniert es beim erneuten aufruf nicht und es ist kein array
    trash.push(trashNote); // pushes text in trash array
    setArray('trash', trashNote);
    setArray('notes', notes); // aktualisiert local storage, da sonst die notiz noch dort drinsteht udn durch shownotes auch weiterhin angezeigt wird
    showNotes(); 

// PROBLEM: pusht immer nur das akutell in den trash; überschreibt bestehendes; immer nur ein element im trash
}

// opens trash
function openTrash(){
    document.getElementById('myTrash').style.display = "inherit"; // show trash
    document.getElementById('noteInput').style.display = "none"; // hides input field
    document.getElementById('myNotes').style.display = "none"; // hides input field
    showTrash();
}
// opens notes
function openNotes(){
    document.getElementById('noteInput').style.display = "inherit"; // show input field
    document.getElementById('myNotes').style.display = "inherit"; // shows input field
    document.getElementById('myTrash').style.display = "none"; // hodes trash
    showNotes();
}
// sets arry in local storage
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
    // gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])
}


