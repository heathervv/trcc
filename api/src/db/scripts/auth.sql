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

-- TODO use environment variables
INSERT INTO users (username, password)
  VALUES ('laura', crypt('fake-password', gen_salt('bf')));