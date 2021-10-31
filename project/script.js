const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url == '/'){
        res.write('Welcome to Server!!!');
        res.end();
    }
});

server.on('connection', socket =>{
    console.log('Соединение установлено');
})

server.listen('3000');