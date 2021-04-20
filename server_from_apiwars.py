from flask import Flask, render_template, request, url_for, redirect, make_response, session, escape
import requests
import util
import data_manager

app = Flask(__name__)
app.secret_key = b'super_secret_key'
app.permanent_session_lifetime = False


@app.route('/')
def index():
    planets = requests.get('https://swapi.dev/api/planets').json()['results']
    next_page = requests.get('https://swapi.dev/api/planets').json()['next']
    previous_page = requests.get('https://swapi.dev/api/planets').json()['previous']
    if 'user' in session:
        return render_template('index.html', planets=planets, next=next_page, previous=previous_page)
    else:
        return render_template('index.html', planets=planets, next=next_page, previous=previous_page)


@app.route('/login', methods=["GET", "POST"])
def login():
    planets = requests.get('https://swapi.dev/api/planets').json()['results']
    next_page = requests.get('https://swapi.dev/api/planets').json()['next']
    previous_page = requests.get('https://swapi.dev/api/planets').json()['previous']
    if request.method == 'POST':
        usr_name = request.form['usr_name']
        password = request.form['password']
        hashed_pass = data_manager.get_usr_credentials(usr_name)
        if util.verify_password(password, hashed_pass['password']):
            session['user'] = usr_name
            return render_template('index.html', planets=planets, next=next_page, previous=previous_page)
    else:
        return render_template('index.html', planets=planets, next=next_page, previous=previous_page)


@app.route('/register', methods=["GET", "POST"])
def register():
    usr_name = request.form['usr_name']
    password = util.hash_password(request.form['password'])
    data_manager.register_usr(usr_name, password)
    return render_template('index.html', planets=planets, next=next_page, previous=previous_page)


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('user', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True, port=8000)
