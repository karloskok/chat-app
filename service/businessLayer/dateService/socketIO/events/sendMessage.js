const { SEND_MESSAGE, RECEIVE_MESSAGE } = require("../../actionTypes/actionTypes");
const SocketIOBaseEvents = require("../SocketBaseEvents");

module.exports = class SendMessageEvent extends SocketIOBaseEvents {

    sendMessageHandler = function (io, socket) {
        return (data) => {
            data.own = false;
            socket.to(this.roomName).emit(RECEIVE_MESSAGE, data);
        }
    };

    events = [
        {
            name: SEND_MESSAGE,
            handler: this.sendMessageHandler,
        }
    ];

    constructor() {
        super();
    };
}
