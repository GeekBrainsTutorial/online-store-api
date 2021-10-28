const express = require('express');
const app = express();

app.listen(3000, ()=>{
    console.log('Связь с сервером установлена!')
})

app.get('/', (req, res)=>{
    res.send('Ответ от сервера....................');
})