from flask import Flask, render_template, request, url_for, redirect, make_response, session, escape
import requests
import util
import data_manager

app = Flask(__name__)
app.secret_key = b'super_secret_key'
app.permanent_session_lifetime = False


@app.route('/')
def index():
    if 'user' in session:
        return render_template('index.html')
    else:
        return render_template('index.html')


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        usr_name = request.form['usr_name']
        password = request.form['password']
        hashed_pass = data_manager.get_usr_credentials(usr_name)
        if util.verify_password(password, hashed_pass['password']):
            session['user'] = usr_name
            return render_template('index.html')
    else:
        return render_template('index.html')


@app.route('/register', methods=["GET", "POST"])
def register():
    usr_name = request.form['usr_name']
    password = util.hash_password(request.form['password'])
    data_manager.register_usr(usr_name, password)
    return render_template('index.html')


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('user', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True, port=8000)
