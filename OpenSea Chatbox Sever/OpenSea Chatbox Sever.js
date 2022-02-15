const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    socket.on('Join', function(room) {
        socket.join(room);
        console.log(`the romm is ${room}`);
    });

    socket.on('leave', function(room) {
        socket.leave(room);
    });

    console.log('a user connected');

    socket.on('Room Message', (message) => {
        //console.log(message);
        io.to(message[0]).emit('message', message[1]);
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));