

let key;
let keyArr = [];

function main() {
    keySetter();
    getDataFromStorage();
    addNewNote();
    removeNote();
    editNote();
}


function keySetter() {
    key=0;
    for (let i = 0; i < localStorage.length; i++) {
        keyArr.push(parseInt(localStorage.key(i)));
    }

    if(localStorage.length){
        key = Math.max(...keyArr) + 1;
    }



}

function addNewNote() {
    console.log("dupka");
    const addButton = document.querySelector('.add_note');
    console.log(addButton);
    addButton.addEventListener('click', function() {
        const inputValue = document.querySelector('.note_holder').value;
        if(inputValue) {
            createNewTask(inputValue, document.querySelector(".notepad"));
            localStorage.setItem(key.toString(), inputValue);
        }
         })
}


function createNewTask(inputValue, targetNode) {
    const createTask = function (inputValue) {
        const template = document.querySelector('#note-template');
        const clone = document.importNode(template.content, true);
        clone.querySelector('.content_handler').textContent = inputValue;
        return clone;
    };
    const task = createTask(inputValue);
    targetNode.appendChild(task);
}


function getDataFromStorage() {
    for(let i=0; i<localStorage.length; i++) {
        console.log(localStorage.key(i))
        if(localStorage.key(i)) {
            createNewTask(localStorage.getItem(`${localStorage.key(i)}`), document.querySelector(".notepad"));
        }
    }
}



function removeNote() {
    const deleteButton = document.querySelectorAll('.delete');
    deleteButton.forEach(button => button.addEventListener('click', function () {
        this.parentElement.remove();
        for(let i=0; i<localStorage.length; i++) {
                if (localStorage.getItem(`${localStorage.key(i)}`) === this.parentElement.getElementsByClassName("content_handler")[0].innerHTML) {
                    for( let i = 0; i < keyArr.length; i++){
                        if ( keyArr[i] === parseInt(`${localStorage.key(i)}`)) {
                            keyArr.splice(i, 1); }
                    }
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        }
    ))
}


function editNote(){
    const editButton = document.querySelectorAll('.edit');
    editButton.forEach(button=> button.addEventListener('click', function () {
        let noteName = this.parentElement.getElementsByClassName('content_handler').item(0).textContent;
        console.log(noteName);
        let newNoteName = prompt("Edit note: ", noteName);
        if(newNoteName){
            for(let i=0; i<localStorage.length; i++) {
                if (localStorage.getItem(`${localStorage.key(i)}`) === this.parentElement.getElementsByClassName("content_handler")[0].innerHTML) {
                    localStorage.setItem(`${localStorage.key(i)}`, newNoteName);
                }
            }
        }}))

}






main();