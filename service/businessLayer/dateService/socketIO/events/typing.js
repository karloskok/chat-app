const { TYPING, OTHER_IS_TYPING } = require("../../actionTypes/actionTypes");
const SocketIOBaseEvents = require("../SocketBaseEvents");

module.exports = class TypingEvent extends SocketIOBaseEvents {

    handler = function (io, socket) {
        return async (data) => {
            socket.to(this.roomName).emit(OTHER_IS_TYPING, data);
        }
    };

    events = [
        {
            name: TYPING,
            handler: this.handler,
        }
    ];

    constructor() {
        super();
    };
}
