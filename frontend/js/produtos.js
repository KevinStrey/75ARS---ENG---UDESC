// js/produtos.js
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    
    const form = document.getElementById('form-produto');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome-produto').value;
            const preco = parseFloat(document.getElementById('preco-produto').value);
            
            try {
                await window.api.post('produtos', '/produtos', { nome, preco, quantidadeEstoque: 0, descricao: '' });
                console.log('API call - Produto salvo:', { nome, preco });
                alert('Produto salvo com sucesso!');
                app.toggleActionPanel('panel-novo-produto');
                form.reset();
                carregarProdutos(); // Recarregar tabela
            } catch(e) {
                alert(`Erro ao salvar produto: ${e.message}`);
            }
        });
    }
});

async function carregarProdutos() {
    const tbody = document.querySelector('#tabela-produtos tbody');
    if(!tbody) return;
    
    try {
        const produtos = await window.api.get('produtos', '/produtos');
        
        tbody.innerHTML = '';
        if(produtos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center font-data">Nenhum produto cadastrado.</td></tr>';
            return;
        }
        
        produtos.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${app.formatCurrency(p.preco)}</td>
                <td class="text-right d-flex justify-between" style="justify-content: flex-end;">
                    <button class="link-action">Editar</button>
                    <button class="link-action">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch(e) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center font-data" style="color:red">Erro ao carregar da API: ${e.message}</td></tr>`;
    }
}
