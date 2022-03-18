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

    var users = [];

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

                const response = {
                    message: `${user} joined room!`,
                    info: true,
                    author: user,
                    time: new Date()
                }
                users.push({
                    id: socket.id,
                    user,
                    typing: false
                });
                socket.to('TEST_ROOM').emit(actionTypes.USER_JOINED_ROOM, response);
                io.to('TEST_ROOM').emit(actionTypes.USER_LIST, users);
            });

            socket.on(actionTypes.SEND_MESSAGE, async (data) => {
                data.own = false;
                socket.to('TEST_ROOM').emit(actionTypes.RECEIVE_MESSAGE, data);
            });

            // socket.on(actionTypes.COUNTDOWN, async (data) => {
            //     data.own = false;
            //     socket.to('TEST_ROOM').emit(actionTypes.COUNTDOWN, data);
            // });

            socket.on(actionTypes.SET_NICKNAME, async (nickname) => {
                let current = users.find(x => x.id == socket.id);
                const response = {
                    message: `${current?.user} changed nickname to ${nickname}!`,
                    info: true,
                    author: nickname,
                    time: new Date()
                }
                users = users.map(x => x.id == socket.id ? { ...x, user: nickname } : x);
                io.to('TEST_ROOM').emit(actionTypes.RECEIVE_MESSAGE, response);
                io.to('TEST_ROOM').emit(actionTypes.USER_LIST, users);
            });

            socket.on(actionTypes.FADE_LAST_MESSAGE, async (data) => {
                socket.to('TEST_ROOM').emit(actionTypes.FADE_LAST_MESSAGE, data);
            });

            socket.on(actionTypes.REMOVE_LAST_MESSAGE, async (data) => {
                socket.to('TEST_ROOM').emit(actionTypes.REMOVE_LAST_MESSAGE, data);
            });

            socket.on(actionTypes.TYPING, async (data) => {
                socket.to('TEST_ROOM').emit(actionTypes.OTHER_IS_TYPING, data);
            });

            socket.on('disconnect', () => {
                const offlineUser = users.find(x => x.id == socket.id);
                users = users.filter(x => x.id !== socket.id);
                if (offlineUser) {
                    const response = {
                        message: `${offlineUser?.user} leave!`,
                        info: true,
                        author: offlineUser?.user,
                        time: new Date()
                    }
                    console.log(`${offlineUser?.user} disconnected ${socket.id}`);
                    //on leave room
                    io.to('TEST_ROOM').emit(actionTypes.USER_LIST, users);
                    socket.to('TEST_ROOM').emit(actionTypes.USER_LEAVE_ROOM, response);
                }
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