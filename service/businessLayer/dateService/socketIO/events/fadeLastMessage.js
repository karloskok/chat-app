const { FADE_LAST_MESSAGE } = require("../../actionTypes/actionTypes");
const SocketIOBaseEvents = require("../SocketBaseEvents");

module.exports = class FadeLastMessageEvent extends SocketIOBaseEvents {

    handler = function (io, socket) {
        return async (data) => {
            socket.to(this.roomName).emit(FADE_LAST_MESSAGE, data);
        }
    };

    events = [
        {
            name: FADE_LAST_MESSAGE,
            handler: this.handler,
        }
    ];

    constructor() {
        super();
    };
}
