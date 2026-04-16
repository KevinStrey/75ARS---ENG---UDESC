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
                // Integração real será: await window.api.post('produtos', '/produtos', { nome, preco });
                console.log('API call Simulada - Produto salvo:', { nome, preco });
                alert('Mock: Produto salvo com sucesso!');
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
        // Integração real será: const produtos = await window.api.get('produtos', '/produtos');
        // Mock temporiário para validar layout:
        const produtos = [
            { id: 1, nome: 'Revista Edição de Colecionador', preco: 120.50 },
            { id: 2, nome: 'Pôster Tipográfico A3', preco: 45.00 },
            { id: 3, nome: 'Assinatura Digital Anual', preco: 89.90 }
        ];
        
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
