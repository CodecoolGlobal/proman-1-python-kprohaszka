from flask import Flask, render_template, request, url_for, redirect, make_response, session, escape, current_app
import util
import data_handler

app = Flask(__name__)
app.secret_key = b'super_secret_key'
app.permanent_session_lifetime = False


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
    title = request.json
    data_handler.create_new_board(title['title'])


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
    if request.method == 'POST':
        usr_name = request.form['usr_name']
        password = request.form['password']
        hashed_pass = data_handler.get_usr_credentials(usr_name)
        if util.verify_password(password, hashed_pass['password']):
            session['user'] = usr_name
            return render_template('index.html')
    else:
        return render_template('index.html')


@app.route('/register', methods=["GET", "POST"])
def register():
    usr_name = request.form['usr_name']
    password = util.hash_password(request.form['password'])
    data_handler.register_usr(usr_name, password)
    return render_template('index.html')


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('user', None)
    return redirect(url_for('index'))


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
    n = []
    for i in info:
        if str(i).isdigit():
            n.append(i)
    print(n)
    data_handler.save_changed_card(n[0], n[1])


@app.route("/rename-column", methods=["POST"])
@util.json_response
def rename_column():
    data = request.json
    print(data)
    old_column_title = data['old_column_title']
    new_column_title = data['new_column_title']
    data_handler.rename_column(old_column_title, new_column_title)


if __name__ == '__main__':
    main()
