const express = require('express');
const app = express();
const server = require('./businessLayer/dateService/Server')(app);

Promise.resolve()
    .then(() => {
        server.loadMiddleware();
        server.errorHandler();
        server.run();
        server.runSocketIO();
        server.socketIOEventsInit();
    });