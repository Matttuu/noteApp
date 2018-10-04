const express = require('express');
const bodyParser = require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
const app = express();

var db;

MongoClient.connect('mongodb://<admin>:<Admin123>@ds223253.mlab.com:23253/note-app', (err, database) => {
    if(err) return console.log(err)
        db = client.db('note-app') 
        app.listen(3000, () => {
            console.log('Listening on 3000');
        })
})

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
    console.log(req.body);
})

console.log('Hello world!');
