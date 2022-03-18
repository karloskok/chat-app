module.exports = class SocketBaseEvents {
    roomName = 'TEST_ROOM';
    events = null;

    setEvents = (io, socket) => {
        for (const event of this.events) {
            socket.on(event.name, event.handler(io, socket));
        }
    };
}
