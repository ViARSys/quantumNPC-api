
const express = require('express');
const app = express();
//const expressWS = require('express-ws');
//const ews = expressWS(app);

const PORT = process.env.PORT || 8080;

// INITial values for songstress and possibion which can be overwritten in memory and ensures we always have a value
var neos_songstress = {
  "songstress": [
    "golden air mountain",
    "dirty spring lake",
    "tiny orbiting one",
    "snowing face again",
    "clean island universe",
    "goddess transhuman showing"
  ]
}

var neos_possibilon = {
  "possibilon": {
    "architype": "furry",
    "color": "green",
    "really_want": {
      "-.8": "forest castle plants big battle social cozy old creator"
    },
    "comfortable": {
      "-.05": "desert garden pool empty business chill minecraft new no_creator"
    },
    "do_not_care": {
      "0": "space dungeon snow gravity chat event simple morning creator"
    },
    "prefer": {
      ".05": "office mountain sky big educational abandoned vrchat day no_creator"
    },
    "do_not_want": {
      "-1": "club lab sea empty competition social halloween evening creator"
    }
  }
}

// DWAVE will return random lyrics from it's probability score
// we can choose to use the random ones, or 
// take the first one along with the next 4 consequtive lines from that song
var dwave_songstress = {
  "randomized": [
    "alive in Spring",
    "so far away, a solitary Light",
    "easy go easy come",
    "built up on a shaky foundation",
    "the sky goes on forever"
  ],
  "consecutive": [
    "alive in Spring",
    "i have a sturdy stamen",
    "i am burning to know",
    "i grow aware in mid-air",
    "i am showing, opening"
  ]
}

var dwave_possibilon = [
  "unsure what this response will look like yet"
]


app.use(express.json());

/**
 * Root: list endpoints
 * return a list of endpoints
 */
app.get('/', function (req, res) {
  let endpoints = [];

  endpoints.push("** READS **");

  // format here should be [address] - [short desc]. [DATATYPE]
  endpoints.push('/read/neos/songstress - Returns the latest values for songstress from NEOS. JSON');
  endpoints.push('/read/neos/possibilon - Returns the latest values for possibilon from NEOS. JSON');

  endpoints.push('/read/dwave/songstress - Returns the latest values for songstress from DWAVE. JSON');
  endpoints.push('/read/dwave/possibilon - Returns the latest values for possibilon from DWAVE. JSON');

  endpoints.push("** WRITES **");
  // endpoints.push('/put/neos - Records the POST value from Neos. STRING');
  // endpoints.push('/put/quantum - Records the response from the quantum annealer. STRING');

  // endpoints.push('/ws/neos - Communication channel with Neos WebsocketClient');

  let output = endpoints.map(out => out);

  res.send(output);
});

/*******
 * READS
 */

/**
 * Hit this endpoint to get the latest value we've recorded from NEOS for SONGSTRESS
 */
 app.get('/read/neos/songstress', function (req, res) {
  res.send(neos_songstress);
});

/**
 * Hit this endpoint to get the latest value we've recorded from NEOS for POSSIBILON
 */
 app.get('/read/neos/possibilon', function (req, res) {
  res.send(neos_possibilon);
});

/**
 * Hit this endpoint to get the response we have from DWAVE for SONGSTRESS
 */
app.get('/read/dwave/songstress', function (req, res) {
  res.send(dwave_songstress);
});

/**
 * Hit this endpoint to get the response we have from DWAVE for POSSIBILON
 */
 app.get('/read/dwave/possibilon', function (req, res) {
  res.send(dwave_possibilon);
});

/******
 * WRITES
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
