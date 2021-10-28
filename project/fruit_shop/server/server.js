const http = require('http');
const fs = require('fs');
const app = express();


const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.write('Welcome to Server!!!');
        res.end();
    }
});

server.on('connection', socket => {
    console.log('Соединение установлено');
})

server.listen('3000');


// const express = require('express');
// const fs = require('fs');
// const app = express();
// // const cart = require('./cartRouter');
//
// app.use(express.json());
// app.use('/', express.static('public'));
// app.use('/api/shopping', cart);
//
//
// app.get('/api/products', (req, res) => {
//     fs.readFile('products.json', 'utf-8', (err, data) => {
//         if(err){
//             res.sendStatus(404, JSON.stringify({result:0, text: err}));
//         } else {
//             res.send(data);
//         }
//     })
// });
//
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listen on port ${port}...`));