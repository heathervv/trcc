DROP DATABASE IF EXISTS trcc;
CREATE DATABASE trcc;

\c trcc;

CREATE EXTENSION pgcrypto;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  token VARCHAR UNIQUE
);

--INSERT INTO users (username, password)
--  VALUES ('username', crypt('password', gen_salt('bf')));