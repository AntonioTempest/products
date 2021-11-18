const { Pool, Client } = require('pg')


const prods = new Pool({
  user: "postgres",
  database: "proddb",
  port: 5432
})



const dataQueries = {}

dataQueries.getProducts = function() {
  const response = prods.query('select * from product limit 5')
  return response;
}



module.exports = dataQueries