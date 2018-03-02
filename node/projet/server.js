const database = require('./database.js');
traitementJeu = require('./traitementJeu.js');
sse = require('./sse')

MongoClient = require('mongodb').MongoClient;
test = require('assert');
// Connection url
url = 'mongodb://mongo:27017';
// Database Name
dbName = 'test';

ObjectId = require('mongodb').ObjectID;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(sse)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//database.getJeuById("5a9558a785a5d8019bfdfaa2", afficheJeux);

var connections = []

app.get('/', function(req, res) {
  traitementJeu.buildJeu(6,7);

  database.getJeuPseudo("quentin", afficheJeux);
});


app.post('/jeu/new', function(req, res){
  traitementJeu.buildJeu(6,7);

  database.setPseudos(req.params.id, req.body);

  delete traitementJeu.jeu["_id"]

  database.saveData(traitementJeu.jeu, function(err, result){
    res.json(traitementJeu.jeu);
  });
});

app.get('/jeux/:pseudo', function(req,res){
  let callback = function(err, items){
    res.send(items);
  };

  database.getJeuPseudo(req.params.pseudo, callback);
});

app.get('/jeu/:id', function (req, res) {
  let afficheJeux = function(err, items) {
    //res.send(items);
    res.sseSend(items)

    if(connections[req.params.id] == null)
      connections[req.params.id] = [];

    connections[req.params.id].push(res)
  };

  res.sseSetup()
  database.getJeuById(req.params.id, afficheJeux);
});

app.post('/jeu/:id/jouer', function(req, res){
  let errors = [];

  database.getJeuById(req.params.id, function(err, items) {
    traitementJeu.jeu = items;

    let retourJouer = null;

    let joueurGagnant = null

    if(req.body.idJoueur == traitementJeu.jeu.prochainJoueur){
      retourJouer = traitementJeu.jouer(req.body.colonne, req.body.idJoueur);

      if(retourJouer == "victoire 1")
      {
        traitementJeu.jeu.joueurGagnant = traitementJeu.getJoueurById(1)
        traitementJeu.jeu.etat = "3"
      }
      else if(retourJouer == "victoire 2")
      {
        traitementJeu.jeu.joueurGagnant = traitementJeu.getJoueurById(2)
        traitementJeu.jeu.etat = "3"
      }
      else if(retourJouer != "erreur")
        traitementJeu.changerJoueur();
    }
    else {
      errors.push("Ce n'est pas votre tour");
    }

    database.saveData(traitementJeu.jeu, function(a,b){});

    for(var i = 0; i < connections[req.params.id].length; i++) {
      connections[req.params.id][i].sseSend({"statut": retourJouer, "errors": errors, "jeu": traitementJeu.jeu, "joueurGagnant": traitementJeu.jeu.joueurGagnant})
    }

    res.json({"statut": retourJouer, "errors": errors, "jeu": traitementJeu.jeu, "joueurGagnant": traitementJeu.jeu.joueurGagnant});
  });
});

app.post('/jeu/:id/setPseudos', function (req, res) {

  traitementJeu.jeu['_id'] = ObjectId(req.params.id);

  database.getJeuById(req.params.id, function(err, items) {
    let retour = "";

    traitementJeu.jeu = items;

    database.setPseudos(req.params.id, req.body);

    database.saveData(traitementJeu.jeu, function(a,b){});

    res.json({"statut": "true"});
  });
});

app.get('/chat/:id', function(req,res){
  res.sseSetup()

  if(connections[req.params.id] == null)
    connections[req.params.id] = [];

  connections[req.params.id].push(res)

  database.getChat(req.params.id, function(err, items) {

    if(items == null)
    {
      objectToSave = {
        "_id" : req.params.id,
        "chat" : []
      };

      database.addChat(objectToSave, function(err, retourAdd) {
        res.sseSendChat(retourAdd)
      });
    }
    else {
      res.sseSendChat(items)
    }
  });
});

app.post('/chat/new/:id', function(req,res){
  database.getChat(req.params.id, function(err, items) {

    items['chat'].push({"pseudo" : req.body.pseudo,"message" : req.body.message})

    database.addChat(items, function(err, retourAdd) {
      for(var i = 0; i < connections[req.params.id].length; i++) {
        connections[req.params.id][i].sseSendChat(items)
      }

      res.json(items);
    });
  });

});

app.get('/chat', function(req,res){
  database.getAllChat(req.params.id, function(err, items) {
      res.json(items);
  });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'))
