const express = require('express');
const cors = require('cors');
const userRutas = require('./routes/router');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.listen(3000, console.log("Server Iniciado"));

app.use('/', userRutas);