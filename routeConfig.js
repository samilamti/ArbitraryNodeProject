module.exports = {
    handle(server, req, res) {
        const fileSystemPath = (req.url || '/').substr(1);
        const publicPath = path.resolve('public', fileSystemPath);
        const controllerPath = path.resolve(fileSystemPath, 'index.js');
        fs.exists(publicPath, pathExists => pathExists?
            mapPublicPath(publicPath, res):
            fs.exists(controllerPath, cpe => cpe?
                mapControllerPath(controllerPath, server, req, res):
                    mapRest(req, res)));
    }
};

const fs = require('fs');
const path = require('path');

function mapPublicPath(filePath, res) {
    fs
        .createReadStream(filePath)
        .pipe(res);
}

function mapControllerPath(controllerPath, server, req, res) {
    var subModule = require(path.resolve(__dirname, controllerPath));
    if (subModule.init) subModule.init(server);
    subModule.handle(req, res);
    return;
}

function mapRest(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    if (req.url === '/src') {
        fs
            .createReadStream(__dirname + '/index.js')
            .pipe(res);
        }
    else {
        res.end('Hello World\n');
    }
}