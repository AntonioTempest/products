SELECT 'CREATE DATABASE proddb' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'myNewDB')\gexec

\c proddb;

CREATE TABLE product (
  id INTEGER,
  name TEXT NULL DEFAULT NULL,
  slogan TEXT NULL DEFAULT NULL,
  description VARCHAR NULL DEFAULT NULL,
  category VARCHAR NULL DEFAULT NULL,
  default_price INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Table 'features'


CREATE TABLE features (
  id INTEGER,
  product_id INTEGER,
  feature VARCHAR NULL DEFAULT NULL,
  value VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product (id)
);


-- Table 'results'
--

CREATE TABLE styles (
  id INTEGER,
  productId INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  sale_price VARCHAR DEFAULT NULL,
  original_price INTEGER NULL DEFAULT 0,
  default_style boolean DEFAULT 'false',
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES product (id)
);

-- Table 'photos'
--

CREATE TABLE photos (
  id INTEGER,
  styleId INTEGER,
  url VARCHAR,
  thumbnail_url VARCHAR,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES styles (id)
);

-- Table 'skus'
--

CREATE TABLE skus (
  id INTEGER,
  styleId INTEGER NULL DEFAULT NULL,
  size VARCHAR NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (styleId) REFERENCES styles (id)
);

-- Table 'related'
--


CREATE TABLE related (
  id INTEGER,
  current_product_id INTEGER,
  related_product_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (current_product_id) REFERENCES product (id)
);

-- Table 'features'
--


-- Table 'results_skus'
--

CREATE TABLE styles_skus (
  id serial,
  styles_id INTEGER REFERENCES styles (id) ON DELETE CASCADE ON UPDATE CASCADE,
  skus_id INTEGER REFERENCES skus (id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id)
);
