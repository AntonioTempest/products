

CREATE TABLE products (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  name VARCHAR(50) NULL DEFAULT NULL,
  slogan VARCHAR(100) NULL DEFAULT NULL,
  description VARCHAR NULL DEFAULT NULL,
  category VARCHAR(50) NULL DEFAULT NULL,
  default_price INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);


-- Table 'productInformation'


CREATE TABLE productInformation (
  id INTEGER,
  feature VARCHAR(50) NULL DEFAULT NULL,
  value VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES products(id)
);

-- Table 'styles'
--

-- Table 'results'

CREATE TABLE results (
  id INTEGER,
  style_id INTEGER NULL DEFAULT NULL,
  name VARCHAR(50) NULL DEFAULT NULL,
  original_price INTEGER NULL DEFAULT NULL,
  sale_price INTEGER NULL DEFAULT 0,
  default? BINARY NULL DEFAULT false,
  photos JSON NULL DEFAULT NULL COMMENT 'JSON formatted string',
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES products(id)
);

-- Table 'skus'
--

CREATE TABLE skus (
  id INTEGER,
  skuID INTEGER NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  size VARCHAR(5) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES products(id)
);

-- Table 'related'
--

CREATE TABLE related (
  id INTEGER,
  related_id INTEGER NULL DEFAULT NULL COMMENT 'related products',
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES products(id)
);