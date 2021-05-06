// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
        _data: {}, // it is a "cache for all data received: boards, cards and statuses. It is not accessed from outside.
        _api_get: function (url, callback) {
            // it is not called from outside
            // loads data from API, parses it and calls the callback with it

            fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            })
                .then(response => response.json())  // parse the response as JSON
                .then(json_response => callback(json_response));  // Call the `callback` with the returned object
        },
        _api_post: function (url, data, callback) {
            fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(response => response.json())  // parse the response as JSON
                .then(json_response => callback(json_response));  // Call the `callback` with the returned object
            // it is not called from outside
            // sends the data to the API, and calls callback function
        },
        init: function () {
        },
        getBoards: function (callback) {
            // the boards are retrieved and then the callback function is called with the boards

            // Here we use an arrow function to keep the value of 'this' on dataHandler.
            //    if we would use function(){...} here, the value of 'this' would change.
            this._api_get('/get-boards', (response) => {
                this._data['boards'] = response;
                callback(response);
            });
        },
        getBoard: function (boardId, callback) {
            // the board is retrieved and then the callback function is called with the board
        },
        registerUser: function (username, password, callback) {
            let data = {"username": username, "password": password};
            dataHandler._api_post("/register", data, (response) => {
                console.log(response)
                callback(response);
            });
        },
        loginUser: function (username, password, callback) {
            let data = {"username": username, "password": password};
            dataHandler._api_post("/login", data, (response) => {
                callback(response);
            });
        },
        getLoggedInBoards: function (user_id, callback) {
            this._api_get(`/get-boards/${user_id}`, (response) => {
                this._data['privateBoards'] = response;
                callback(response);
            });
        },
        getStatuses: function (callback) {
            this._api_get('/get-statuses', (response) => {
                this._data['statuses'] = response;
                callback(response);
            });
        },
        getStatus: function (statusId, callback) {
            // the status is retrieved and then the callback function is called with the status
        },
        getCardsByBoardId: function (boardId, callback) {
            // the cards are retrieved and then the callback function is called with the cards
            this._api_get(`/get-cards/${boardId}`, (response) => {
                this._data['cards'] = response;
                callback(response);
            });
        },
        getCard: function (cardId, callback) {
            // the card is retrieved and then the callback function is called with the card
        },
        createNewBoard: function (title, callback) {
            let data = {"title": title};
            dataHandler._api_post("/create-new-board", data, (response) => {
                callback(response);
            });
        },
        createNewCard: function (cardTitle, boardId, statusId, callback) {
            let data = {"card_title": cardTitle, "board_id": boardId, "status_id": statusId};
            dataHandler._api_post("/create-card", data, (response) => {
                callback(response)
            })
        },


        saveCards:function(cards, callback) {
            let data = {cards};
            dataHandler._api_post("/save", data, (response) => {
                callback(response)
            })
        },

        deleteCardDataHandler: function (cardId, boardId, callback) {
            let data = {"board_id": boardId};
            dataHandler._api_post(`/delete-card/${cardId}`, data, (response) => {
                callback(response);
            })
        },

        deleteBoard: function (boardID, callback) {
            let boardToDelete = {"board_id": boardID};
            this._api_post(`/delete-board/${boardID}`, boardToDelete, (response) => {
                callback(response)
            });
        },

// here comes more features
        getSession: function () {
            return fetch("/get-session")
                .then(response => response.json())
        },

        renameCards: function (id, title, callback) {
            let data = {"id": id, "title": title};
            dataHandler._api_post("/rename-card", data, (respone) => {
                callback(respone)
            })
        },
    }
;
