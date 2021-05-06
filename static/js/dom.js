// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
        init: async function () {
            // This function should run once, when the page is loaded.
            // loads the boards to the screen
            let session = await dataHandler.getSession()
            if (session.OK) {
                dom.loadBoards();
                dom.loadPrivateBoards(session.user_id);
                dom.renderLoggedInNavbar(session.username);
                dom.addLogoutListener();
                dom.addBoardButtonToggle();
                dom.sendRegistration()
            } else {
                dom.loadBoards();
                dom.renderLoggedOutNavbar();
                dom.addBoardButtonToggle();
                dom.sendRegistration()
                dom.sendLogin()
            }
        },
        loadBoards: function () {
            // retrieves boards and makes showBoards called
            dataHandler.getBoards(function (boards) {
                dataHandler.getStatuses(function (statuses) {
                    dom.showBoards(boards, statuses);
                    dom.deleteBoard();
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

    <div class="board-header"><span id="header-${board.id}-id" class="board-title" data-header-id="${board.id}">${board.title}</span>
        <button class="card-add-btn" data-board-id="${board.id}" id="add-new-card">Create new card</button>
        <button class="board-delete" id="${board.id}" type="button"><i class="fas fa-times"></i></button>
        <button data-board-id="${board.id}" id="button_board${board.id}" type="button"   class="board-toggle valami" data-toggle="collapse" data-target="#board${board.id}" aria-expanded="false" aria-controls="collapseExample"><i class="fas fa-chevron-down"></i></button>
    </div>
    <div class='edittextarea' id="editor-${board.id}-id">
            <textarea data-textarea-id="${board.id}" id="textarea-${board.id}-id" name="ta1" rows="1" cols="20"></textarea><br />
            <input name="submit" id="input_textarea-${board.id}-id" type="button" value="Edit Text" class='textbox2' data-textarea-id="${board.id}"/>
                    </div>
    <div class="board-columns collapse" id="board${board.id}">`
                for (let status of statuses) {
                    boardList += `
    <div class="board-column" data-status="${status.id}" id="status${status.id}">
            <div class="board-column-title">${status.title}</div>
            <div class="card-container" id="column-${board.id}-${status.id}"></div>
        </div>`
                }
                boardList += `
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
            for (let title of document.querySelectorAll('.board-title')) {
                title.addEventListener("click", dom.toggleEditor)
            }
            for (let title of document.querySelectorAll('.textbox2')) {
                title.addEventListener("click", dom.doEdit)
            }
        },


        loadCards: function (boardId) {
            // retrieves cards and makes showCards called
            dataHandler.getStatuses(function (statuses) {
                dataHandler.getCardsByBoardId(boardId, function (cards) {
                    dom.showCards(cards, boardId, statuses);
                    dom.deleteCard();
                });
            })


        },
        showCards: function (cards, boardId, statuses) {
            // shows the cards of a board
            // it adds necessary event listeners also
            let insert = '';
            // refine it to match design template
            for (let i = 0; i <= statuses.length; i++) {
                let tmp = []
                for (let card of cards) {
                    if (card['status_id'] === i) {
                        tmp.push({
                            'id': card['id'],
                            'board_id': card['board_id'],
                            'status_id': card['status_id'],
                            'title': card['title'],
                            'order': card['order']
                        })
                    }
                }
                for (let t of tmp) {
                    insert += `<div class="card" draggable="true" id="cardId-${t.id}-${t.status_id}-${boardId}"> 
                             <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div class="card-title" data-card-id="${t.id}" >${t.title}</div>
                </div>`
                    document.getElementById(boardId).querySelector(`.board-columns .board-column[data-status="${i}"] .card-container`).innerHTML = insert
                }
                tmp = []
                insert = ''
            }

            let cardTitles = document.querySelectorAll('.card-title');
            for (let cardTitle of cardTitles) {
                cardTitle.addEventListener("click", () => dom.renameCards(cardTitle, event))
            }
            dom.dragAndDrop(boardId)
        },

        createNewCard: function (event) {
            const boardId = event.target.dataset.boardId
            let inputText = window.prompt("Enter a card title : ");
            let column = document.querySelector(`#column-${boardId}-0`)
            column.innerHTML +=
                `<div class="card" draggable="true">
                    <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                    <div class="card-title">${inputText}</div>
                </div>`;

            dataHandler.createNewCard(inputText, boardId, 0, function () {
                dom.loadCards(boardId)
            })
        },


        addBoardButtonToggle: function () {
            let addBoardButton = document.getElementById('add-board');
            addBoardButton.addEventListener('click', this.createBoard);
        },

        createBoard: async function () {
            let session = await dataHandler.getSession()
            let user_id = session.user_id
            let titleInput = window.prompt("Board name?");
            dataHandler.createNewBoard(titleInput, user_id, function () {
                let boardsContainerKill = document.getElementById("boards");
                boardsContainerKill.innerHTML = ``;
                dom.loadBoards();
                dom.loadPrivateBoards(user_id);
            });
        },

        sendRegistration: function () {
            const registerForm = document.querySelector("#registrationForm")
            registerForm.addEventListener("submit", (e) => dom.registerUserHandler(e))

        },

        registerUserHandler: function (e) {
            e.preventDefault();
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
                    dom.deleteBoard();
                })
            });

        },
        dragAndDrop: function (boardId) {
            let draggables = document.querySelectorAll('.card')
            let containers = document.querySelectorAll('.board-column')
            draggables.forEach(draggable => {
                draggable.addEventListener('dragstart', () => draggable.classList.add('dragging'))

                draggable.addEventListener('dragend', () => {
                    draggable.classList.remove('dragging')

                })
            })
            containers.forEach(container => {
                container.addEventListener('dragover', e => {
                        e.preventDefault()
                        let dragged = document.querySelector('.dragging')
                        container.appendChild(dragged)

                        let tmp = dragged.id.slice(0, 9)
                        let tmp2 = container.getAttribute('data-status')
                        dragged.id = tmp + tmp2


                    }
                )
            })
        },
        sendLogin: function () {
            const loginForm = document.querySelector("#loginForm")
            loginForm.addEventListener("submit", dom.loginHandler)
        },

        loginHandler: function (e) {
            e.preventDefault();
            const username = e.target.login_user_name.value
            const password = e.target.login_password.value
            dataHandler.loginUser(username, password, (response) => {
                if (response.OK === true) {
                    dom.loadPrivateBoards(response.user_id)
                    const loginForm = document.querySelector("#loginForm")
                    loginForm.removeEventListener("submit", dom.loginHandler)
                    dom.renderLoggedInNavbar(response.username)
                    dom.addLogoutListener()
                    dom.addBoardButtonToggle(response.user_id)
                } else {
                    alert(response.OK)
                }
            })
        },
        renderLoggedOutNavbar: function () {
            let nbar = document.getElementById("navBar")
            nbar.innerHTML = `<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" id="add-board"  class="btn btn-dark">+ Create new board +</button>

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
            Public
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
        addLogoutListener: function () {
            let logout = document.getElementById("logoutButton")
            logout.addEventListener("click", (e) => dom.usrLogout(e))
        },
        usrLogout: function (e) {
            dom.divNullifier()
            fetch('/logout')  // set the path; the method is GET by default, but can be modified with a second parameter
                .then((response) => response.json())  // parse JSON format into JS object
                .then((data) => {
                    alert(data.OK)
                    this.init()
                })
        },
        divNullifier: function () {
            let boards = document.getElementById('boards')
            boards.innerHTML = ''
        },

        deleteCard: function () {
            let deleteButtons = document.querySelectorAll(".card-remove");
            for (let deleteButton of deleteButtons) {
                deleteButton.addEventListener('click', function () {
                    let fullId = deleteButton.parentNode.id;
                    let slicedId = fullId.slice(7);
                    let slicedBoard = slicedId.substring(slicedId.lastIndexOf('-'));
                    let boardId = slicedBoard.slice(1);
                    let cardId = slicedId.substring(0, slicedId.indexOf('-'));
                    dataHandler.deleteCardDataHandler(cardId, boardId, function () {
                        dom.loadCards(boardId);
                    })
                });
            }
        },

        deleteBoard: function () {
            let delBoards = document.querySelectorAll(".board-delete")
            for (let delBoard of delBoards) {
                delBoard.addEventListener('click', function () {
                    let boardId = delBoard.id
                    dataHandler.deleteBoard(boardId, function () {
                        let boardsContainerKill = document.getElementById("boards");
                        boardsContainerKill.innerHTML = ``;
                        dom.loadBoards();
                    })
                })
            }
        },

        toggleEditor: function (event) {
            const headerId = event.target.dataset.headerId
            let theText = document.querySelector(`#header-${headerId}-id`)
            let theEditor = document.querySelector(`#textarea-${headerId}-id`)
            let editorArea = document.querySelector(`#editor-${headerId}-id`)
            var subject = theText.innerHTML;
            subject = subject.replace(new RegExp("<br />", "gi"), 'n');
            subject = subject.replace(new RegExp("<br />", "gi"), 'n');
            subject = subject.replace(new RegExp("<", "gi"), '<');
            subject = subject.replace(new RegExp(">", "gi"), '>');
            theEditor.value = subject;
            theText.style.display = 'none';
            editorArea.style.display = 'inline';
        },
        doEdit: function (event) {
            const headerId = event.target.dataset.textareaId
            let theText = document.querySelector(`#header-${headerId}-id`)
            let theEditor = document.querySelector(`#textarea-${headerId}-id`)
            let editorArea = document.querySelector(`#editor-${headerId}-id`)
            var subject = theEditor.value;
            subject = subject.replace(new RegExp("<", "g"), '<');
            subject = subject.replace(new RegExp(">", "g"), '>');
            subject = subject.replace(new RegExp("n", "g"), '<br />');
            theText.innerHTML = subject;
            theText.style.display = 'inline';
            editorArea.style.display = 'none';
            dataHandler.renameBoard(headerId, subject, function () {
                dom.loadCards(headerId)
            })
        },

        renameCards: function (cardTitle, event) {
            let cardId = event.target.dataset.cardId
            let fullId = cardTitle.parentNode.id;
            let slicedId = fullId.slice(7);
            let slicedBoard = slicedId.substring(slicedId.lastIndexOf('-'));
            let boardId = slicedBoard.slice(1);
            let oldCardTitle = cardTitle.innerHTML
            let newCardTitle = prompt("Edit card name:", `${oldCardTitle}`)
            dataHandler.renameCards(cardId, newCardTitle, function () {
                dom.loadCards(boardId)
            })
        }
    }
;


