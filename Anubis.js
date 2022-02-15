function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(true);
    }
}


checkElement('.Anubisbutton ') //use whichever selector you want
    .then((element) => {
        var socket = io('ws://localhost:8080');
        var Roomname = document.querySelector(".item--title").innerText;

        socket.emit('Join', Roomname);

        socket.on('message', function(data) {
            const el = document.createElement('li');
            el.innerHTML = data;
            document.querySelector('.AnubisText').appendChild(el);
        });


        document.querySelector(".Anubisbutton").onclick = function SendData() {
            const text = document.querySelector('.Anubisvalue').value;
            socket.emit('Room Message', [Roomname, text])
                //alert(`send message + ${Roomname}`);
        }
    });