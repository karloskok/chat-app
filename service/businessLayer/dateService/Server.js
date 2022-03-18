const http = require('http');
const cors = require('cors');

module.exports = function Server(app) {
    var app = app;
    var server = http.createServer(app);
    var port = process.env.PORT || 8080;
    const buildTime = new Date();

    const globalMiddleware = [
        cors(),
    ];

    var run = function () {
        return server.listen(port, () => {
            console.log(`Server is running on port ${port}. Build-time: ${buildTime}`);
        });
    };

    var initBaseRoute = () => {
        app.get('/', (req, res) => {
            res.send(`K Service - build-time: ${buildTime}`);
        })

    }

    var errorHandler = function () {
        app.use((err, req, res, next) => {
            err.statusCode = err.statusCode || 500;
            err.status = err.status || 'error';

            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        });
    };

    var loadMiddleware = function () {
        globalMiddleware.forEach(element => {
            app.use(element);
        });
    };

    return {
        run,
        initBaseRoute,
        errorHandler,
        loadMiddleware,
        serverInstance: server,
    }
}