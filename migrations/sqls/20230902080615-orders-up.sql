CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  product_id INTEGER  NOT NULL REFERENCES products (id),
  status  BOOLEAN NOT NULL
);