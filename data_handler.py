from typing import List, Dict

from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import database_common
import persistence


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
def create_new_board(cursor: RealDictCursor, title):
    query = """
    INSERT INTO boards (title) 
    VALUES (%(title)s)
    """
    args = {'title': title}
    cursor.execute(query, args)


# User Related
@database_common.connection_handler
def register_usr(cursor: RealDictCursor, usr_name, password):
    query = """
        INSERT INTO users (username, password)
        VALUES (%(name)s, %(pass)s);
        """
    var = {'name': usr_name, 'pass': password}
    cursor.execute(query, var)


@database_common.connection_handler
def get_usr_credentials(cursor: RealDictCursor, usr_name):
    query = """
        SELECT password
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
def update_card_title(cursor: RealDictCursor ,id, title):
    query = """
        UPDATE cards SET title = %(title)s WHERE id = %(id)s;
    """
    values = {'id': id,'title':title}
    cursor.execute(query, values)