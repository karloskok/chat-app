const { Server } = require('socket.io');
const actionTypes = require('../actionTypes/actionTypes');
const UsersList = require('./data/UsersList');


module.exports = function SocketIO(server) {
    var io;
    var users = UsersList.users;;
    var server = server;
    const buildTime = new Date();



    var run = function () {
        io = new Server(server, {
            cors: {
                origin: 'http://localhost:3000',
            }
        });
        console.log(`SocketIO is running. Build-time: ${buildTime}`);
    };

    var initEvents = (events) => {
        io.on('connection', (socket) => {
            //console.log(`User connected ${socket.id}`);

            for (let i = 0; i < events.length; i++) {
                events[i].setEvents(io, socket);
            }
        });
    };

    return {
        run,
        initEvents,
        ioInstance: io,
    }
}