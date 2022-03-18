const { USER_LEAVE_ROOM, USER_JOINED_ROOM, USER_LIST } = require("../../actionTypes/actionTypes");
const UsersList = require("../data/UsersList");
const SocketIOBaseEvents = require("../SocketBaseEvents");

module.exports = class LeaveRoomEvent extends SocketIOBaseEvents {

    leaveRoomHandler = function (io, socket) {
        return () => {
            const offlineUser = UsersList.users.find(x => x.id == socket.id);
            UsersList.removeUser(socket.id);
            if (offlineUser) {
                const response = {
                    message: `${offlineUser?.user} leave!`,
                    info: true,
                    author: offlineUser?.user,
                    time: new Date()
                }
                console.log(`${offlineUser?.user} disconnected ${socket.id}`);

                io.to(this.roomName).emit(USER_LIST, UsersList.users);
                socket.to(this.roomName).emit(USER_LEAVE_ROOM, response);
            }
        }
    };

    events = [
        {
            name: 'disconnect',
            handler: this.leaveRoomHandler,
        }
    ];

    constructor() {
        super();
    };
}
