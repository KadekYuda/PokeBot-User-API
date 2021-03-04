const express = require('express');

var app = express();

const PORT = process.env.PORT || 5000


app.get('/', (req, res) =>{
    res.json({ hello: 'world!' });
});


app.listen(PORT, (req, res) => {
    console.log(`Succesfully running in port ${PORT}`);
});