import { projectsData } from './data/projects.js';

class PortfolioInventory {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    // Extracción de componente lógico. Retorna un String HTML interpolado.
    createSlotComponent(project) {
        return `
            <li class="inventory-slot">
                <article class="ac-item-card" data-demo-type="${project.demoType}" data-repo-url="${project.url}">
                    <div class="ac-item-icon-wrapper">
                        <span class="fs-1" aria-hidden="true">${project.icon}</span>
                    </div>
                    <div class="ac-item-details">
                        <h3 class="ac-item-name h6 fw-bold mb-1">${project.title}</h3>
                        <p class="ac-item-tech small text-muted mb-0">${project.tech}</p>
                    </div>
                    <button class="btn-craft ac-btn-action" aria-haspopup="dialog" aria-expanded="false">
                        Equipar Demo
                    </button>
                </article>
            </li>
        `;
    }

    render() {
        if (!this.container) return;
        
        // Optimización de rendimiento: Construimos el string completo antes de inyectar al DOM (evita reflujos iterativos)
        const htmlContent = projectsData.map(proj => this.createSlotComponent(proj)).join('');
        
        this.container.innerHTML = `
            <ul class="inventory-grid list-unstyled d-flex flex-wrap gap-3" aria-label="Inventario de Proyectos">
                ${htmlContent}
            </ul>
        `;
    }
}

// Inicialización asíncrona segura
document.addEventListener('DOMContentLoaded', () => {
    const inventory = new PortfolioInventory('projects-container');
    inventory.render();
});