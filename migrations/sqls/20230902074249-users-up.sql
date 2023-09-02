CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  username        VARCHAR(200) NOT NULL,
  firstname       VARCHAR(200) NOT NULL,
  lastname        VARCHAR(200) NOT NULL,
  encode_pass     VARCHAR(200) NOT NULL
);
