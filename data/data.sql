CREATE TABLE boards(id SERIAL PRIMARY KEY, title TEXT);
CREATE TABLE cards(id SERIAL PRIMARY KEY, board_id INT, title TEXT, status_id INT, "order" INT);
CREATE TABLE statuses(id SERIAL PRIMARY KEY, title TEXT);
CREATE TABLE users(id SERIAL PRIMARY KEY, username TEXT UNIQUE, password BYTEA);


INSERT INTO boards (id, title) VALUES (1, 'Board 1');
INSERT INTO boards (id, title) VALUES (2, 'Board 2');


INSERT INTO statuses (id, title) VALUES (0, 'new');
INSERT INTO statuses (id, title) VALUES (1, 'in progress');
INSERT INTO statuses (id, title) VALUES (2, 'testing');
INSERT INTO statuses (id, title) VALUES (3, 'done');


INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (1,1,'new card 1', 0, 0);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (2,1,'new card 2', 0, 1);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (3,1,'in progress card', 1, 0);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (4,1,'planning', 2, 0);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (5,1,'done card 1', 3, 0);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (6,1,'done card 1', 3, 1);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (7,2,'new card 1', 0, 0);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (8,2,'new card 2', 0, 1);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (9,2,'in progress card', 1, 0);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (10,2,'planning', 2, 0);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (11,2,'done card 1', 3, 0);
INSERT INTO cards (id, board_id, title, status_id, "order") VALUES (12,2,'done card 1', 3, 1);