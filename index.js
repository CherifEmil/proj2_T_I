var bodyParser = require("body-parser"),
    express = require("express"),
    fs = require("fs"),
    app = express();

var letters = {},
    lettersFileName = "./letters.json";
var peers = {},
    peersFileName = "./peers.json";

try {
  letters = JSON.parse(fs.readFileSync(lettersFileName));
  peers =JSON.parse(fs.readFileSync(peersFileName));
} catch {};

app.use( express.static("public") );

app.get("/getLetters", (req,res) => res.json( Object.values( letters ) ));
app.get("/peers", (req,res) => res.json( Object.values( peers ) ));

app.post("/addLetter", bodyParser.text(), (req,res) => {
  letters[req.body] = req.body;
  res.end();
  fs.writeFile(lettersFileName, JSON.stringify(letters, 2, " "), err => 
    { if (err) console.error(err); });
} );

app.post("/addLetter", bodyParser.text(), (req,res) => {
  letters[req.body] = req.body;
  res.end();
  fs.writeFile(lettersFileName, JSON.stringify(letters, 2, " "), err => 
    { if (err) console.error(err); });
} );

app.post( "/postpeers", bodyParser.text(), (req,res) => {
  peers[req.body] = req.body;
  res.end();
  fs.writeFile(peersFileName, JSON.stringify(peers,2," "), err => 
    { if (err) console.error(err); });
} );
app.listen(3340);
