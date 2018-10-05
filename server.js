const express = require('express');
const bodyParser = require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
const app = express();


var db

MongoClient.connect('mongodb://admin:Admin123@ds223253.mlab.com:23253/note-app', {useNewUrlParser: true},  (err, client) => {
    
    
    if(err) return console.log(err)
    
        db = client.db('note-app')
        app.listen(3000, () => {
            
            console.log('Listening on 3000')
        })
})

app.use(bodyParser.urlencoded({extended: true}));

//app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
//})

app.get('/', (req, res) => {
    var cursor = db.collection('quotes').find();
    db.collection('quotes').find().toArray(function(err, results) {
        console.log(results)   
      })
    
})

app.set('view engine', 'ejs');

app.post('/quotes', (req, res) => {
    db.collection('quotes').insertOne(req.body, (err, result) => {   // Opretter collection 'quotes' i db hvis den ikke eksiterer, hvis den eksiterer så tilføjer den til collectionen.
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/'); // Returner brugeren tilbage til / for at undgå konstant loading-phase.
    })
})

console.log('Hello world!');
