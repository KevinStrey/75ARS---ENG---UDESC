const ClienteModel = require('../models/clienteModel');

const clientesController = {
    createCliente: async (req, res) => {
        try {
            const { nome, email, telefone } = req.body;
            if (!nome || !email) {
                return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
            }
            const novoCliente = await ClienteModel.create({ nome, email, telefone });
            res.status(201).json(novoCliente);
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            res.status(500).json({ error: 'Erro interno ao criar o cliente.' });
        }
    },

    getClientes: async (req, res) => {
        try {
            const clientes = await ClienteModel.findAll();
            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            res.status(500).json({ error: 'Erro interno ao buscar clientes.' });
        }
    },

    getClienteById: async (req, res) => {
        try {
            const { id } = req.params;
            const cliente = await ClienteModel.findById(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }
            res.status(200).json(cliente);
        } catch (error) {
            console.error('Erro ao buscar o cliente:', error);
            res.status(500).json({ error: 'Erro interno ao buscar o cliente.' });
        }
    },

    updateCliente: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, email, telefone } = req.body;
            const clienteAtualizado = await ClienteModel.update(id, { nome, email, telefone });
            
            if (!clienteAtualizado) {
                return res.status(404).json({ error: 'Cliente não encontrado para atualização.' });
            }
            res.status(200).json(clienteAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ error: 'Erro interno ao atualizar o cliente.' });
        }
    },

    deleteCliente: async (req, res) => {
        try {
            const { id } = req.params;
            const clienteDeletado = await ClienteModel.delete(id);
            
            if (!clienteDeletado) {
                return res.status(404).json({ error: 'Cliente não encontrado para deleção.' });
            }
            res.status(200).json({ message: 'Cliente deletado com sucesso.', cliente: clienteDeletado });
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            res.status(500).json({ error: 'Erro interno ao deletar o cliente.' });
        }
    }
};

module.exports = clientesController;
