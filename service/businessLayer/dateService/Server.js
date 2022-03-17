const path = require("path");
const http = require('http');
const cors = require('cors');
const { Server: SocketIOServer } = require('socket.io');
const actionTypes = require('./actionTypes/actionTypes');

module.exports = function Server(app) {
    var app = app;
    var server = http.createServer(app);
    var port = process.env.PORT || 8080;
    var io;

    const globalMiddleware = [
        cors(),
    ];

    var run = function () {
        const buildTime = new Date();
        return server.listen(port, () => {
            console.log(`Server is running on port ${port}. Build-time: ${buildTime}`);
        });
    };

    var errorHandler = function () {
        app.use((err, req, res, next) => {
            err.statusCode = err.statusCode || 500;
            err.status = err.status || 'error';

            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        });
    };

    var loadMiddleware = function () {
        globalMiddleware.forEach(element => {
            app.use(element);
        });
    };

    var runSocketIO = function () {
        io = new SocketIOServer(server, {
            cors: {
                origin: 'http://localhost:3000'
            }
        });
    };

    var socketIOEventsInit = function () {
        io.on('connection', (socket) => {
            console.log(`User connected ${socket.id}`);

            socket.on(actionTypes.JOIN_ROOM, (user) => {
                socket.join('TEST_ROOM');
                console.log(`${user} joined`);
            });

            socket.on(actionTypes.SEND_MESSAGE, async (data) => {
                socket.to('TEST_ROOM').emit(actionTypes.RECEIVE_MESSAGE, data);
            });

            socket.on('disconnect', () => {
                console.log(`User disconnected ${socket.id}`);
            });
        });
    };



    return {
        run,
        errorHandler,
        loadMiddleware,
        runSocketIO,
        socketIOEventsInit,
    }
}