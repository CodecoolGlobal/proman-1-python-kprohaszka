from psycopg2.extras import RealDictCursor
import database_common


@database_common.connection_handler
def get_statuses(cursor: RealDictCursor) -> list:
    query = """
                SELECT *
                FROM statuses
                """
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def get_boards(cursor: RealDictCursor) -> list:
    query = """
            SELECT *
            FROM boards
            WHERE user_id IS null
            """
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def get_cards_for_board(cursor: RealDictCursor) -> list:
    query = """
                SELECT *
                FROM cards
                """
    cursor.execute(query)

    return cursor.fetchall()


@database_common.connection_handler
def create_new_board(cursor: RealDictCursor, title, user_id):
    query = """
    INSERT INTO boards (title, user_id) 
    VALUES (%(title)s, %(user_id)s)
    """
    args = {'title': title, 'user_id': user_id}
    cursor.execute(query, args)


# User Related
@database_common.connection_handler
def register_usr(cursor: RealDictCursor, usr_name, password):
    query = """
        INSERT INTO users (username, password)
        VALUES (%(name)s, %(pass)s) RETURNING username;
        """
    var = {'name': usr_name, 'pass': password}
    cursor.execute(query, var)
    return cursor.fetchone()


@database_common.connection_handler
def get_usr_credentials(cursor: RealDictCursor, usr_name):
    query = """
        SELECT CONVERT_FROM(password, 'UTF8') AS password 
        FROM users
        WHERE username = %(name)s;
        """
    var = {'name': usr_name}
    cursor.execute(query, var)
    return cursor.fetchone()


@database_common.connection_handler
def add_new_card(cursor: RealDictCursor, board_id: int, title: str, status_id):
    query = """
    INSERT INTO cards(board_id, title, status_id)
    VALUES (%(board_id)s, %(title)s, %(status_id)s)
    """
    args = {'board_id': board_id, 'title': title, 'status_id': status_id}
    cursor.execute(query, args)


@database_common.connection_handler
def save_changed_card(cursor: RealDictCursor, card_id: int, status_id: int):
    query = """
    UPDATE cards
    SET status_id = %(status_id)s
    WHERE %(card_id)s = id;
    """
    args = {'card_id': card_id, 'status_id': status_id}
    cursor.execute(query, args)


@database_common.connection_handler
def get_user_id(cursor: RealDictCursor, usr_name):
    query = """
        SELECT id
        FROM users
        WHERE username = %(name)s;
        """
    var = {'name': usr_name}
    cursor.execute(query, var)
    return cursor.fetchone()


@database_common.connection_handler
def get_private_boards(cursor: RealDictCursor, user_id) -> list:
    query = """
            SELECT *
            FROM boards
            WHERE user_id = %(user_id)s
            """
    usr_id = {"user_id": user_id}
    cursor.execute(query, usr_id)
    return cursor.fetchall()


@database_common.connection_handler
def delete_card(cursor, card_id: int):
    query = """
    DELETE FROM cards
    WHERE id = %(card_id)s"""
    var = {'card_id': card_id}
    cursor.execute(query, var)


@database_common.connection_handler
def delete_board(cursor, board_id: int):
    query = """
    DELETE FROM cards
    WHERE board_id = %(board_id)s;
    
    DELETE FROM boards
    WHERE id = %(board_id)s;
    """
    var = {'board_id': board_id}
    cursor.execute(query, var)


@database_common.connection_handler
def update_card_title(cursor: RealDictCursor, id, title):
    query = """
        UPDATE cards SET title = %(title)s WHERE id = %(id)s;
    """
    values = {'id': id, 'title': title}
    cursor.execute(query, values)


@database_common.connection_handler
def update_board_title(cursor: RealDictCursor, id, title):
    query = """
        UPDATE boards SET title = %(title)s WHERE id = %(id)s;
    """
    values = {'id': id, 'title': title}
    cursor.execute(query, values)


@database_common.connection_handler
def check_user(cursor: RealDictCursor, username):
    query = """
        SELECT username FROM users
        WHERE username = %(username)s;
        """
    var = {'username': username}
    cursor.execute(query, var)
    return cursor.fetchone()