// js/pedidos.js
document.addEventListener('DOMContentLoaded', () => {
    carregarPedidos();
    
    const form = document.getElementById('form-pedido');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Processamento do pedido de forma simulada
            alert('Mock: Pedido processado!');
            app.toggleActionPanel('panel-novo-pedido');
            form.reset();
        });
    }
});

async function carregarPedidos() {
    const tbody = document.querySelector('#tabela-pedidos tbody');
    if(!tbody) return;
    
    try {
        // Integração real: const pedidos = await window.api.get('pedidos', '/pedidos');
        const pedidos = [
            { id: 99401, clienteNome: 'João da Silva', total: 120.50, data: '2026-04-15T14:30:00Z' },
            { id: 99402, clienteNome: 'Maria Editora Ltda.', total: 980.00, data: '2026-04-16T10:15:00Z' }
        ];
        
        tbody.innerHTML = '';
        if(pedidos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center font-data">Nenhum pedido efetuado.</td></tr>';
            return;
        }
        
        pedidos.forEach(p => {
             const tr = document.createElement('tr');
             tr.innerHTML = `
                <td>#${p.id}</td>
                <td>${p.clienteNome}</td>
                <td>${app.formatCurrency(p.total)}</td>
                <td>${app.formatDate(p.data)}</td>
             `;
             tbody.appendChild(tr);
        });
    } catch(e) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center font-data" style="color:red">Erro ao carregar: ${e.message}</td></tr>`;
    }
}
