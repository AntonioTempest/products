const express = require('express');
const db = require('./database/queries.js');


const app = express();
app.use(express.json())


const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/products', (req, res) => {
  // console.log('wrong thing received')
  return db.getProducts(req)
    .then(results => res.status(200).send(results.rows))
    .catch(err => res.status(500).send(err));
})
// page	integer	Selects the page of results to return. Default 1.
// count	integer	Specifies how many results per page to return. Default 5.

app.get('/products/:product_id', (req, res) => {
  console.log('index.js app.get product id--', req.params)
  return db.getProductId(req)
    .then(dbResults => {
      var clientResponse = {};
      var features = [];
      for (var i = 0; i < dbResults.rows.length; i++) {
        var featureSet = {
          "feature": dbResults.rows[i].feature,
          "value" : dbResults.rows[i].value,
        }
         features.push(featureSet)
       }
      //  console.log('featuresarray' , dbResults.rows[0]['product_id'])
       clientResponse['id'] = dbResults.rows[0]['product_id'];
       clientResponse['name'] = dbResults.rows[0]['name']
       clientResponse['slogan'] = dbResults.rows[0]['slogan'];
       clientResponse['description'] = dbResults.rows[0]['description'];
       clientResponse['category'] = dbResults.rows[0]['category'];
       clientResponse['default_price'] = dbResults.rows[0]['default_price'];
       clientResponse['features'] = features;
      //  console.log(clientResponse)
      return (clientResponse)
    })
    .then(clientResponse => res.status(200).send(clientResponse))
    .catch(err => res.status(500).send(err));
})


app.get('/products/:product_id/styles', (req, res) => {
  console.log('styloos' , req.params)
  return db.getProductStyles(req)
    .then(dbResponse => {
      let clientResponse = {
        "product_id": dbResponse.rows[0]["productid"].toString(),
        "results": dbResponse.rows
      }
      res.status(200).send(clientResponse)
    })
    .catch(err => res.status(500).send(err));
})

// app.get('/products/:product_id/styles', (req, res) => {
//   console.log('index.js app.get product styles' , req.params)
//   return db.getProductStyles(req)
//     .then(dbResponse => (dbResponse.rows))
//     .then(rows => {
//       var clientResponse = {
//                             "product_id": rows[0]["productid"].toString(),
//                             "results": []
//                           };

//       var photoCatalogue = {} // creates index to use to append the right photos to your client response
//       for (var i = 0; i < rows.length; i++) {
//         if (!photoCatalogue[rows[i]["styleid"]]) {
//           photoCatalogue[rows[i]["styleid"]] = [{"thumbnail_url": rows[i]["thumbnail_url"], "url": rows[i]["url"]}];
//         } else {
//           if (    JSON.stringify([{"thumbnail_url": rows[i]["thumbnail_url"], "url": rows[i]["url"]}])
//            !==
//            JSON.stringify([{"thumbnail_url": rows[i-1]["thumbnail_url"], "url": rows[i-1]["url"]}])
//            )
//             photoCatalogue[rows[i]["styleid"]].push({"thumbnail_url": rows[i]["thumbnail_url"], "url": rows[i]["url"]})
//         }
//       }

//       var skuCatalogue = {}; // sku index
//       for (let i = 0; i < rows.length; i++) {
//         if (!skuCatalogue[rows[i]["styleid"]]) {
//           skuCatalogue[rows[i]["styleid"]] = [{[rows[i]["id"]] : {
//             "quantity": rows[i]["quantity"],
//             "size": rows[i]["size"]
//           }}]
//         } else {
//           // console.log('skulist  ', !skuCatalogue[rows[i]["styleid"]][rows[i]["id"]])
//           if (!skuCatalogue[rows[i]["styleid"]][rows[i]["id"]]) {
//             skuCatalogue[rows[i]["styleid"]].push({[rows[i]["id"]] : {
//               "quantity": rows[i]["quantity"],
//               "size": rows[i]["size"]}
//             })
//           }
//         }
//       }

//       var checkStyleId = []; //the controls whether the id will be recreated

//       for (let i = 0; i < rows.length; i++) {
//         if (checkStyleId.includes(rows[i]['styleid'])) {
//           continue;
//         } else {
//           checkStyleId.push(rows[i]['styleid'])
//           var styleObj = {};
//           // var photos = [];
//           styleObj["style_id"] = rows[i]["styleid"],
//           styleObj["name"] = rows[i]["name"],
//           styleObj["original_price"] = rows[i]["original_price"],
//           styleObj["sale_price"] = rows[i]["sale_price"],
//           styleObj["default?"] = rows[i]["default_style"],
//           styleObj["photos"] = [  photoCatalogue[rows[i]["styleid"]]],
//           styleObj["skus"] =    skuCatalogue[rows[i]["styleid"]],
//           clientResponse["results"].push(styleObj)
//         }
//       }
//       return clientResponse;
//     })
//     .then(messy => { //cleaning extra data you don't want to send--optimize...
//       function isNotNull(value) {
//         return typeof(value) === 'object'
//       }
//       for (var i = 0; i < messy.results.length; i++) {
//         var skus = [];
//         for (var j = 0; j < messy.results[i]["skus"].length; j++) {
//           var stringed = JSON.stringify(messy.results[i]["skus"][j]);
//           if (skus.includes(stringed)) {
//             delete messy.results[i]["skus"][j];
//           } else {
//             skus.push(stringed);
//           }
//         }
//         messy.results[i]["skus"] = messy.results[i]["skus"].filter(isNotNull);
//       }

//       for (let i = 0; i < messy.results.length; i++) {
//         var photos = [];
//         for (let j = 0; j < messy.results[i]["photos"].length; j++) {
//           let stringed = JSON.stringify(messy.results[i]["photos"][j]);
//           if (stringed === messy.results[i]["photos"][j-1]) {
//             delete messy.results[i]["photos"][j];
//           } else {
//             photos.push(stringed);
//           }
//         }
//         messy.results[i]["photos"] = messy.results[i]["photos"].filter(isNotNull)
//       }

//       console.log('cleaning completed');

//       return messy;
//     })
//     .then(cleanedResponse => res.status(200).send(cleanedResponse))
//     .catch(err => res.status(500).send(err))
// })///


app.get('/products/:product_id/related', (req, res) => {
  console.log('index.js app get related')
  return (db.getRelated(req))
    .then(dbAnswer => {
      var relatedProds = [];
      for (var i = 0; i < dbAnswer.rows.length; i++) {
        relatedProds.push(dbAnswer.rows[i]["related_product_id"])
      }
      res.status(200).send(relatedProds)
    })
    .catch(err => res.status(500).send(err))
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})