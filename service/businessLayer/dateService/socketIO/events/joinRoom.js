const { JOIN_ROOM, USER_JOINED_ROOM, USER_LIST } = require("../../actionTypes/actionTypes");
const UsersList = require("../data/UsersList");
const SocketIOBaseEvents = require("../SocketBaseEvents");

module.exports = class JoinRoomEvent extends SocketIOBaseEvents {

    joinRoomHandler = function (io, socket) {
        return (username) => {
            console.log(`${username} joined`);
            socket.join(this.roomName);

            const response = {
                message: `${username} joined room!`,
                info: true,
                author: username,
                time: new Date()
            }

            UsersList.addUser({
                id: socket.id,
                user: username,
                typing: false,
            });


            socket.to(this.roomName).emit(USER_JOINED_ROOM, response);
            io.to(this.roomName).emit(USER_LIST, UsersList.users);
        }
    };

    events = [
        {
            name: JOIN_ROOM,
            handler: this.joinRoomHandler,
        }
    ];

    constructor() {
        super();
    };
}
