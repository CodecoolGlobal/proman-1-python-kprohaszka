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
        let i = 0;
        //make the button id unique
        for (let board of boards) {
            boardList += `
                <section class="board" id="${board.id}">
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add">Add Card</button>
                <button data-board-id="${board.id}" id="button_board${board.id}" type="button"   class="board-toggle valami" data-toggle="collapse" data-target="#board${board.id}" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns collapse" id="board${board.id}">
            <div class="board-column" data-status="${statuses[0].id}" id="status${statuses[0].id}">
                    <div class="board-column-title">${statuses[0].title}</div>
                    <div class="card-container"></div>
                </div>
                <div class="board-column" data-status="${statuses[1].id}" id="status${statuses[1].id}">
                    <div class="board-column-title">${statuses[1].title}</div>
                    <div class="card-container"></div>
                </div>
                <div class="board-column" data-status="${statuses[2].id}" id="status${statuses[2].id}">
                    <div class="board-column-title">${statuses[2].title}</div>
                    <div class="card-container"></div>
                </div>
                <div class="board-column" data-status="${statuses[3].id}" id="status${statuses[3].id}">
                    <div class="board-column-title">${statuses[3].title}</div>
                    <div class="card-container"></div>
                </div>
            </div>
            </section>
            `;

        }

        const outerHtml = `
            <div class="board-container">
                ${boardList}
            </div>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
        for(let button of document.querySelectorAll(".board-toggle")){
            button.addEventListener("click",(event) => dom.loadCards(button.dataset.boardId))
        }
    },


    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId,function (cards) {
        dom.showCards(cards, boardId);
        });

    },
    showCards: function (cards, boardId) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let newCards = '';
        let inprogressCards='';
        let testingCards = '';
        let doneCards = '';
        // refine it to match design template
        for (let card of cards) {
            if (card.status_id === 0) {
                newCards += `<div className="card" id="card${card.id}" status="${card.status_id}"> 
                    <div className="card-title">${card.title}</div>
                </div>`

            } else if (card.status_id === 1) {
                inprogressCards += `<div className="card" id="card${card.id}" status="${card.status_id}">
                    <div className="card-title">${card.title}</div>
                </div>`
            }
            else if (card.status_id === 2) {
                testingCards += `<div className="card" id="card${card.id}" status="${card.status_id}">
                    <div className="card-title">${card.title}</div>
                </div>`
            }
            else if (card.status_id === 3) {
                doneCards += `<div className="card" id="card${card.id}" status="${card.status_id}">                    
                    <div className="card-title">${card.title}</div>
                </div>`
            }
        }
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="0"] .card-container`).innerHTML = newCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="1"] .card-container`).innerHTML = inprogressCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="2"] .card-container`).innerHTML = testingCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="3"] .card-container`).innerHTML = doneCards
    },
    // here comes more features
};
