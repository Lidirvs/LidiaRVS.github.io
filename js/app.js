import { projectsData } from './data/projects.js';

class PortfolioInventory {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.modal = document.getElementById('nook-modal');
        this.modalTitle = document.getElementById('nook-modal-title');
        this.modalContent = document.getElementById('nook-modal-content');
        this.closeBtn = document.getElementById('close-nook-modal');
        
        this.bindEvents();
    }

    createSlotComponent(project) {
        return `
            <li class="inventory-slot list-unstyled" style="flex: 1 1 300px;">
                <article class="ac-item-card h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="fs-1 mb-2">${project.icon}</div>
                        <h3 class="h5 fw-bold">${project.title}</h3>
                        <p class="small text-muted fw-bold">${project.tech}</p>
                    </div>
                    <button class="btn-craft mt-3 open-demo-btn" data-url="${project.url}" data-title="${project.title}">
                        Abrir App
                    </button>
                </article>
            </li>
        `;
    }

    render() {
        if (!this.container) return;
        const htmlContent = projectsData.map(proj => this.createSlotComponent(proj)).join('');
        this.container.innerHTML = `<ul class="d-flex flex-wrap gap-4 p-0 m-0">${htmlContent}</ul>`;
        
        // Asignar eventos a los botones recién creados
        document.querySelectorAll('.open-demo-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.openDemo(e.target.dataset.title, e.target.dataset.url));
        });
    }

    openDemo(title, url) {
        this.modalTitle.textContent = title;
        // Inyectamos el iframe solo cuando el usuario lo solicita (Lazy loading manual)
        this.modalContent.innerHTML = `<iframe src="${url}" class="w-100 h-100 border-0" sandbox="allow-scripts allow-same-origin" title="Demo de ${title}"></iframe>`;
        this.modal.showModal();
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => {
            this.modal.close();
            this.modalContent.innerHTML = ''; // Limpiamos el iframe al cerrar para liberar memoria
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inventory = new PortfolioInventory('projects-container');
    inventory.render();
});