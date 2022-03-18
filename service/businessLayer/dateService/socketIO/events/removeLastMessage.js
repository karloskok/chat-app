const { REMOVE_LAST_MESSAGE } = require("../../actionTypes/actionTypes");
const SocketIOBaseEvents = require("../SocketBaseEvents");

module.exports = class RemoveLastMessageEvent extends SocketIOBaseEvents {

    handler = function (io, socket) {
        return async (data) => {
            socket.to(this.roomName).emit(REMOVE_LAST_MESSAGE, data);
        }
    };

    events = [
        {
            name: REMOVE_LAST_MESSAGE,
            handler: this.handler,
        }
    ];

    constructor() {
        super();
    };
}
