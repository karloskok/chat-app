const { SET_NICKNAME, USER_LIST, RECEIVE_MESSAGE } = require("../../actionTypes/actionTypes");
const UsersList = require("../data/UsersList");
const SocketIOBaseEvents = require("../SocketBaseEvents");

module.exports = class SetNicknameEvent extends SocketIOBaseEvents {

    handler = function (io, socket) {
        return async (nickname) => {
            let current = UsersList.users.find(x => x.id == socket.id);
            const response = {
                message: `${current?.user} changed nickname to ${nickname}!`,
                info: true,
                author: nickname,
                time: new Date()
            }
            UsersList.users = UsersList.users.map(x => x.id == socket.id ? { ...x, user: nickname } : x);
            io.to(this.roomName).emit(RECEIVE_MESSAGE, response);
            io.to(this.roomName).emit(USER_LIST, UsersList.users);
        }
    };

    events = [
        {
            name: SET_NICKNAME,
            handler: this.handler,
        }
    ];

    constructor() {
        super();
    };
}
