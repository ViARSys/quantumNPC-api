
const express = require('express');
const app = express();
//const expressWS = require('express-ws');
//const ews = expressWS(app);

const PORT = process.env.PORT || 8080;

var storedColor = "#000000"

app.use(express.json());

/**
 * Root: list endpoints
 * return a list of endpoints
 */
app.get('/', function (req, res) {
  let endpoints = [];

  // format here should be [address] - [short desc]. [DATATYPE]
  endpoints.push('/put/neos - Records the POST value from Neos. STRING');
  endpoints.push('/put/quantum - Records the response from the quantum annealer. STRING');
  endpoints.push('/read/color - Returns the latest color value recorded. STRING');
  endpoints.push('/read/gpt-3 - Returns the latest response form GPT-3. STRING');
  endpoints.push('/ws/neos - Communication channel with Neos WebsocketClient');

  let output = endpoints.map(out => out);

  res.send(output);
});

/******
 * PUTS
 */


/****** Data format from neos
{
  "aesthetic": {
    "forest_city": 0,
    "dark_light": 0,
    "beach_mountain": 0,
    "large_small": 1,
    "realistic_abstract": 0
  },
  "staff": {
    "many_none": 0
  },
  "experience": {
    "new_old": 0
  },
  "avatar_type": {
    "furry_anime": 1,
    "human_robot": 0
  },
  "population": {
    "furry_anime": 0,
    "human_robot": -1,
    "full_empty": 1
  },
  "emotion": {
    "intensity": -1,
    "peaceful": -0.06188899,
    "loving": -0.06188899,
    "uplifting": -0.06188899,
    "somber": -0.06188899,
    "angry": -1,
    "vengeful": -0.06188899
  }
}
*/

/**
 * Neos hits this endpoint in order to give us the values to record.
 */
app.post('/put/neos', function (req, res) {
  // get the value from the response and parse
  var neos_emotions = req.body.emotions;
  var neos_avatar_type = req.body.avatar_type;
  var neos_population = req.body.population;
  
  // clean the value
  // record the value to the store
  console.log(req.body);
  res.send(req.body);
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

  res.send(storedColor);
});

/**
 * Hit this endpoint to get the response we have from GPT-3
 */
app.get('/read/gpt-3', function (req, res) {
  // retrieve the latest response from GPT-3
  // return the gpt-3 value

});

/************
 * Websockets
*/

/**
 * You can connect a Neos WebsocketClient to this by connecting to "ws://[address]:8080/ws/neos"
 */
/*app.ws("/ws/neos", function(ws, req){
  var hex=/[0-9A-Fa-f]{6}/;
  ws.on('message', function incoming(data) {
    //console.log('Received:'+data)
    try {
      parsed=JSON.parse(data)
      //console.log('JSON:'+parsed)
      if(!parsed.color.startsWith("#"))
        ws.send("Color should start with #!");
      else if (parsed.color.length!=7 || !hex.test(parsed.color.substring(1)))
        ws.send("Color must have 6 hexadecimal characters!");
      else{
        ws.send("Color: "+parsed.color);
        storedColor=parsed.color;
      }
    }catch(err) {
      ws.send("Error parsing JSON");
    }finally{
      hex.lastIndex=0;
    }
  });
});*/

/******************
 * GPT-3 processing
 */



app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
