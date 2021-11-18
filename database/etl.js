const fs = require('fs');
const fastcsv = require('fast-csv');
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  database: "proddb",
  port: 5432
});

var fileName = 'product.csv'
var inputRow = []

const dbquery =
  `INSERT INTO ${fileName.slice(0, fileName.length-4)} (id, name, slogan, description, category, default_price) VALUES (1, 'jacket', 'wear it', 'warmly', 'winter', 113)`;

console.log(dbquery)

// pool.query(dbquery)
//   .then(console.log('inserted? go check'))
//   .catch(err => console.log(err));

// \copy product(id, name, slogan, description, category, default_price) FROM '/home/pjjpb/hackreactor/antonio/products/productData/product.csv' WITH (FORMAT CSV, HEADER true)
// \copy features(id, product_id, feature, value) FROM '/home/pjjpb/hackreactor/antonio/products/productData/features.csv' WITH (FORMAT CSV, HEADER true)
// \copy styles(id, productId, name, sale_price, original_price, default_style) FROM '/home/pjjpb/hackreactor/antonio/products/productData/styles.csv' WITH (FORMAT CSV, HEADER true, null '')
// \copy photos(id, styleId, url, thumbnail_url) FROM '/home/pjjpb/hackreactor/antonio/products/productData/photos.csv' WITH (FORMAT CSV, HEADER true)
// \copy skus(id, styleId, size, quantity) FROM '/home/pjjpb/hackreactor/antonio/products/productData/skus.csv' WITH (FORMAT CSV, HEADER true)
// \copy related(id, current_product_id, related_product_id) FROM '/home/pjjpb/hackreactor/antonio/products/productData/related.csv' WITH (FORMAT CSV, HEADER true)
// /home/pjjpb/hackreactor/antonio/products/productData/product.csv