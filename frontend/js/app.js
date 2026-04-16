// js/app.js - Funções utilitárias globais de UI e estado

const app = {
    // Alternar visibilidade de paineis (ex: formulário de novo item)
    toggleActionPanel(panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
            if (panel.style.display === 'none' || !panel.style.display) {
                panel.style.display = 'block';
            } else {
                panel.style.display = 'none';
            }
        }
    },

    // Formatação de Moeda BRL
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    },
    
    // Formatação de Data local
    formatDate(dateStr) {
        if(!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('pt-BR');
    }
};

window.app = app;
