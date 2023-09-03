# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.
Below is some endpoints we can use in this project.

## API Endpoints

#### Products

- Index: `'products/' [GET]`
- Show: `'products/:id' [GET]`
- Create [token required]: `'products/' [POST] (token)`
- Update [token required]: `'products/:id' [PUT] (token)`
- Delete [token required]: `'products/:id  [DELETE] (token)`

#### Users

- Index [token required]: `'users/' [GET] (token)`
- Show [token required]: `'users/:id' [GET] (token)`
- Create [token required]: `'users/' [POST] (token)`

#### Orders

- Index [token required]: `'orders/:id' [GET] (token)`
- Show [token required]: `'orders/:id' [GET] (token)`
- Create [token required]: `'orders/ [POST] (token)`

## Data Shapes

#### Products

- id
- name
- price

```
Table: products (id: serial[primary key], name: varchar(200)[not null], price: integer[not null])
```

#### Users

- id
- firstname
- lastname
- endcode_pass

```
Table: users (id: serial[primary key], username: varchar (200)[not null], firstname: varchar (200)[not null], lastname: varchar(200)[not null], endcode_pass: varchar(200)[not null])
```

#### Orders

- id
- user_id
- status

```
Table: orders (id: serial[primary key], product_id: integer(foreign key to products table),user_id: integer(foreign key to users table), status: varchar[not null])
```

#### Order Products

- id
- order_id
- product_id
- quantity

```
Table: order_products (id: serial[primary key], product_id: integer(foreign key to products table),order_id: integer(foreign key to orders table), quantity: integer)
```
