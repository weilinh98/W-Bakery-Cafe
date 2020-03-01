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
    price integer NOT NULL,
    quantity integer
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
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    "firstName" text,
    "lastName" text,
    "emailAddress" character varying(255),
    "phoneNumber" character(10),
    "nameOnCard" text,
    city character varying(50),
    state character(2),
    "zipCode" character(5),
    country character(2),
    cvv character(3),
    "creditCardNumber" character(16),
    mm character varying(2),
    yy character(4)
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

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity) FROM stdin;
2	16	2	2595	\N
3	17	2	2595	\N
4	18	2	2595	\N
5	18	2	2595	\N
6	18	2	2595	\N
7	18	3	2900	\N
8	18	2	2595	\N
9	18	2	2595	\N
220	19	1	2999	\N
222	19	3	2900	\N
224	20	3	2900	\N
226	20	3	2900	\N
228	20	3	2900	\N
230	20	3	2900	\N
232	21	4	999	\N
234	23	2	2595	\N
236	25	3	2900	\N
239	27	3	2900	\N
242	29	7	799	\N
245	30	8	699	\N
247	30	7	799	\N
249	33	7	799	\N
251	35	7	799	\N
253	36	7	799	\N
255	37	7	799	\N
293	57	8	699	3
270	42	8	699	\N
272	43	8	699	\N
1	15	2	2595	3
281	49	7	799	1
283	51	7	799	1
285	53	7	799	1
294	58	8	699	5
297	58	11	799	1
298	59	8	699	1
300	61	8	699	1
289	55	7	799	7
291	57	13	799	5
304	64	7	799	1
306	65	8	699	1
302	63	8	699	2
308	63	9	799	1
309	63	14	1099	1
311	67	8	699	1
313	69	8	699	1
315	71	7	799	1
317	73	7	799	1
296	58	9	799	5
319	75	8	699	1
321	77	7	799	1
323	79	7	799	1
325	81	8	699	1
327	83	8	699	1
329	85	8	699	1
331	87	7	799	1
333	89	8	699	1
335	91	8	699	1
337	93	8	699	1
339	95	8	699	1
341	97	7	799	1
343	99	9	799	1
345	101	7	799	1
347	103	8	699	1
349	105	7	799	1
351	107	10	699	1
353	109	7	799	1
355	111	11	799	1
357	113	8	699	1
359	115	7	799	1
361	117	7	799	1
221	19	2	2595	\N
223	19	4	999	\N
225	20	3	2900	\N
227	20	3	2900	\N
229	20	3	2900	\N
231	20	3	2900	\N
233	22	2	2595	\N
235	24	2	2595	\N
237	25	4	999	\N
238	26	2	2595	\N
241	29	8	699	\N
243	29	9	799	\N
246	31	8	699	\N
248	32	7	799	\N
250	34	7	799	\N
252	36	7	799	\N
254	36	7	799	\N
256	38	8	699	\N
295	58	14	1099	34
273	12	2	3	\N
274	12	2	3	\N
275	23	29	9009	\N
282	50	7	799	1
284	52	7	799	1
292	57	7	799	7
286	54	7	799	1
290	56	8	699	1
299	60	10	699	999999
301	62	8	699	1
307	65	7	799	1
305	63	7	799	2
303	63	8	699	2
310	66	8	699	1
312	68	7	799	1
314	70	7	799	1
316	72	8	699	1
318	74	8	699	1
320	76	7	799	1
322	78	8	699	1
324	80	7	799	1
326	82	8	699	1
328	84	8	699	1
330	86	8	699	1
332	88	8	699	1
334	90	8	699	1
336	92	8	699	1
338	94	8	699	1
340	96	8	699	1
342	98	7	799	1
344	100	7	799	1
346	102	7	799	1
348	104	7	799	1
350	106	8	699	1
352	108	8	699	1
354	110	8	699	1
356	112	8	699	1
358	114	8	699	1
360	116	7	799	1
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
42	2020-02-11 18:37:27.322535+00
43	2020-02-11 20:54:36.887415+00
44	2020-02-12 21:05:20.209287+00
45	2020-02-12 21:06:54.754477+00
46	2020-02-12 21:08:07.729557+00
47	2020-02-12 21:08:49.759467+00
48	2020-02-12 21:10:57.643212+00
49	2020-02-12 21:11:39.734956+00
50	2020-02-12 21:21:20.168952+00
51	2020-02-12 21:21:33.636127+00
52	2020-02-12 21:21:59.802603+00
53	2020-02-12 21:24:03.093746+00
54	2020-02-12 21:24:15.158352+00
55	2020-02-12 21:28:15.012818+00
56	2020-02-13 19:45:44.276101+00
57	2020-02-14 23:14:22.1049+00
58	2020-02-18 20:02:18.363282+00
59	2020-02-19 18:47:15.525351+00
60	2020-02-20 02:32:09.10908+00
61	2020-02-20 18:47:37.959703+00
62	2020-02-24 17:34:37.489589+00
63	2020-02-25 19:38:14.47529+00
64	2020-02-25 20:29:28.134995+00
65	2020-02-25 23:02:12.116165+00
66	2020-02-26 00:57:05.05049+00
67	2020-02-26 00:58:35.680179+00
68	2020-02-26 01:00:15.866953+00
69	2020-02-26 01:01:06.637553+00
70	2020-02-26 01:02:48.388373+00
71	2020-02-26 03:25:55.454093+00
72	2020-02-26 17:32:54.379997+00
73	2020-02-26 18:28:01.677212+00
74	2020-02-26 18:32:06.422877+00
75	2020-02-26 22:46:28.056811+00
76	2020-02-26 22:47:27.534577+00
77	2020-02-26 22:51:56.421826+00
78	2020-02-26 22:54:12.052639+00
79	2020-02-26 22:58:55.256406+00
80	2020-02-26 23:11:03.818653+00
81	2020-02-26 23:15:29.529387+00
82	2020-02-27 00:11:46.243804+00
83	2020-02-27 21:30:37.170603+00
84	2020-02-27 21:36:59.007143+00
85	2020-02-27 21:39:18.578499+00
86	2020-03-01 18:29:06.404038+00
87	2020-03-01 19:52:27.787533+00
88	2020-03-01 19:57:26.130381+00
89	2020-03-01 19:58:22.248105+00
90	2020-03-01 20:08:57.811524+00
91	2020-03-01 20:14:57.944778+00
92	2020-03-01 20:22:12.298196+00
93	2020-03-01 20:22:47.001434+00
94	2020-03-01 20:25:33.30038+00
95	2020-03-01 20:27:03.857126+00
96	2020-03-01 20:29:58.234731+00
97	2020-03-01 20:31:03.542677+00
98	2020-03-01 20:35:26.367381+00
99	2020-03-01 20:40:21.652854+00
100	2020-03-01 20:41:16.478219+00
101	2020-03-01 20:55:32.551543+00
102	2020-03-01 20:58:21.520633+00
103	2020-03-01 21:01:38.918872+00
104	2020-03-01 21:02:49.292339+00
105	2020-03-01 21:03:30.578462+00
106	2020-03-01 21:05:10.426842+00
107	2020-03-01 21:07:57.877064+00
108	2020-03-01 21:33:08.798998+00
109	2020-03-01 21:33:42.014735+00
110	2020-03-01 21:35:52.472609+00
111	2020-03-01 21:37:57.821673+00
112	2020-03-01 21:39:00.429615+00
113	2020-03-01 21:42:12.605847+00
114	2020-03-01 21:44:06.135594+00
115	2020-03-01 21:45:21.169248+00
116	2020-03-01 21:46:39.551895+00
117	2020-03-01 21:47:15.503619+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", "shippingAddress", "createdAt", "firstName", "lastName", "emailAddress", "phoneNumber", "nameOnCard", city, state, "zipCode", country, cvv, "creditCardNumber", mm, yy) FROM stdin;
1	20	1200 Tyndall Ave	2020-01-15 23:23:52.015145+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
2	20	1200 Tyndall Ave	2020-01-15 23:29:45.865713+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
3	20	1200 Tyndall Ave	2020-01-15 23:30:29.307702+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
4	20	1200 Tyndall Ave	2020-01-15 23:32:09.367677+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
5	21	1200 Tyndall Ave	2020-01-15 23:58:08.765126+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
10	22	fhgjk	2020-01-16 19:08:44.019288+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
11	23	gdjwdhh street	2020-01-16 19:10:39.103569+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
12	24	hwdjwh street	2020-01-16 19:12:12.624606+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
13	29	wee	2020-02-08 00:53:05.145695+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
14	30	99 Sweet st.	2020-02-08 01:31:23.591043+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
15	32	jeklq	2020-02-08 01:34:12.059977+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
16	33	hwjfjkwf	2020-02-08 01:43:37.101925+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
17	34	hdiwj	2020-02-08 01:46:34.753531+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
18	35	hjk	2020-02-08 01:51:43.246372+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
19	37	dfghjk	2020-02-08 01:58:18.027206+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
20	38	xcvbnm	2020-02-08 08:40:36.349456+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
21	38	hjkm	2020-02-08 08:43:22.965522+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
22	38	fghj	2020-02-08 08:44:23.87092+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
23	42	fefe	2020-02-11 20:51:04.030065+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
24	42	bdjwdmw	2020-02-11 20:54:05.544127+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
25	43	bhjdwhdkw\n\n	2020-02-11 20:54:47.354431+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
26	58	     	2020-02-18 20:09:49.567904+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
27	65	201 Great Lawn	2020-02-25 23:02:42.998153+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	weeffe	Irvine	CA	13131	US	131	1213111111111111	2	2020
28	63	201 Great Lawn	2020-02-26 00:53:06.668909+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	ddddddddddd	Irvine	CA	22222	US	222	2222222222222222	2	2020
29	66	201 Great Lawn	2020-02-26 00:57:25.926041+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwwwwwwwww	Irvine	CA	11111	US	111	1111111111111111	2	2020
30	67	201 Great Lawn	2020-02-26 00:59:00.539235+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwww	Irvine	CA	22222	US	222	2222222222222222	2	2020
31	68	201 Great Lawn	2020-02-26 01:00:38.30534+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwwww	Irvine	CA	88888	US	567	9999999999999999	2	2020
32	69	201 Great Lawn	2020-02-26 01:01:27.510156+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	efefe	Irvine	CA	24322	US	232	2323333333232323	2	2020
33	70	201 Great Lawn	2020-02-26 01:03:10.741088+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wewew	Irvine	CA	22323	US	232	2222222222222222	2	2020
34	72	201 Great Lawn	2020-02-26 17:33:14.203123+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwww	Irvine	CA	22222	US	222	2222222222222222	2	2020
35	73	201 Great Lawn	2020-02-26 18:30:10.088407+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwww	Irvine	CA	23214	US	222	2222222222222222	2	2020
36	73	201 Great Lawn	2020-02-26 18:30:57.873557+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	weeeeeeeeeeeeee	Irvine	CA	22222	US	222	2222222222222222	2	2020
37	74	201 Great Lawn	2020-02-26 18:32:25.883192+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee	Irvine	CA	22222	US	222	2222222222222222	2	2020
38	75	201 Great Lawn	2020-02-26 22:46:49.892592+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	Wejjk	Irvine	CA	89999	US	888	8888888888888888	2	2020
39	76	201 Great Lawn	2020-02-26 22:47:54.979652+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	ggggggggggggg	Irvine	CA	77777	US	788	6666666666666666	2	2020
40	77	201 Great Lawn	2020-02-26 22:52:25.621781+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	mkkkkkkkkkkk	Irvine	CA	89999	US	999	9999999999999999	2	2020
41	78	201 Great Lawn	2020-02-26 22:54:37.465137+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwwww	Irvine	CA	92620	US	111	3333333333333333	2	2020
42	79	201 Great Lawn	2020-02-26 22:59:17.233948+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	,,mmmmmmmmmmmmm	Irvine	CA	92620	US	999	0000000000000000	2	2020
43	80	201 Great Lawn	2020-02-26 23:11:21.11086+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	weweww	Irvine	CA	92620	US	232	2222222222222222	2	2020
44	81	201 Great Lawn	2020-02-26 23:15:47.830777+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwwwwwwwwwwwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	2	2020
45	82	201 Great Lawn	2020-02-27 00:12:25.903974+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	tyuio	Irvine	CA	92620	US	787	6777777777777777	2	2020
46	83	201 Great Lawn	2020-02-27 21:30:54.046928+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwww	Irvine	CA	92620	US	111	1111111111111111	2	2020
47	84	201 Great Lawn	2020-02-27 21:37:54.338522+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	ghjkl;;;	Irvine	CA	92620	US	718	6111111111111666	2	2020
48	85	201 Great Lawn	2020-02-27 21:39:46.577606+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwww	Irvine	CA	92620	US	111	1111111111111111	2	2020
49	86	201 Great Lawn	2020-03-01 19:35:15.571266+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	WWWWjkjjjj	Irvine	CA	92620	US	788	7777777777777777	3	2020
50	87	201 Great Lawn	2020-03-01 19:52:43.483805+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	jdkddd	Irvine	CA	92620	US	222	2222222222222222	3	2020
51	88	201 Great Lawn	2020-03-01 19:57:43.937807+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	jjjjjjjjjjjjj	Irvine	CA	92620	US	000	0000000000000000	3	2020
52	89	201 Great Lawn	2020-03-01 19:58:38.857296+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	mmmmmmmmmmmmm	Irvine	CA	92620	US	000	0000000000000000	3	2020
53	90	201 Great Lawn	2020-03-01 20:09:17.594969+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	kkkkkkkkkkkk	Irvine	CA	92620	US	999	9999999999999999	3	2020
54	91	201 Great Lawn	2020-03-01 20:15:12.686497+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	3	2020
55	92	201 Great Lawn	2020-03-01 20:22:29.120509+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	uuuuuuuuuuuu	Irvine	CA	92620	US	999	9999999999999999	3	2020
56	93	201 Great Lawn	2020-03-01 20:23:04.116084+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	jjjjjjjjjjj	Irvine	CA	92620	US	888	9999999999999999	3	2020
57	94	201 Great Lawn	2020-03-01 20:25:50.61528+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	iiiiiiiiiii	Irvine	CA	92620	US	888	9999999999999999	3	2020
58	95	201 Great Lawn	2020-03-01 20:27:20.728091+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	iiiiiiiiiiiiiii	Irvine	CA	92620	US	888	8888888888888888	3	2020
59	96	201 Great Lawn	2020-03-01 20:30:14.440686+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	iiiiiiiiiiiiiii	Irvine	CA	92620	US	999	9999999999999999	3	2020
60	97	201 Great Lawn	2020-03-01 20:31:21.75398+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	mkkkkkkkk	Irvine	CA	92620	US	888	9999999999999999	3	2020
61	98	201 Great Lawn	2020-03-01 20:35:41.390277+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	kkkkkkkkkkk	Irvine	CA	92620	US	000	0000000000000000	3	2020
62	99	201 Great Lawn	2020-03-01 20:40:37.157913+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	oooooooooooo	Irvine	CA	92620	US	999	0000000000000000	3	2020
63	100	201 Great Lawn	2020-03-01 20:41:31.327711+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	ooooooo	Irvine	CA	92620	US	000	0000000000000000	3	2020
64	101	201 Great Lawn	2020-03-01 20:55:47.279146+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	kkkkkkkkkkk	Irvine	CA	92620	US	222	2222222222222222	3	2020
65	102	201 Great Lawn	2020-03-01 20:58:37.74469+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	iiiiiiiiii	Irvine	CA	92620	US	999	9999999999999999	3	2020
66	103	201 Great Lawn	2020-03-01 21:01:52.912354+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	3	2020
67	104	201 Great Lawn	2020-03-01 21:03:05.429982+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	jjjjjjjjjjjjj	Irvine	CA	92620	US	888	8888888888888888	3	2020
68	105	201 Great Lawn	2020-03-01 21:03:44.774849+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	weeeeeeeeee	Irvine	CA	89999	US	222	2222222222222222	3	2020
69	106	201 Great Lawn	2020-03-01 21:05:24.233727+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	3	2020
70	107	201 Great Lawn	2020-03-01 21:08:11.845032+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwww	Irvine	CA	92620	US	111	1111111111111111	3	2020
71	108	201 Great Lawn	2020-03-01 21:33:22.256944+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwww	Irvine	CA	92620	US	111	1111111111111111	3	2020
72	109	201 Great Lawn	2020-03-01 21:33:54.752683+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	qqqqqqqqq	Irvine	CA	89999	US	111	1111111111111111	3	2020
73	110	201 Great Lawn	2020-03-01 21:36:06.160816+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	qqqqqqqqqq	Irvine	CA	92620	US	111	1111111111111111	3	2020
74	111	201 Great Lawn	2020-03-01 21:38:09.998265+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	3	2020
75	112	201 Great Lawn	2020-03-01 21:39:13.194113+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	3	2020
76	113	201 Great Lawn	2020-03-01 21:42:25.808722+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wewewew	Irvine	CA	92620	US	222	2222222222222222	3	2020
77	114	201 Great Lawn	2020-03-01 21:44:30.143831+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	3	2020
78	115	201 Great Lawn	2020-03-01 21:45:34.650342+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	3	2020
79	116	201 Great Lawn	2020-03-01 21:46:51.544376+00	Weilin	Hong	weilinhong007@gmail.com	5205858005	wwwwwwwww	Irvine	CA	92620	US	222	2222222222222222	3	2020
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
7	Choco Lover	799	/images/donuts/choco-cupcake.jpeg	Made with finest cocoa powder along with the most moisturizing cake which will blow your mind	Our classic Choco Lover is the most popular cupcake in store! It is made of the finest organic cocoa powder in the world. Milk and chocolate cream on top of the chocolate cakke. No wonder it tastes so good. Topped with a rasberry which will lighten your day! 
9	Classic Vanilla	799	/images/donuts/classic-vanilla.jpeg	Super classic madagascan vanilla cream on top of our famous cupcake	Who can say no to vanilla cupcake?! I am drooling when I am writing this, where am I, who am I? Please get me this cupcake!! The vanilla frosting is made with Madagascan 
11	Shine n Creamy	799	/images/donuts/grape-cupcake.jpeg	Made with the finest grape from Korea, it's fruity and creamy!	Made with Shine Muscat grapes, cream never tastes so good. We mixed this luxury grape with the luxury heavy cream and luxury cane sugar. Everything gotta be luxury because the grapes are soooo expensive. 
12	I AM UGLY	399	/images/donuts/ugly.jpeg	I am ugly, and why I am the cheapest donut here?!	Look at me in the eyes! Tell me I am not ugly!! I am very tasty!! I am coated with brownie bites and brown sugar. I am so delicious that I even want to eat myself!
10	Lemon Rainbow	699	/images/donuts/yellow-rainbow.jpg	Look like a yellow sky with rainbow, that's why we gave this name to this creative donut	Have you tried our lemon frosting yet, it's not super sour because we add a lot of love while baking. We are here to make your life happier 
13	Valentine Lover	799	/images/donuts/valentine.jpeg	OMG, it's Valentine's Day! No matter you have Valentine or not, come get one!	What?! It's Valentine's Day again? The heart sprinkles are looking at you! Please bring me home to your lover, partner, husband, girlfriend, crush. Can't wait to see you!
8	Sweet Zebra	699	/images/donuts/sweet-zebra.jpg	The perfect combination of coffee and fresh creamy Japanese sweet milk	The Sweet Zebra is not fully sweet! The bitterness from the expresso and the sweetness of Japanese sweet milk cream are the best taste you will ever try. Get one for breakfast with our classic latte. 
14	Sky Choco & Sky Donut Holes	1099	/images/donuts/hot-chocolate.jpg	Hot chocolate topped with marshmallows and donut holes on the side? Wait for me, girl, I am on my way!	Customers favorite combination of after tea! Why everything is so cute in our store! This is an in-store only item, please come in our store at 99 Cute Ave to enjoy this beautiful dessert set! Add to cart right now to get it at discount price. In store price is $15.99. What a good deal!
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 361, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 117, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 79, true);


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

