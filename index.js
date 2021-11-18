const express = require('express');
const db = require('./database/queries.js');


const app = express();
app.use(express.json())


const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/products', (req, res) => {
  console.log('wrong thing received')
  return db.getProducts(req)
    .then(results => res.status(200).send(results.rows))
    .catch(err => res.status(500).send(err));
})
// page	integer	Selects the page of results to return. Default 1.
// count	integer	Specifies how many results per page to return. Default 5.

app.get('/products/:product_id', (req, res) => {
  console.log('index.js app.get --', req.params)
  return db.getProductId(req)
    .then(dbResults => {
      var clientResponse = {}
      var features = []
      for (var i = 0; i < dbResults.rows.length; i++) {
        // console.log(dbResults.rows[i].feature)
        // console.log(dbResults.rows[i].value)
        var featureSet = {
          "feature": dbResults.rows[i].feature,
          "value" : dbResults.rows[i].value,
        }
        // console.log('featureset ', featureSet)
         features.push(featureSet)
       };
       console.log('featuresarray' , dbResults.rows[0]['product_id'])
       clientResponse['id'] = dbResults.rows[0]['product_id'];
       clientResponse['name'] = dbResults.rows[0]['name']
       clientResponse['slogan'] = dbResults.rows[0]['slogan'];
       clientResponse['description'] = dbResults.rows[0]['description'];
       clientResponse['category'] = dbResults.rows[0]['category'];
       clientResponse['default_price'] = dbResults.rows[0]['default_price'];
       clientResponse['features'] = features;
       console.log(clientResponse)
      return (clientResponse)
    })
    .then(clientResponse => res.status(200).send(clientResponse))
    .catch(err => res.status(500).send(err));
})


app.get('/products/:product_id/styles')///


app.get('/products/:product_id/related')


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})