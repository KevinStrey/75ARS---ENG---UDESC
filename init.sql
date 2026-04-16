-- Criação dos Schemas para manter o isolamento lógico exigido por microsserviços
CREATE SCHEMA IF NOT EXISTS clientes;
CREATE SCHEMA IF NOT EXISTS produtos;
CREATE SCHEMA IF NOT EXISTS pedidos;

-- ==========================================
-- SCHEMA: clientes (Consumido pelo serviço Node.js)
-- ==========================================
CREATE TABLE clientes.cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- SCHEMA: produtos (Consumido pelo serviço Spring Boot 1)
-- ==========================================
CREATE TABLE produtos.produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_estoque INTEGER NOT NULL DEFAULT 0,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- SCHEMA: pedidos (Consumido pelo serviço Spring Boot 2)
-- ==========================================
CREATE TABLE pedidos.pedido (
    id SERIAL PRIMARY KEY,
    -- Referência lógica ao Cliente (Soft Reference). Não usamos FK cruzando schemas em microsserviços.
    cliente_id INTEGER NOT NULL, 
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    valor_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos.item_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos.pedido(id) ON DELETE CASCADE,
    -- Referência lógica ao Produto (Soft Reference).
    produto_id INTEGER NOT NULL, 
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL
);