let titleInput = document.querySelector("#title");
let descInput = document.querySelector("#desc");
let addNoteBtn = document.querySelector("#add-note-btn");
let clearBtn = document.querySelector("#clear-btn");
let noteMsg = document.querySelector(".note-msg");
let notes = [];
let noteId = 0;
let update = { status: false, id: null };

function addNote() {
    let title = titleInput.value;
    let desc = descInput.value;
    if (title === "") {
        alert("Please enter the title");
        return;
    }
    if (desc === "") {
        alert("Please enter the description");
        return;
    }
    let note = {
        "title": title,
        "description": desc,
        "id": noteId
    }
    notes.push(note);
    addNoteCards();
    titleInput.value = ""
    descInput.value = ""
}


function deleteNote(id) {
    alert("Are you sure, you want to delete this note?")
    let noteId = id.slice(16);
    console.log(noteId)
    document.getElementById(`card-${noteId}`).remove();
    notes.splice(noteId, 1)
    console.log(notes.length, notes)
    if (notes.length === 0) {
        noteMsg.style.display = "block";
    }
}

function getNoteText(id) {
    update.status = true;
    update.id = id;
    let noteId = id;
    let title = document.getElementById("heading-" + noteId).innerText;
    let desc = document.getElementById("desc-" + noteId).innerText;
    addNoteBtn.innerText = "Update";
    titleInput.value = title;
    descInput.value = desc;
}

function updateNote(id) {
    let updatedTitle = titleInput.value;
    let updatedDesc = descInput.value;

    notes.forEach((item, index) => {
        if (index === Number(id)) {
            console.log("This is index ", index)
            item.title = updatedTitle
            item.description = updatedDesc
        }
    });
    addNoteCards();
    titleInput.value = "";
    descInput.value = "";
    addNoteBtn.innerText = "Add note";
    update.status = false;
    update.id = null;
}

addNoteBtn.addEventListener('click', () => {
    if (update.status) updateNote(update.id);
    else addNote();
});

clearBtn.addEventListener('click', () => {
    titleInput.value = "";
    descInput.value = "";
});

function addNoteCards() {
    let cardContainer = document.querySelector(".todo-list");
    let cardHtml = "";
    if (notes.length !== 0) {
        noteMsg.style.display = "none";
    }
    notes.forEach((item, index) => {
        cardHtml += `<div class="card" id=card-${index} >
                        <div class="card-header" id=heading-${index} >
                            ${item.title}
                        </div>
                        <div class="card-body">
                            <p class="card-text" id=desc-${index}>${item.description}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" id="${index}" onClick = "getNoteText(this.id)"> Update </button>
                            <button class="btn btn-outline-danger" id="delete-note-btn-${index}" onClick = "deleteNote(this.id)"> Delete </button>
                        </div>
                    </div>`;
    })
    cardContainer.innerHTML = cardHtml;
}