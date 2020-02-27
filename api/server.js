const express = require("express");

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const restricted = require("../auth/restricted-middleware")

const server = express();

server.use(express.json());

server.use('/api/auth', authRouter)
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
    res.send("It's alive!")
})

module.exports = server;