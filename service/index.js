const express = require('express');
const app = express();
const server = require('./businessLayer/dateService/Server')(app);
const socketIO = require('./businessLayer/dateService/socketIO/SocketIO')(server.serverInstance);
const socketEvents = require('./businessLayer/dateService/socketIO/LoadSocketEvents')();

Promise.resolve()
    .then(() => {
        server.loadMiddleware();
        server.errorHandler();
        server.run();
        server.initBaseRoute();
    })
    .then(() => {
        socketIO.run();
        socketIO.initEvents(socketEvents.get());
    });