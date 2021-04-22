import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    // adds boards to the table when clicked
    addBoardButtonToggle();
}

window.onload = init

// ADD Board
function addBoardButtonToggle()
{
    let addBoardButton = document.getElementById('add-board');
    addBoardButton.addEventListener('click', addNewBoard);
}


function addNewBoard() {
    document.getElementById('add-board').disabled = true;
    createInputForNewBoard()
}


function createInputForNewBoard()
{
    document.getElementById('new-board-input').hidden = false;
    let saveButton = document.getElementById('create-board');
    let cancelButton = document.getElementById('cancel-board');
    //saveButton.addEventListener('click', );
    cancelButton.addEventListener('click', closeForm);
}

function closeForm() {
    document.getElementById('new-board-input').hidden = true;
    document.getElementById('new-board-input').value = '';
    document.getElementById('add-board').disabled = false;
}