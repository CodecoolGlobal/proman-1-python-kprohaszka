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
                <button data-board-id="${board.id}" id="${board.id}" type="button"   class="board-toggle valami" data-toggle="collapse" data-target="#board${board.id}" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
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
        }

        const outerHtml = `
            <div class="board-container">
                ${boardList}
            </div>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
        for(let button of document.querySelectorAll(".board-toggle")){
            button.addEventListener("click",(event) => dom.loadCards(button.id))
        }
    },


    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        console.log("hello")
        dataHandler.getCardsByBoardId(boardId,function (cards) {
        dom.showCards(cards);
        });

    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let newCard = '';
        let inprogressCard='';
        let testing = '';
        let done = '';
        // refine it to match design template
        for (let card of cards) {
            if (card.status_id == 0) {
                newCard += `<div className="card" id="${card.id}" status="${card.status_id}"> 
                    <div className="card-title">${card.title}</div>
                </div>`

                console.log("Done")
            } else if (card.status_id == 1) {
                inprogressCard += `<div className="card" id="${card.id}" status="${card.status_id}">
                    <div className="card-title">${card.title}</div>
                </div>`
            }
            else if (card.status_id == 2) {
                testing += `<div className="card" id="${card.id}" status="${card.status_id}">
                    <div className="card-title">${card.title}</div>
                </div>`
            }
            else if (card.status_id == 3) {
                done += `<div className="card" id="${card.id}" status="${card.status_id}">                    
                    <div className="card-title">${card.title}</div>
                </div>`
            }
        }
        console.log(newCard)
        let trial = [newCard, inprogressCard, testing, done] //this is way too magical but it works for now
        for (let i = 0; i <= 3; i++){
                    let outerHtml = `
            <div class="board-column" id="status${i}">
                ${trial[i]}
            </div>
            
        `;
                    let boardsContainer = document.getElementById('status'+[i])
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
        }




    },
    // here comes more features
};
