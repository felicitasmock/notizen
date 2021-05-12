let notes = [];
let trash = [];

/**
 * function to load json from server
 */
async function init() {
    setURL('http://felicitas-mock.developerakademie.com/smallest_backend_ever');
    await downloadFromServer();
    showNotes();
}

/**
 * function to show loaded notes and trash notes from server
 */
function showNotes() {
    document.getElementById('myNotes').innerHTML = ''; //Liste myNotes soll gelöscht werden, da sonst alle bestehenden noch ein mal angezeigt werden
    //notes = JSON.parse(backend.getItem('notes')) || [];
    //trash = JSON.parse(backend.getItem('trash')) || [];
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

/**
 * function to add a note
 */
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

/**
 * function to show deleted (moved) notes in trash
 */
async function showTrash() {
    document.getElementById('myTrash').innerHTML = ''; //Liste myTrash soll gelöscht werden, da sonst alle bestehenden noch ein mal angezeigt werden
    trash = await getArray('trash');
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
                </div>
            `;
        }
    }
}

/**
 * function to delete note in trash (forever)
 * 
 * @param {number} position - This is the variable of the deleted note
 */
function deleteNote(position) {
    trash.splice(position, 1);
    setArray('trash', trash);
    showTrash();
}

/**
 * function to "delete" note out of notes - and moves into trash 
 * 
 * @param {number} i - This is the variable of the deleted/moved note
 */
function moveDeletedNote(i) {
    let trashNote = notes[i] // defines variable for deleted note
    notes.splice(i, 1); // deletes note in notes 
    // let trashNote = notes[i]; // der pusht das ganze array rein, anstatt nur die gelöschte position, wenn ich aber noch [i] dahinter schreibe, funktioniert es beim erneuten aufruf nicht und es ist kein array
    trash.push(trashNote); // pushes text in trash array
    setArray('trash', trash);
    setArray('notes', notes); // aktualisiert local storage, da sonst die notiz noch dort drinsteht udn durch shownotes auch weiterhin angezeigt wird
    showNotes();
}

/**
 * function to open trash / navi
 */
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

/**
 * function to open notes / navi
 */
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

/**
 * function to open mobile menu / navi
 */
function openMobileMenu() {
    let menu = document.getElementById('menu').innerHTML; // define variable for menu / nav
    
    // puts menu into mobileMenu
    document.getElementById('mobileMenu').innerHTML = ` 
        <div class="mobile-menu">
        <div class="close-mobile-menu" onclick="closeMobileMenu()">Schließen</div>
        ${menu}
        </div>
    `;
}

/**
 * function to close mobile menu
 */
function closeMobileMenu() {
    document.getElementById('mobileMenu').innerHTML = '';
}

/**
 * function to sets JSON on server
 * 
 * @param {string} key - This is the variable for the key to set JSON on server
 * @param {string} array - This is the variable for the array saved on server
 */
async function setArray(key, array) {
    await backend.setItem(key, JSON.stringify(array));
}

/**
 * function to get saved JSON on server
 * 
 * @param {string} key - This is the variable for the key to get JSON from server
 * @returns - returns saved JSON from Server
 */
function getArray(key) {
    return JSON.parse(backend.getItem(key)) || [];
    // gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])
}