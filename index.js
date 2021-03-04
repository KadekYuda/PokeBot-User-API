const express = require('express');
const { Pool } = require('pg');
const wakeUp = require('./wakeup');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:silvias15saleens7@localhost:5432/pokebotlogin',
    ssl: { rejectUnauthorized: false }
})

const DUPLICATE_ENTRIES_EXISTS = '23505';

var app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({ hello: 'world!' });
});

app.post('/register', async (req, res) => {
    try {
        var client = await pool.connect();
        var json = req.body;
        const queryResult = await client.query('INSERT INTO username_telegram(username, name) VALUES ($1, $2) RETURNING *', [json.username, json.name]);
        client.release();
        res.json({ 'message': 'Registration finished' });
    } catch (err) {
        if (err.code == DUPLICATE_ENTRIES_EXISTS) {
            res.status(409).send({'message': 'Username already exists'})
        } else {
            console.log(err);
            res.status(400).send({'message': 'Error ecountered!'});
        }
    }
});

app.get('/name', async (req, res) => {
    try {
        var client = await pool.connect();
        var json = req.body;
        const queryResult = await client.query('SELECT name FROM username_telegram WHERE username = $1', [json.username]);
        if (queryResult.rows.length > 0) {
            res.json({ 'message': 'Success!', 'name': queryResult.rows[0].name });
        } else {
            res.status(404).send({'message': 'User not found!'});
        }
        client.release();
    } catch (err) {
        console.log(err);
        res.status(400).send({'message': 'Error ecountered!'});
    }
});


app.listen(PORT, (req, res) => {
    console.log(`Succesfully running in port ${PORT}`);
    wakeUp('https://agile-taiga-31823.herokuapp.com/');
});