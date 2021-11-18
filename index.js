const express = require('express');
const db = require('./database/queries.js');


const app = express();
app.use(express.json())


const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/products', (req, res) => {
  return db.getProducts()
    .then(results => res.status(200).send(results.rows))
    .catch(err => console.log('an error: ', err));
})
// page	integer	Selects the page of results to return. Default 1.
// count	integer	Specifies how many results per page to return. Default 5.





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})