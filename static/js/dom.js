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
                    <div class="card-title">${card.title}</div>
                </div>`

            } else if (card.status_id === 1) {
                inprogressCards += `<div class="card" id="card${card.id}" status="${card.status_id}">
                             <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div class="card-title">${card.title}</div>
                </div>`
            } else if (card.status_id === 2) {
                testingCards += `<div class="card" id="card${card.id}" status="${card.status_id}">
                             <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div class="card-title">${card.title}</div>
                </div>`
            } else if (card.status_id === 3) {
                doneCards += `<div class="card" id="card${card.id}" status="${card.status_id}">
                             <div class="card-remove"><i class="fas fa-trash-alt"></i></div>                    
                    <div class="card-title">${card.title}</div>
                </div>`
            }
        }
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="0"] .card-container`).innerHTML = newCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="1"] .card-container`).innerHTML = inprogressCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="2"] .card-container`).innerHTML = testingCards
        document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="3"] .card-container`).innerHTML = doneCards
    },
    createNewCard: function (event) {
        const boardId = event.target.dataset.boardId
        let inputText = window.prompt("Enter a card title : ");
        let column = document.querySelector(`#column-${boardId}-0`)
        column.innerHTML +=
            `<div class="card">
                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div class="card-title">${inputText}</div>
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
            let boardsContainerKill = document.getElementById("boards");
            boardsContainerKill.innerHTML = ``;
            dom.loadBoards();
        });
    },
    sendRegistration: function () {
        const registerForm = document.querySelector("#registrationForm")
        registerForm.addEventListener("submit", (e) => dom.registerUserHandler(e))

    },
    registerUserHandler: function (e) {
        e.preventDefault();
        console.log(e.target);
        const username = e.target.register_user_name.value;
        const password = e.target.register_password.value;
        dataHandler.registerUser(username, password, (response) => {
            if (response.OK === true) {

                alert(`You have successfully registered ${response.username}`)
            } else {
                alert(response.OK)
            }
        });
    },
    loadPrivateBoards: function (user_id) {
        // retrieves boards and makes showBoards called
        dataHandler.getLoggedInBoards(user_id, function (privateBoards) {
            dataHandler.getStatuses(function (statuses) {
                dom.showBoards(privateBoards, statuses);
            })
        });

    },
    sendLogin: function () {
        const loginForm = document.querySelector("#loginForm")
        loginForm.addEventListener("submit", (e) => dom.loginHandler(e))
    },
    loginHandler: function (e) {
        e.preventDefault();
        console.log(e.target)
        const username = e.target.login_user_name.value
        const password = e.target.login_password.value
        dataHandler.loginUser(username, password, (response) => {
            if (response.OK === true) {
                dom.loadPrivateBoards(response.user_id)
                dom.renderLoggedInNavbar(response.username)
                dom.addLogoutListener()
                dom.addBoardButtonToggle()
            } else {
                alert(response.OK)
            }
        })
    },
    renderLoggedOutNavbar: function () {
        let nbar = document.getElementById("navBar")

        nbar.innerHTML = `<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" id="add-board" class="btn btn-dark">+ Create new board +</button>

            <div class="btn-group" role="group">
                <button id="btnGroupDrop1" type="button"
                        class="btn btn-secondary dropdown-toggle"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    login/register
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <button id="loginButton" type="button" class="dropdown-item" data-toggle="modal"
                            data-target="#login">
                        login
                    </button>
                    <button type="button" class="dropdown-item" data-toggle="modal"
                            data-target="#register">
                        register
                    </button>
                </div>
            </div>
        </div>
        <div class="shadow p-2 mb-3 bg-light rounded">
            PUBLIC
        </div>`
    },

    renderLoggedInNavbar: function (usrName) {
        let nbar = document.getElementById("navBar")

        nbar.innerHTML = `<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" id="add-board" class="btn btn-dark">+ Create new board +</button>

            <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button"
                            class="btn btn-secondary dropdown-toggle"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        login/register
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <button id="logoutButton" type="button" class="dropdown-item">
                            logout
                        </button>
                        <button type="button" class="dropdown-item" data-toggle="modal"
                                data-target="#register">
                            register
                        </button>
                    </div>
                </div>
            </div>
            <div class="shadow p-2 mb-3 bg-light rounded">
                ${usrName}
            </div>`
    },
    addLogoutListener: function() {
    let logout = document.getElementById("logoutButton")
    logout.addEventListener("click", (e) => usrLogout(e))
}
};
