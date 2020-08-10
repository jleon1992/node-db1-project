const express = require("express");

const AccountsRouter = require('./accounts-router')

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountsRouter)

server.get('/', (req, res) => {
    res.send('sql db up!')
})

server.get('/')
module.exports = server;
