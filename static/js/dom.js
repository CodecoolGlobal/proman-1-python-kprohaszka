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
                <section class="board" id="${board.id}">
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add" id="add-new-card">Create new card</button>
                <button type="button"  class="board-toggle" data-toggle="collapse" data-target="#board${board.id}" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns collapse" id="board${board.id}">
            <div class="board-column">
                    <div class="board-column-title" data-board-id="${board.id}" id="${statuses.id[0]}">${statuses.title[0]}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title" id="${statuses.id[1]}">${statuses.title[0]}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title" id="${statuses.id[2]}">${statuses.title[0]}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title" id="${statuses.id[3]}">${statuses.title[0]}</div>
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
        document.getElementById("add-new-card").addEventListener("click", dom.createNewCard)

    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    createNewCard: function () {
        let inputText = window.prompt("Enter a card title : ");
        let column = document.getElementById("new")
        column.innerHTML +=
            `<div className="card">
                    <div className="card-remove"><i className="fas fa-trash-alt"></i></div>
                    <div className="card-title">`
        InputText`</div>
                </div>`;
        let boardId = column.dataset["boardId"]
        dataHandler.createNewCard(inputText, boardId, 1, function () {
            console.log("valami")
        })
        // creates new card, saves it and calls the callback function with its data
    }
    // here comes more features
};
