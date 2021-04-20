CREATE TABLE public.boards (
    id integer NOT NULL,
    title text,
    user_id integer
);


ALTER TABLE public.boards OWNER TO kprohaszka;

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: kprohaszka
--

CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO kprohaszka;

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kprohaszka
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: kprohaszka
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    board_id integer,
    title text,
    status_id integer,
    "order" integer
);


ALTER TABLE public.cards OWNER TO kprohaszka;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: kprohaszka
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_id_seq OWNER TO kprohaszka;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kprohaszka
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: kprohaszka
--

CREATE TABLE public.statuses (
    id integer NOT NULL,
    title text
);


ALTER TABLE public.statuses OWNER TO kprohaszka;

--
-- Name: statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: kprohaszka
--

CREATE SEQUENCE public.statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.statuses_id_seq OWNER TO kprohaszka;

--
-- Name: statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kprohaszka
--

ALTER SEQUENCE public.statuses_id_seq OWNED BY public.statuses.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: kprohaszka
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    password bytea
);


ALTER TABLE public.users OWNER TO kprohaszka;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: kprohaszka
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO kprohaszka;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kprohaszka
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Name: statuses id; Type: DEFAULT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.statuses ALTER COLUMN id SET DEFAULT nextval('public.statuses_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: kprohaszka
--

INSERT INTO public.boards (id, title, user_id) VALUES (1, 'Board 1', NULL);
INSERT INTO public.boards (id, title, user_id) VALUES (2, 'Board 2', NULL);


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: kprohaszka
--

INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (1, 1, 'new card 1', 0, 0);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (2, 1, 'new card 2', 0, 1);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (3, 1, 'in progress card', 1, 0);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (4, 1, 'planning', 2, 0);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (5, 1, 'done card 1', 3, 0);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (6, 1, 'done card 1', 3, 1);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (7, 2, 'new card 1', 0, 0);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (8, 2, 'new card 2', 0, 1);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (9, 2, 'in progress card', 1, 0);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (10, 2, 'planning', 2, 0);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (11, 2, 'done card 1', 3, 0);
INSERT INTO public.cards (id, board_id, title, status_id, "order") VALUES (12, 2, 'done card 1', 3, 1);


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: kprohaszka
--

INSERT INTO public.statuses (id, title) VALUES (0, 'new');
INSERT INTO public.statuses (id, title) VALUES (1, 'in progress');
INSERT INTO public.statuses (id, title) VALUES (2, 'testing');
INSERT INTO public.statuses (id, title) VALUES (3, 'done');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kprohaszka
--



--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kprohaszka
--

SELECT pg_catalog.setval('public.boards_id_seq', 1, false);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kprohaszka
--

SELECT pg_catalog.setval('public.cards_id_seq', 1, false);


--
-- Name: statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kprohaszka
--

SELECT pg_catalog.setval('public.statuses_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kprohaszka
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: cards board_id___fk; Type: FK CONSTRAINT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT board_id___fk FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- Name: boards boards_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: cards cards_status_id___fk; Type: FK CONSTRAINT; Schema: public; Owner: kprohaszka
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_status_id___fk FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- PostgreSQL database dump complete
--

