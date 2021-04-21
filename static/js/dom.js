// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dataHandler.getStatuses(function (statuses){
            dom.showBoards(boards, statuses);
            })
        });

    },
    showBoards: function (boards, statuses) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardList = '';

        for (let board of boards) {
            boardList += `
                <section class="board" id="${boards.id}">
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add">Add Card</button>
                <button onclick="loadCards(${board.id})" id="button_board${board.id}" type="button"  class="board-toggle" data-toggle="collapse" data-target="#board${board.id}" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns collapse" id="board${board.id}">
            <div class="board-column">
                    <div class="board-column-title" id="status${statuses[0].id}">${statuses[0].title}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title" id="status${statuses[1].id}">${statuses[1].title}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title" id="status${statuses[2].id}">${statuses[2].title}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title" id="status${statuses[3].id}">${statuses[3].title}</div>
                </div>
            </div>
            </section>
            `;
            document.getElementById("button_board"+board.id).addEventListener("click", dom.loadCards(board.id))
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
        dataHandler.getCardsByBoardId(function (boardId) {
        dom.showCards(cards);
        });

    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    console.log("hello")
    },
    // here comes more features
};
