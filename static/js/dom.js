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

    // statuses : dataHandler.getStatuses(data=>data),

    showBoards:async function (boards) {
        let statuses = await dataHandler.getStatuses(data=>{console.log(data[0].id);return data})
        console.log(statuses)
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for (let board of boards) {
            boardList += `
                <section class="board" id="board-${board.id}">
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add" data-board-id="${board.id}" id="add-new-card">Create new card</button>
                <button type="button"  class="board-toggle" data-toggle="collapse" data-target="#board${board.id}" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
            </div>
<!--            <div class="board-columns collapse" id="board${board.id}"-->
            <div class="board-column">
                    <div class="board-column-title" id="column-${board.id}-${statuses[0].id}">${statuses[0].title}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title"  id="column-${board.id}-${statuses[1].id}">${statuses[1].title}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title" id="column-${board.id}-${statuses[2].id}">${statuses[2].title}</div>
                </div>
                <div class="board-column">
                    <div class="board-column-title"  id="column-${board.id}-${statuses[3].id}">${statuses[3].title}</div>
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
    createNewCard: function (event) {
        console.log(event)
        let inputText = window.prompt("Enter a card title : ");
        let column = document.getElementById(`column-${event.target.dataset["board-id"]}-0`)
        column.innerHTML +=
            `<div class="card">
                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div class="card-title">${inputText}</div>
                </div>`;
        let boardId =  `board-${event.target.dataset["board-id"]}`
        dataHandler.createNewCard(inputText, boardId, 0, function () {
            console.log("valami")
        })
        // creates new card, saves it and calls the callback function with its data
    }
    // here comes more features
};
