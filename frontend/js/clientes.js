// js/clientes.js
document.addEventListener('DOMContentLoaded', () => {
    carregarClientes();
    
    const form = document.getElementById('form-cliente');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome-cliente').value;
            const email = document.getElementById('email-cliente').value;
            
            try {
                await window.api.post('clientes', '/clientes', { nome, email });
                console.log('API call - Cliente salvo:', { nome, email });
                alert('Cliente salvo com sucesso!');
                app.toggleActionPanel('panel-novo-cliente');
                form.reset();
                carregarClientes();
            } catch(e) {
                alert(`Erro ao salvar cliente: ${e.message}`);
            }
        });
    }
});

async function carregarClientes() {
    const tbody = document.querySelector('#tabela-clientes tbody');
    if(!tbody) return;
    
    try {
        const clientes = await window.api.get('clientes', '/clientes');
        
        tbody.innerHTML = '';
        if(clientes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center font-data">Nenhum cliente cadastrado.</td></tr>';
            return;
        }
        
        clientes.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${c.id}</td>
                <td>${c.nome}</td>
                <td>${c.email}</td>
                <td class="text-right d-flex justify-between" style="justify-content: flex-end;">
                    <button class="link-action">Editar</button>
                    <button class="link-action">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch(e) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center font-data" style="color:red">Erro ao carregar dados da API: ${e.message}</td></tr>`;
    }
}
