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


@app.route("/get-cards/<int:board_id>")
@util.json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


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


if __name__ == '__main__':
    main()
