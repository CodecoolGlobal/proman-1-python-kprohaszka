from flask import Flask, render_template, request, url_for, session
import util
import data_handler
from psycopg2 import Error

app = Flask(__name__)
app.secret_key = b'super_secret_key'
# app.permanent_session_lifetime = False


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@util.json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-boards/<user_id>")
@util.json_response
def get_private_boards(user_id):
    """
    All the boards
    """
    return data_handler.get_private_boards(user_id)


@app.route("/get-statuses")
@util.json_response
def get_statuses():
    """
    All the statuses
    """
    return data_handler.get_statuses()


@app.route('/create-new-board', methods=['GET', 'POST'])
@util.json_response
def create_new_board():
    try:
        user_id = request.json["user_id"]
        title = request.json['title']
        data_handler.create_new_private_board(title, user_id)
    except KeyError:
        title = request.json['title']
        data_handler.create_new_public_board(title)


@app.route("/get-cards/<int:board_id>")
@util.json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    cards_all = data_handler.get_cards_for_board()
    cards = []
    print(cards_all)
    for card in cards_all:  # make better sql query
        if card['board_id'] == board_id:
            cards.append(card)
    print(cards)
    return cards


@app.route('/login', methods=["GET", "POST"])
def login():
    usr_name = request.json['username']
    check_username = data_handler.check_user(usr_name)
    if check_username:
        password = request.json['password']
        hashed_pass = data_handler.get_usr_credentials(usr_name)
        user_id = data_handler.get_user_id(usr_name)
        if util.verify_password(password, hashed_pass['password']):
            session['user'] = usr_name
            session['user_id'] = user_id['id']
            return {"OK": True, "user_id": user_id['id'], "username": usr_name}
        else:
            return {"OK": "The username, or password does not match!"}
    else:
        return {"OK": "The user is not registered yet"}


@app.route('/register', methods=["GET", "POST"])
def register():
    usr_name = request.json['username']
    password = util.hash_password(request.json['password'])
    if usr_name and password:
        try:
            user = data_handler.register_usr(usr_name, password)
            return {"OK": True, "username": user["username"]}
        except Error:
            return {"OK": "Username already exists"}
    else:
        return {"OK": "Please fill out both username, and password"}


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('user', None)
    session.pop('user_id', None)
    return {"OK": 'You are safely logged out.'}


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='/favicon/favicon.ico'))


@app.route("/create-card", methods=["GET", "POST"])
@util.json_response
def add_new_card():
    data = request.json
    data_handler.add_new_card(data["board_id"], data["card_title"], data["status_id"])


@app.route("/save", methods=["GET", "POST"])
@util.json_response
def save_status():
    data = request.json
    info = data.get('cards')
    print(info)

    for j in info:
        tmp = j.split('-')
        data_handler.save_changed_card(tmp[1], tmp[2])


@app.route("/delete-card/<int:card_id>", methods=['GET', 'POST'])
@util.json_response
def delete_card(card_id: int):
    data_handler.delete_card(card_id)


@app.route('/delete-board/<int:board_id>', methods=['GET', 'POST'])
@util.json_response
def delete_board(board_id: int):
    if request.method == 'POST':
        data_handler.delete_board(board_id)


@app.route("/get-session")
def get_session():
    print(session)
    if 'user' in session:
        return {'OK': True, 'user_id': session['user_id'], 'username': session['user']}
    else:
        return {'OK': False}


@app.route("/rename-card", methods=["POST"])
@util.json_response
def rename_card_save():
    data = request.json
    print(data)
    id = data['id']
    title = data['title']
    data_handler.update_card_title(id, title)


@app.route("/rename-board", methods=["POST"])
@util.json_response
def rename_board():
    print('BELEEEEEP')
    data = request.json
    print(f'REQUEST.JSON{data}')
    id = data['id']
    title = data['title']
    data_handler.update_board_title(id, title)


if __name__ == '__main__':
    main()
