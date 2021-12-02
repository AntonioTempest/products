const { Pool } = require('pg')


const prods = new Pool({
	host: "3.144.202.25",
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

  const response = prods.query(`select * from product limit ${numResults}`);
  return response;
}

dataQueries.getProductId = (request) => {
  var product = request.params.product_id;
  const response = prods.query(`select * from product left outer join features on product.id = features.product_id where product.id = '${product}'`);
  return response;
}

// dataQueries.getProductStyles = (request) => {
//   var product = request.params.product_id;
//   // const response = prods.query(`select * from product
//   //                               left outer join styles
//   //                               on product.id = styles.productid
//   //                               left outer join photos
//   //                               on styles.id = photos.styleid
//   //                               where product.id = '${product}'`);
//   const response = prods.query(`
//                                 select * from styles
//                                 left outer join photos
//                                 on styles.id = photos.styleid
//                                 left outer join skus
//                                 on styles.id = skus.styleid
//                                 where styles.productid = '${product}'
//                                 `);
//   return response;
// }

dataQueries.getRelated = function(request) {
  var product = request.params.product_id;
  const response = prods.query(`select * from related where current_product_id = ${product}`);
  console.log('returning')
  return response;
}

dataQueries.getProductStyles = (request) => {
  var product = request.params.product_id;
  // console.log('product,  ', product)
  const response = prods.query (`
    select st.*,
      json_agg(distinct jsonb_build_object('url', pt.url, 'thumbnail_url', pt.thumbnail_url)) as photos,
      json_object_agg(
        sk.id, json_build_object('quantity', quantity, 'size', size)
      ) as skus
    from styles st
    join photos pt  on st.id = pt.styleid
    join skus sk on st.id = sk.styleid
    where st.productid = ${product}
    group by st.id
  `)
  console.log('did a query');

  return response;
}

//create index concurrently on styles (productid);

module.exports = dataQueries
