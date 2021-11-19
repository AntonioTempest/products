const { Pool, Client } = require('pg')


const prods = new Pool({
  user: "postgres",
  database: "proddb",
  port: 5432
})



const dataQueries = {}

dataQueries.getProducts = function(request) {
  // console.log(request.query)
  let numResults = 5;
  if (request.query.count) {
    numResults = request.query.count;
  }
  let page = 1;
  const response = prods.query(`select * from product limit ${numResults}`);
  return response;
}

dataQueries.getProductId = (request) => {
  product = request.params.product_id;
  const response = prods.query(`select * from product left outer join features on product.id = features.product_id where product.id = '${product}'`);
  return response;
}

dataQueries.getProductStyles = (request) => {
  product = request.params.product_id;
  // const response = prods.query(`select * from product
  //                               left outer join styles
  //                               on product.id = styles.productid
  //                               left outer join photos
  //                               on styles.id = photos.styleid
  //                               where product.id = '${product}'`);
  const response = prods.query(`
                                select * from styles
                                left outer join photos
                                on styles.id = photos.styleid
                                left outer join skus
                                on styles.id = skus.styleid
                                where styles.productid = '${product}'
                                `);
  return response;
}





module.exports = dataQueries