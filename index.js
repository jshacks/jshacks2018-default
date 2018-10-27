require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebHook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', verificationController);
app.post('/', messageWebhookController);

app.listen(3000, () => console.log('Mere'));
