const pool = require('../config/database');

const ClienteModel = {
    // Cria a tabela se não existir
    createTable: async () => {
        const query = `
            CREATE TABLE IF NOT EXISTS clientes (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                telefone VARCHAR(20),
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(query);
    },

    create: async (cliente) => {
        const { nome, email, telefone } = cliente;
        const query = 'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *';
        const values = [nome, email, telefone];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    findAll: async () => {
        const query = 'SELECT * FROM clientes ORDER BY id ASC';
        const res = await pool.query(query);
        return res.rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM clientes WHERE id = $1';
        const res = await pool.query(query, [id]);
        return res.rows[0];
    },

    update: async (id, cliente) => {
        const { nome, email, telefone } = cliente;
        const query = 'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *';
        const values = [nome, email, telefone, id];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM clientes WHERE id = $1 RETURNING *';
        const res = await pool.query(query, [id]);
        return res.rows[0];
    }
};

// Auto-cria a tabela ao iniciar o módulo para facilitar
ClienteModel.createTable().catch(err => console.error("Erro ao criar a tabela clientes:", err));

module.exports = ClienteModel;
