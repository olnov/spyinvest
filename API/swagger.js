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
const routes = ['./app.js'];


swaggerAutogen(outputFile, routes, doc);