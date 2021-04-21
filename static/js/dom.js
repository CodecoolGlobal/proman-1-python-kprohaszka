// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for (let board of boards) {
            boardList += `
                <section class="board" id="${boards.id}">
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add" id="add" onclick="createNewCard()">Create new card</button>
                <button type="button"  class="board-toggle" data-toggle="collapse" data-target="#board${board.id}" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns collapse" id="board${board.id}">
            <div class="board-column">
                    <div class="board-column-title" id="new">New</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">In Progress</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                </div>
            </div>
            </section>
            `;
        }

        const outerHtml = `
            <div class="board-container">
                ${boardList}
            </div>>
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
};
