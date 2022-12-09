
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

DROP DATABASE merilna_enota;

CREATE DATABASE merilna_enota WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE merilna_enota OWNER TO postgres;

CREATE SCHEMA meritve;


ALTER SCHEMA meritve OWNER TO postgres;

CREATE TABLE meritve."PODATKI" (
    "ID" integer NOT NULL,
    "RAZRED_ID" integer NOT NULL,
    "TEMPERATURA" double precision,
    "VLAGA" double precision,
    "KAKOVOST" double precision,
    "SVETLOBA" double precision,
    "DAT_VNO" timestamp with time zone DEFAULT clock_timestamp()
);


ALTER TABLE meritve."PODATKI" OWNER TO postgres;


CREATE SEQUENCE meritve."PODATKI_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE meritve."PODATKI_ID_seq" OWNER TO postgres;

ALTER SEQUENCE meritve."PODATKI_ID_seq" OWNED BY meritve."PODATKI"."ID";

CREATE TABLE meritve."RAZRED" (
    "ID" integer NOT NULL,
    "NAZIV" character varying(50) NOT NULL,
    "OPIS" character varying(200),
    "AKTIVEN" boolean,
    "DAT_VNO" timestamp with time zone DEFAULT clock_timestamp()
);


ALTER TABLE meritve."RAZRED" OWNER TO postgres;


CREATE SEQUENCE meritve."RAZRED_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE meritve."RAZRED_ID_seq" OWNER TO postgres;


ALTER SEQUENCE meritve."RAZRED_ID_seq" OWNED BY meritve."RAZRED"."ID";



ALTER TABLE ONLY meritve."PODATKI" ALTER COLUMN "ID" SET DEFAULT nextval('meritve."PODATKI_ID_seq"'::regclass);


ALTER TABLE ONLY meritve."RAZRED" ALTER COLUMN "ID" SET DEFAULT nextval('meritve."RAZRED_ID_seq"'::regclass);


ALTER TABLE ONLY meritve."RAZRED"
    ADD CONSTRAINT "RAZRED_pkey" PRIMARY KEY ("ID");


ALTER TABLE ONLY meritve."PODATKI"
    ADD CONSTRAINT podatki_pk PRIMARY KEY ("ID");

ALTER TABLE ONLY meritve."PODATKI"
    ADD CONSTRAINT podatki_fk FOREIGN KEY ("RAZRED_ID") REFERENCES meritve."RAZRED"("ID");

