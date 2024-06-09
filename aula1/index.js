const express = require('express');
const mongoose = require('mongoose');
const server = express();

const funcionarioRoutes = require('./routes/funcionarioRoutes');

//middleware
server.use(
    express.urlencoded({
        extended: true,
    }),
);

server.use(express.json());

//Criando o endpoint e rotas da minha API
server.use('/funcionario', funcionarioRoutes);

//Conexão com o MongoDB
const db_user = 'izabelacoimbra';
const db_password = encodeURIComponent('mLkarzclELTAgWi9');

mongoose.connect(
    `mongodb+srv://${db_user}:${db_password}@cluster0.9oyf0xs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((error) => {
        console.log('Erro ao se conectar ao MongoDB', error);
    });


//porta do servidor
server.listen(3000);

/*const cursos = ['NodeJS', 'ReactJS', 'AngularJS'];

//Middleware global
server.use((req, res, next) =>{
    console.log(`URL CHAMADA:  ${req.url}`);

    return next();
});

//Middleware local (especifico para tratar do INSERT de um novo curso)
function checkCurso(req, res, next) {
    if(!req.body.novo_curso) {
        return res.status(400).json({error: 
            'Nome do curso é obrigatório nesse formato {novo_curso: "Nome do curso"}'});
    }
    return next();
};

//Middleware local (especifico para tratar de SELECT de um curso que não existe)
function checkIDCurso(req, res, next) {
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({error: 'O curso não existe no ID solicitado!'});
    }
    return next();
}

//Middleware local (especifico para tratar do UPDATE de um curso)
function checkUpdate(req, res, next) {
    const {curso} = req.body;
    if(!curso){
        return res.status(400).json({error: 'Nome do curso é obrigatório nesse formato {curso: "Nome do curso"}'});
    }
    return next();
}

// Middleware local para tratar de DELETE de um curso que não existe
function checkDeleteIDCurso(req, res, next) {
    const curso = cursos[req.params.index];
    if (!curso) {
        return res.status(400).json({ error: 'O curso não existe no ID solicitado!' });
    }
    return next();
}

// Middleware local para logar a lista de cursos após um novo curso ser inserido
function logCursosAfterInsert(req, res, next) {
    next();
    console.log('Lista de cursos atualizada após inserção:', cursos);
}

// Middleware local para logar a lista de cursos após um curso ser deletado
function logCursosAfterDelete(req, res, next) {
    next();
    console.log('Lista de cursos atualizada após deleção:', cursos);
}

//Criando meu SELECT
server.get('/curso', (req, res) => {
    return res.json(cursos);
});

//Criando meu SELECT por ID
server.get('/curso/:index', checkIDCurso, (req, res) => {
    const { index } = req.params;
    return res.json(cursos[index]);
});

//Criando meu INSERT
server.post('/curso', checkCurso, (req, res) => {
    const { novo_curso } = req.body;
    cursos.push(novo_curso);

    return res.json(cursos);
});

//Criando meu UPDATE de um curso
server.put('/curso/:index', checkIDCurso, checkUpdate, (req, res) => {
    const { index } = req.params;
    const { curso } = req.body;
    cursos[index] = curso;
    return res.json(cursos);
});

//Criando meu DELETE
server.delete('/curso/:index', (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);
    return res.json({message: 'Deletado com sucesso!'});
});*/


