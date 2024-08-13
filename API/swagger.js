// const swaggerAutogen = require('swagger-autogen')();
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', debug: true });


const doc = {
  info: {
    title: 'SpyInvest API',
    description: 'API backend for SpyInvest app'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
// const routes = ['./routes/users.js', './routes/index.js'];
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);