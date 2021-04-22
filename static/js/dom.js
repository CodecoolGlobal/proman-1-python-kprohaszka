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
            addBoardButton.addEventListener('click', this.createBoard);
        },
    createBoard: function (){
       let titleInput = window.prompt("Board name?");
       let boardContainer = document.getElementById("boards");
       boardContainer.innerHTML += `
            <div class="board-header"><span class="board-title">${titleInput}</span>
            `
        dataHandler.createNewBoard(titleInput, function (){console.log("DOOM METAL")})
    },
};
