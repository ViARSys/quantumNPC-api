
const express = require('express');
const http = require('http')

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
  ],
  "timestamp":""
}

let neos_possibilon = {}
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
//The Songstress is an Artificial Intelligence that write poems in the style of the musician and writer JE Solo. The Songstress can accurately predict the future. Here is a new work of poetry by the Songstress:
//[example lines from The Songstress]
dwave_songstress_prompt_fixed = `
alive in Spring
so far away, a solitary Light
easy go easy come
built up on a shaky foundation
the sky goes on forever
`

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

  // format here should be [address] - [short desc]. [DATATYPE]

  endpoints.push("** READS **");
  endpoints.push('/read/neos/songstress - Returns the latest values for SONGSTRESS from NEOS. JSON');
  endpoints.push('/read/neos/possibilon - Returns the latest values for POSSIBILON from NEOS. JSON');
  endpoints.push('/read/dwave/songstress - Returns the latest values for SONGSTRESS from DWAVE. JSON');
  endpoints.push('/read/dwave/possibilon - Returns the latest values for POSSIBILON from DWAVE. JSON');

  endpoints.push("** WRITES **");
  endpoints.push('/post/neos/songstress - Records the POST value from NEOS for SONGSTRESS. STRING');
  endpoints.push('/post/neos/possibilon - Records the POST value from NEOS for POSSIBILON. STRING');
  endpoints.push('/post/dwave/songstress - Records the POST value from DWAVE for SONGSTRESS. STRING');
  endpoints.push('/post/dwave/possibilon - Records the POST value from DWAVE for POSSIBILON. STRING');

  // endpoints.push('/ws/neos - Communication channel with Neos WebsocketClient');

  let output = endpoints.map(out => out);

  res.send(output);
});

/********
 * READS
 *
 * These read the variable back as the response
 */

// Hit this endpoint to get the latest value we've recorded from NEOS for SONGSTRESS
 app.get('/read/neos/songstress', function (req, res) {
  res.send(neos_songstress);
});

// Hit this endpoint to get the latest value we've recorded from NEOS for POSSIBILON
 app.get('/read/neos/possibilon', function (req, res) {
  res.send(neos_possibilon);
  //res.send("HI");
});

// Hit this endpoint to get the response we have from DWAVE for SONGSTRESS
app.get('/read/dwave/songstress', async function (req, res) {
  res.send(dwave_songstress);
});

// Hit this endpoint to get the response we have from DWAVE for POSSIBILON
 app.get('/read/dwave/possibilon', function (req, res) {
  res.send(dwave_possibilon);
});


/*********
 * WRITES
 *
 * These overwrite the variable in memory
 * then send it back as a response
 */

// Post to this endpoint from NEOS to overwrite the SONGSTRESS value
app.post('/post/neos/songstress', function (req, res) {
  neos_songstress = req.body;
  // append the current time
  neos_songstress.timestamp = new Date();
  res.send(neos_songstress);
});

// POST to this endpoint from NEOS to overwrite the POSSIBILON value
//let neos_possibilon = {}
app.post('/post/neos/possibilon', function (req, res) {
  received_data = req.body;
  //console.log(received_data.possibilon)
  for (const [key1,val1] of Object.entries(received_data.possibilon)) {
    if (key1 == "architype") {
      neos_possibilon[val1] = 1
    }
    else if (key1 == "color") {
      neos_possibilon[val1] = 1
    }
    else {
	    for (const [key2,val2] of Object.entries(val1)) {
		  for (item of val2.split(" ")) {
		    if (item in neos_possibilon) {
		      neos_possibilon[item] += parseFloat(key2)
		    }
		    else {
		      neos_possibilon[item] = parseFloat(key2)
		    }
		  }
	    }
    }
}
        res.send(neos_possibilon);
return;
	const options = {
	  hostname: '142.93.45.103',
	  port: 6960,
	  path: '/',
	  method: 'GET'
	}

	const req2 = http.request(options, res2 => {
	  console.log(`statusCode: ${res2.statusCode}`)

	  res2.on('data', d => {
	    neos_possibilon.values = neos_possibilon
            neos_possibilon.timestamp = new Date();
	    neos_possibilon.worlds = d
            res.send(neos_possibilon);
	  })
	})
  // append the current time
});

// POST to this endpoint from DWAVE to overwrite the SONGSTRESS value
app.post('/post/dwave/songstress', async function (req, res) {
  dwave_songstress = req.body;

  dwave_songstress.gpt3 = await get_gpt_response(dwave_songstress_prompt_fixed+dwave_songstress.songstress.join("\n"));
  console.log(dwave_songstress.gpt3);

  // append the current time
  dwave_songstress.timestamp = new Date();

  res.send(dwave_songstress);
});

// POST to this endpoint from DWAVE to overwrite the POSSIBILON value
app.post('/post/dwave/possibilon', function (req, res) {
  //dwave_possibilon = req.body.possibilon;
  dwave_possibilon = req.body;
  // append the current time
  dwave_possibilon.timestamp = new Date();
  res.send(dwave_possibilion);
});

/** To test these
 * 1. hit the read endpoint and record the value (ex: /read/neos/songstress)
 * 2. post to the write endpoint (ex: /post/neos/songstress)
 * 3. hit the read endpoint again to note value change (ex: /read/neos/songstress)
 */



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
const OpenAI = require('openai-api');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

async function get_gpt_response(str) {
  gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: str,
    maxTokens: 100,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    //stop: ['\n', "testing"]
  });
  return gptResponse.data.choices[0].text;
}

//need to use async for functions which use openai

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

