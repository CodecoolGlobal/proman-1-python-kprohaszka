// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dataHandler.getStatuses(function (statuses) {
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
                <button class="card-add-btn" data-board-id="${board.id}" id="add-new-card">Create new card</button>
                <button data-board-id="${board.id}" id="button_board${board.id}" type="button"   class="board-toggle valami" data-toggle="collapse" data-target="#board${board.id}" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns collapse" id="board${board.id}">
            <div class="board-column" data-status="${statuses[0].id}" id="status${statuses[0].id}">
                    <div class="board-column-title">${statuses[0].title}</div>
                    <div class="card-container" id="column-${board.id}-${statuses[0].id}"></div>
                </div>
                <div class="board-column" data-status="${statuses[1].id}" id="status${statuses[1].id}">
                    <div class="board-column-title">${statuses[1].title}</div>
                    <div class="card-container" id="column-${board.id}-${statuses[1].id}"></div>
                </div>
                <div class="board-column" data-status="${statuses[2].id}" id="status${statuses[2].id}">
                    <div class="board-column-title">${statuses[2].title}</div>
                    <div class="card-container" id="column-${board.id}-${statuses[2].id}"></div>
                </div>
                <div class="board-column" data-status="${statuses[3].id}" id="status${statuses[3].id}">
                    <div class="board-column-title">${statuses[3].title}</div>
                    <div class="card-container" id="column-${board.id}-${statuses[3].id}"></div>
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
        for (let button of document.querySelectorAll(".board-toggle")) {
            button.addEventListener("click", () => dom.loadCards(button.dataset.boardId))
        }
        for (let button of document.querySelectorAll(".card-add-btn")) {
            button.addEventListener("click", dom.createNewCard)
        }
    },


    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards, boardId);
        });

    },
    showCards: function (cards, boardId) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let newCards = '';
        let inprogressCards = '';
        let testingCards = '';
        let doneCards = '';
        // refine it to match design template

        for (let card of cards) {
            if (card.status_id === 0) {
                newCards += `<div class="card" id="card${card.id}" status="${card.status_id}"> 
                             <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div data-card-id="${card.id}" id="${card.id}" class="card-title">${card.title}</div>
                </div>`

            } else if (card.status_id === 1) {
                inprogressCards += `<div class="card" id="card${card.id}" status="${card.status_id}">
                             <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div data-card-id="${card.id}" class="card-title">${card.title}</div>
                </div>`
            } else if (card.status_id === 2) {
                testingCards += `<div class="card" id="card${card.id}" status="${card.status_id}">
                             <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div data-card-id="${card.id}" class="card-title">${card.title}</div>
                </div>`
            } else if (card.status_id === 3) {
                doneCards += `<div class="card" id="card${card.id}" status="${card.status_id}">
                             <div class="card-remove"><i class="fas fa-trash-alt"></i></div>                    
                    <div data-card-id="${card.id}" class="card-title">${card.title}</div>
                </div>`
            }
        }


        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="0"] .card-container`).innerHTML = newCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="1"] .card-container`).innerHTML = inprogressCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="2"] .card-container`).innerHTML = testingCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="3"] .card-container`).innerHTML = doneCards
        let cardTitles = document.querySelectorAll('.card-title');
        for (let cardTitle of cardTitles) {
            cardTitle.addEventListener("click", () => dom.renameCards(cardTitle, event)
            )
        }
        ;
    },

    createNewCard: function (event) {
        const boardId = event.target.dataset.boardId
        let inputText = window.prompt("Enter a card title : ");
        let column = document.querySelector(`#column-${boardId}-0`)
        column.innerHTML +=
            `<div class="card">
                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div id="thetext" class="card-title">${inputText}</div>
                      <div id="editor">
                        <textarea id="ta1" name="ta1" rows="1" cols="10"></textarea><br />
                        <input name="submit" id="submit" type="button" value="Save Text" />
                    </div>
                </div>`;
        dataHandler.createNewCard(inputText, boardId, 0, function () {
            console.log("valami")
        })
        // creates new card, saves it and calls the callback function with its data
    },
    // here comes more features
    // ADD Board

    addBoardButtonToggle: function () {
        let addBoardButton = document.getElementById('add-board');
        addBoardButton.addEventListener('click', this.createBoard);
    },

    createBoard: function () {
        let titleInput = window.prompt("Board name?");
        dataHandler.createNewBoard(titleInput, function () {
            console.log(titleInput)
        });

        let boardsContainerKill = document.getElementById("boards");
        boardsContainerKill.innerHTML = ``;
        dom.loadBoards();
    },


    renameCards: function (cardTitle, event) {
        let cardId = event.target.dataset.cardId
        let oldCardTitle = cardTitle.innerHTML
        let newCardTitle = prompt("Edit card name:", `${oldCardTitle}`)
        dataHandler.renameCards(cardId, newCardTitle, function () {
            console.log(newCardTitle)
            let boardsContainerKill = document.getElementById("boards");
            boardsContainerKill.innerHTML = ``;
            dom.loadBoards()
        })
    }
};
