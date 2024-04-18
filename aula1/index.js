const express = require('express');
const server = express();

//http://localhost:3000/curso
server.get('/curso', (req, res) => {
    return res.json({curso: 'Desenvolvimento Web III'});
})

server.listen(3000);
