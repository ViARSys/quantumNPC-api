const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const agent = new https.Agent({
  rejectUnauthorized: false
});

/**
 * Root: list endpoints
 * return a list of endpoints
 */
app.get('/', function (req, res) {
  let endpoints = [];

  // format here should be [address] - [short desc]. [DATATYPE]
  endpoints.push('/latest - Latests block height. STRING');
  endpoints.push('/meantime - Average block time. STRING');

  let output = endpoints.map(out => out);

  res.send(output);
});

/******
 * PUTS
 */

/**
 * Neos hits this endpoint in order to give us the color value to record.
 */
app.get('/put/color', function (req, res) {
  // clean the color value
  // record the color value to the store

});

/**
 * Chicago Quantum will hit this enpoint in order to give us the value returned from the annealer.
 */
app.get('/put/quantum', function (req, res) {
  // clean the quantum value
  // record the quantum value to the store

});


/*******
 * READS
 */

/**
 * Hit this endpoint to get the latest color value we've recorded.
 */
app.get('/read/color', function (req, res) {
  // retrieve color value from our store
  // return the color value

});

/**
 * Hit this endpoint to get the response we have from GPT-3
 */
app.get('/read/gpt-3', function (req, res) {
  // retrieve the latest response from GPT-3
  // return the gpt-3 value

});

/******************
 * GPT-3 processing
 */



app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
