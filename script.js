
let notes = [];

function showNotes() {
    document.getElementById('myNotes').innerHTML = ''; //Liste myNotes soll gelöscht werden, da sonst alle bestehenden noch ein mal angezeigt werden

    notes = getArray('notes'); //array aufrufen

    for (let i = 0; i < notes.length; i++) {
        myNotes.innerHTML += `
        <div class="notes">
        ${notes[i]}
        <div class="notes-btn-container">
        <button class="delete-btn" onclick="deleteNote(${i})">Löschen</button>
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

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
    // gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])
}

function deleteNote(position) {
    notes.splice(position, 1);
    setArray('notes', notes); // aktualisiert local storage, da sonst die notiz noch dort drinsteht udn durch shownotes auch weiterhin angezeigt wird
    showNotes(); 
}


// add note with enter
function init() {
    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {  
            let completeid = document.activeElement.id;
            let id = completeid.replace( /^\D+/g, '');
            console.log(completeid);
            addNote(id);
        }
    });
}


