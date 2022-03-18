const fs = require('fs');

module.exports = function LoadSocketEvents() {

    var ioEventsArray = [];
    var events = fs.readdirSync(__dirname + '/events');

    events.forEach(fileName => {
        var event = require(__dirname + '/events/' + fileName);
        ioEventsArray.push(new event());
    });

    var get = function () {
        return ioEventsArray;
    };

    return {
        get: get,
    };
}
