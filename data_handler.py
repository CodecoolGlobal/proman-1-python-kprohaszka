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


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards

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