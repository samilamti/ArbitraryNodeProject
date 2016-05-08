module.exports = {
    init(server) {
        const socketIO = require('socket.io');
        const io = socketIO.listen(server);

        io.sockets.on('connection', function(socket) {
        socket.emit('welcome', 'Welcome to my server!');
        socket.on('submit', function(data) {
            console.log('got some infoz from ' + socket.toString());
            socket.emit('server', `I see ... you're saying "${data}", huh?`);
            io.emit('server', 'Got a message: ' + data);
        });
        
        });
    },
    handle(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`
            <h3> Socket demo </h3>
            <input id='myInput'/>
            <input type='submit' id='clickMe'/>
            <script src='/socket.io/socket.io.js'></script>
            <script>
                window.onload = function() {
                    var socket = io();
                    var input = document.getElementById('myInput');
                    var button = document.getElementById('clickMe');
                    
                    socket.on('welcome', function(data) {
                        console.log('coool! got a nice welcome message: ' + data);
                    });
                    
                    socket.on('server', function(data) {
                        console.log('SERVER: ' + data);
                    });

                    button.onclick = function() {
                        socket.emit('submit', input.value);
                        input.value = '';
                    };
                };
            </script>`);
        }
};

