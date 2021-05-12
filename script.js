
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
    if (trash == '') {
        myTrash.innerHTML = `<span class="empty-trash">Der Papierkorb ist leer.</span>`;
    } else {
        for (let i = 0; i < trash.length; i++) {
            myTrash.innerHTML += `
        <div class="notes">
        ${trash[i]}
        <div class="notes-btn-container">
        <button class="delete-btn" onclick="deleteNote(${i})">Löschen</button>
        </div>
        </div>`;
        }
    }

}

// function delete note in trash array
function deleteNote(position) {
    trash.splice(position, 1);
    setArray('trash', trash); 
    // aktualisiert local storage, da sonst die notiz noch dort drinsteht udn durch shownotes auch weiterhin angezeigt wird
    showTrash();
}

// function to delete note and move note to trash
function moveDeletedNote(i) {
    let trashNote = notes[i] // defines variable for deleted note
    notes.splice(i, 1); // deletes note in notes 
    // let trashNote = notes[i]; // der pusht das ganze array rein, anstatt nur die gelöschte position, wenn ich aber noch [i] dahinter schreibe, funktioniert es beim erneuten aufruf nicht und es ist kein array
    trash.push(trashNote); // pushes text in trash array
    setArray('trash', trash);
    setArray('notes', notes); // aktualisiert local storage, da sonst die notiz noch dort drinsteht udn durch shownotes auch weiterhin angezeigt wird
    showNotes();

}

// opens trash
function openTrash() {
    document.getElementById('myTrash').style.display = "flex"; // show trash
    document.getElementById('noteInput').style.display = "none"; // hides input field
    document.getElementById('myNotes').style.display = "none"; // hides input field
    document.getElementById('navNotes').classList.remove('navi-left-active');
    document.getElementById('navTrash').classList.add('navi-left-active');
    document.getElementById('activeNavi').innerHTML = 'Papierkorb';
    closeMobileMenu()
    showTrash();
}
// opens notes
function openNotes() {
    document.getElementById('navTrash').classList.remove('navi-left-active');
    document.getElementById('navNotes').classList.add('navi-left-active');
    document.getElementById('noteInput').style.display = "flex"; // show input field
    document.getElementById('myNotes').style.display = "flex"; // shows input field
    document.getElementById('myTrash').style.display = "none"; // hodes trash
    document.getElementById('activeNavi').innerHTML = 'Notizen';
    closeMobileMenu()
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

//open mobile Menu
function openMobileMenu(){
    //document.getElementById('mobileMenu').classList.remove('hide'); //show container
    let menu = document.getElementById('menu').innerHTML; // define variable for menu / nav
    // puts menu into mobileMenu
    document.getElementById('mobileMenu').innerHTML = ` 
    <div class="mobile-menu">
    <div class="close-mobile-menu" onclick="closeMobileMenu()">Schließen</div>
    ${menu}
    </div>
    `;
}

// close mobile menu
function closeMobileMenu(){
    document.getElementById('mobileMenu').innerHTML = '';
}
