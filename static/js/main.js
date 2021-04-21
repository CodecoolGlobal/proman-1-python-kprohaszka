import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
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
}