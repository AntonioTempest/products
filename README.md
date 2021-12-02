# Team Antonio Tempest.
### Table of Contents
1. [General Info](#🌴-General-Info)
2. [Metrics](#✨-Demo)
3. [Technologies](#🧪-Technologies)
4. [Installation](#🚀-Installation)
5. [Contributors](#🤝-Contributors)


### General Info
 * Designed a Node-express server and PostgreSQL database that would handle GET requests from a retail website and provide responses with specifically formatted JSON text.
 * Server handled the routing logic and executed SQL queries from the persistent database containing millions of entries.
 * Server and database were uploaded into Amazon EC2 t2-micro instances.
  * 1 instance running NGINX for load balancing
  * 2 instances running identical images of the node server
  * 1 instance containing the postgresql database
 * Stress testing conducted using Loader.io for server performance.
  * Each query contained a product chosen at random from > one million possibilities
  * Requests were sent at 100rps and 1000rps intervals

### ✨ Server stress test metrics:
 * Loader.io results
  * https://bit.ly/3xQznD3
  * https://bit.ly/3oh6w7O
  * https://bit.ly/3DfuQv7

### 🧪 Technologies
* Amazon Web Services - EC2
* Axios
* Express
* Frisby
* Loader.io
* NGINX
* Node
* Nodemon
* PostgreSQL
* Postman


### 🚀 Installation and Setup
```
$ git clone https://github.com/AntonioTempest/products.git
$ cd products
$ npm install
$ npm start (server)
$ Configure postgresql pool in database/queries.js
  Optional:
$ Configure loaderio token in index.js route handlers (only required for stress testing)

```

### FAQs


### 🤝 Contributor:
- [Patrick Lewis](https://www.linkedin.com/in/patrick-lewis-ms-pmp-34aaa254/)