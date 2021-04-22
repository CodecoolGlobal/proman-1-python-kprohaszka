// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <li>${board.title}</li>
            `;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
    // ADD Board
    addBoardButtonToggle: function()
        {
            let addBoardButton = document.getElementById('add-board');
            addBoardButton.addEventListener('click', addNewBoard);

        function addNewBoard() {
            document.getElementById('add-board').disabled = true;
            createInputForNewBoard()}

        function createInputForNewBoard()
            {
            document.getElementById('new-board-input').hidden = false;
            let saveButton = document.getElementById('create-board');
            let cancelButton = document.getElementById('cancel-board');
            saveButton.addEventListener('click', dom.createBoard);
            cancelButton.addEventListener('click', closeForm);}

        function closeForm() {
            document.getElementById('new-board-input').hidden = true;
            document.getElementById('new-board-input').value = '';
            document.getElementById('add-board').disabled = false;}

    },
    createBoard: function (){
       let titleInput = window.prompt("Howdy?");
       let boardContainer = document.getElementById("boards");
            boardContainer.innerHTML += `
            <h1>`+ titleInput +`</h1>
            `
        dataHandler.createNewBoard(titleInput, function (){console.log("DOOM METAL")})
    },
};
