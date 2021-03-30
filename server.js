const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');

const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
app.set('port',(process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

// require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient; 
const client = new MongoClient(url);
client.connect();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var api = require("./api");
api.setApp( app, client);

app.use((req, res, next) =>
{
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}.');
});

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('frontend/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    });
}