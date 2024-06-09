const router = require('express').Router();
const Funcionario = require('../models/Funcionario');

//POST (INSERT) Inserindo um novo funcionário no MongoDB
router.post('/', (req, res) => {
    const { nome, cargo, salario, contratado } = req.body;
    if (!nome && !cargo && !salario && !contratado) {
        return res.status(422).json({ error: 'Obrigatório informar o nome, cargo, salario e contratado!' });
    }
    const funcionario = {
        nome,
        cargo,
        salario,
        contratado,    
    }
    try {
        Funcionario.create(funcionario);
        res.status(200).json({message: 'Funcionário cadastrado com sucesso!'});
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET - Listar todos os funcionários cadastrados no MongoDB
router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Buscar um funcionário pelo ID no MongoDB
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const funcionario = await Funcionario.findById(id);
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado!' });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT (UPDATE) - Editar os dados existentes no MongoDB
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedFuncionario = await Funcionario.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado!' });
        }
        res.status(200).json(updatedFuncionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - Deletar os dados existentes no MongoDB
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFuncionario = await Funcionario.findByIdAndDelete(id);
        if (!deletedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado!' });
        }
        res.status(200).json({ message: 'Funcionário deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;