const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function() {
    console.log('Listening on 3000');
})
console.log('Hello world!');
