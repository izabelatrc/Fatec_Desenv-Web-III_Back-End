const express = require('express');
const server = express();

//Query params = ?nome=NodeJS
//Route params = /curso/2
//Request body = {nome: 'NodeJS', tipo: 'Backend'}
//http://localhost:3000/curso
/*server.get('/curso/:id', (req, res) => {
    const nome = req.query.nome;
    const id = req.params.id;

    return res.json({curso: `${id}`, nome: `${nome}`});
});*/

const cursos = ['NodeJS', 'JavaScript', 'PHP', 'ReactJS', 'VueJS'];

server.get('/curso/:index', (req, res) => {
    const { index } = req.params;

    return res.json(cursos[index]);
});

server.listen(3000);
