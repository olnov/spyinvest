// const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0', debug: true });


const doc = {
  info: {
    title: 'SpyInvest API',
    description: 'API backend for SpyInvest app'
  },
  host: process.env.SWAGGER_BE
};



const outputFile = './swagger-output.json';
const routes = ['./app.js'];


swaggerAutogen(outputFile, routes, doc);