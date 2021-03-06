const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://admin:Admin123@ds223253.mlab.com:23253/note-app', {useNewUrlParser: true},  (err, client) => {
    if(err) return console.log(err)
        db = client.db('note-app')
        app.listen(3000, () => {
            console.log('Listening on 3000');
        })
})


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); // Fortæller express at demme folder er tilgængelig for offentligen, ved brug af built-in middleware "express.static".
app.use(bodyParser.json());  // Ved at benytte os af denne middleware kan serveren nu læse JSON data.

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {quotes: result})
    })
  })

app.post('/quotes', (req, res) => {
    db.collection('quotes').insertOne(req.body, (err, result) => {   // Opretter collection 'quotes' i db hvis den ikke eksiterer, hvis den eksiterer så tilføjer den til collectionen.
        if (err) return console.log(err);''
        console.log('saved to database');
        res.redirect('/'); // Returner brugeren tilbage til / for at undgå konstant loading-phase.
    })
})

app.put('/quotes', (req, res) => {
    db.collection('quotes') 
    .findOneAndUpdate({name: 'Mathias'}, {
      $set: {  // Muligheder for at ÆNDRE indholdet.
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1}, // Viser den seneste entry i databasen.
      upsert: true // I tilfælde af der ikke er oprettet nogen entry, vil der blive oprettet én.
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })

  app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({message: 'Én quote blev slettet'})
    })
  })

console.log('Hello world!');
