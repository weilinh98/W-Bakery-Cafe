--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	15	2	2595
2	16	2	2595
3	17	2	2595
4	18	2	2595
5	18	2	2595
6	18	2	2595
7	18	3	2900
8	18	2	2595
9	18	2	2595
220	19	1	2999
222	19	3	2900
224	20	3	2900
226	20	3	2900
228	20	3	2900
230	20	3	2900
232	21	4	999
234	23	2	2595
236	25	3	2900
239	27	3	2900
242	29	7	799
245	30	8	699
247	30	7	799
249	33	7	799
251	35	7	799
253	36	7	799
255	37	7	799
221	19	2	2595
223	19	4	999
225	20	3	2900
227	20	3	2900
229	20	3	2900
231	20	3	2900
233	22	2	2595
235	24	2	2595
237	25	4	999
238	26	2	2595
241	29	8	699
243	29	9	799
246	31	8	699
248	32	7	799
250	34	7	799
252	36	7	799
254	36	7	799
256	38	8	699
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-01-14 23:49:57.823699+00
2	2020-01-14 23:50:07.314585+00
3	2020-01-14 23:50:23.814413+00
4	2020-01-14 23:50:26.041109+00
5	2020-01-14 23:50:29.170881+00
6	2020-01-14 23:53:34.964894+00
7	2020-01-15 00:01:59.685487+00
8	2020-01-15 00:02:08.864177+00
9	2020-01-15 00:02:31.399204+00
10	2020-01-15 00:03:38.636877+00
11	2020-01-15 00:04:22.358976+00
12	2020-01-15 00:05:11.37873+00
13	2020-01-15 00:05:53.7078+00
14	2020-01-15 00:11:10.79969+00
15	2020-01-15 00:16:16.607193+00
16	2020-01-15 00:21:06.675397+00
17	2020-01-15 00:45:39.888798+00
18	2020-01-15 01:07:06.542736+00
19	2020-01-15 19:57:27.804999+00
20	2020-01-15 22:53:24.59+00
21	2020-01-15 23:58:02.033301+00
22	2020-01-16 18:28:44.844042+00
23	2020-01-16 19:10:00.052765+00
24	2020-01-16 19:11:59.034936+00
25	2020-01-16 19:27:57.316958+00
26	2020-01-18 19:58:38.180124+00
27	2020-01-19 22:01:16.828585+00
28	2020-02-06 23:36:13.807531+00
29	2020-02-07 21:39:18.682446+00
30	2020-02-08 01:05:42.891138+00
31	2020-02-08 01:22:36.70712+00
32	2020-02-08 01:33:59.81681+00
33	2020-02-08 01:43:19.565794+00
34	2020-02-08 01:46:21.961832+00
35	2020-02-08 01:51:24.633164+00
36	2020-02-08 01:52:06.78092+00
37	2020-02-08 01:58:04.458016+00
38	2020-02-08 08:40:16.030449+00
39	2020-02-08 20:13:12.388057+00
40	2020-02-09 16:24:12.615009+00
41	2020-02-10 21:45:40.209158+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	20	tony	2382744892	1200 Tyndall Ave	2020-01-15 23:23:52.015145+00
2	20	tony	2382744892	1200 Tyndall Ave	2020-01-15 23:29:45.865713+00
3	20	tony	2382744892	1200 Tyndall Ave	2020-01-15 23:30:29.307702+00
4	20	tony	2382744892	1200 Tyndall Ave	2020-01-15 23:32:09.367677+00
5	21	tony	2382744892	1200 Tyndall Ave	2020-01-15 23:58:08.765126+00
10	22	oikh	8967578	fhgjk	2020-01-16 19:08:44.019288+00
11	23	harry	243253	gdjwdhh street	2020-01-16 19:10:39.103569+00
12	24	wweiw	1234567	hwdjwh street	2020-01-16 19:12:12.624606+00
13	29	we	wrrwr	wee	2020-02-08 00:53:05.145695+00
14	30	Weilin	888888888888	99 Sweet st.	2020-02-08 01:31:23.591043+00
15	32	wueh	890	jeklq	2020-02-08 01:34:12.059977+00
16	33	Weilin	27849	hwjfjkwf	2020-02-08 01:43:37.101925+00
17	34	weilin	163789	hdiwj	2020-02-08 01:46:34.753531+00
18	35	weilin	123	hjk	2020-02-08 01:51:43.246372+00
19	37	weilin hong	567890	dfghjk	2020-02-08 01:58:18.027206+00
20	38	fghj	456789	xcvbnm	2020-02-08 08:40:36.349456+00
21	38	ghj	345678	hjkm	2020-02-08 08:43:22.965522+00
22	38	fghj	56789	fghj	2020-02-08 08:44:23.87092+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
7	Choco Lover	799	/images/donuts/choco-cupcake.jpeg	Made with finest cocoa powder along with the most moisturizing cake which will blow your mind	Our classic Choco Lover is the most popular cupcake in store! It is made of the finest organic cocoa powder in the world. Milk and chocolate cream on top of the chocolate cakke. No wonder it tastes so good. Topped with a rasberry which will lighten your day! 
8	Sweet Zebra	699	/images/donuts/sweet-zebra.jpg	The perfect combination of coffe and fresh creamy Japanese sweet milk 	The Sweet Zebra is not fully sweet! The bitterness from the expresso and the sweetness of Japanese sweet milk cream are the best taste you will ever try. Get one for breakfast with our classic latte. 
9	Classic Vanilla	799	/images/donuts/classic-vanilla.jpeg	Super classic madagascan vanilla cream on top of our famous cupcake	Who can say no to vanilla cupcake?! I am drooling when I am writing this, where am I, who am I? Please get me this cupcake!! The vanilla frosting is made with Madagascan 
11	Shine n Creamy	799	/images/donuts/grape-cupcake.jpeg	Made with the finest grape from Korea, it's fruity and creamy!	Made with Shine Muscat grapes, cream never tastes so good. We mixed this luxury grape with the luxury heavy cream and luxury cane sugar. Everything gotta be luxury because the grapes are soooo expensive. 
12	I AM UGLY	399	/images/donuts/ugly.jpeg	I am ugly, and why I am the cheapest donut here?!	Look at me in the eyes! Tell me I am not ugly!! I am very tasty!! I am coated with brownie bites and brown sugar. I am so delicious that I even want to eat myself!
13	Valentine Lover	799	/images/donuts/valentine.jpeg	OMG, it's Valentine's Day! No matter you have Valentine or not, come get one!	What?! It's Valentine's Day again? The heart sprinkles are looking at you! Please bring me home to your lover, partner, huband, girlfriend, crush(omg, that's so cute!). Can't wait to see you!
10	Lemon Rainbow	699	/images/donuts/yellow-rainbow.jpg	Look like a yellow sky with rainbow, that's why we gave this name to this creative donut	Have you tried our lemon frosting yet, it's not super sour because we add a lot of love while baking. We are here to make your life happier 
14	Sky Choco & Sky Donut Holes	1099	/images/donuts/hot-chocolate.jpg	Hot chocolate topped with marshmallows and donut holes on the side? Wait for me, girl, I am on my way!	Customers favorite combination of after tea! Why everything is so cute in our store! This is an in-store only item, please come in our store at 99 Cute Ave to enjoy this beautiful dessert set! Add to cart right now to get it at discount price. In store price is $15.99. What a good deal!
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 266, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 41, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 22, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

