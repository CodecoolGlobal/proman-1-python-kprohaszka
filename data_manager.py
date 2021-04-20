from typing import List, Dict

from psycopg2 import sql
from psycopg2.extras import RealDictCursor

import database_common

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