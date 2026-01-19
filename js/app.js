export const App = {
    init() {
        this.router();
        window.addEventListener('hashchange', () => this.router());
        this.updateDate();
    },

    routes: {
        'efficiency': { title: '학급 행정 및 관리', script: 'efficiency.js' },
        'care': { title: '학생 성장 및 상담', script: 'care.js' },
        'connection': { title: '소통 및 커뮤니케이션', script: 'connection.js' },
        'culture': { title: '창의적 학급 세우기', script: 'culture.js' }
    },

    async router() {
        const hash = window.location.hash.slice(1) || 'efficiency';
        const route = this.routes[hash];

        if (!route) {
            window.location.hash = 'efficiency';
            return;
        }

        // Update Title and Navigation State
        document.getElementById('page-title').innerText = route.title;
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.toggle('active', el.getAttribute('href') === `#${hash}`);
        });

        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div class="loading-spinner">Loading...</div>';

        try {
            // Dynamic import of feature module
            const module = await import(`./features/${route.script}`);
            // Render the module content
            if (module && module.render) {
                contentArea.innerHTML = module.render();
                // Initialize any event listeners or logic for the module
                if (module.init) module.init();
                // Re-initialize icons for new content
                if (window.lucide) lucide.createIcons();
            }
        } catch (error) {
            console.error('Failed to load module:', error);
            contentArea.innerHTML = `<div class="card"><h3>Error</h3><p>Could not load the module: ${route.script}</p></div>`;
        }
    },

    updateDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const now = new Date();
        document.getElementById('date-widget').innerText = now.toLocaleDateString('ko-KR', options);
    },

    loadUserProfile() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            const profileName = document.querySelector('.user-profile .name');
            const profileRole = document.querySelector('.user-profile .role');

            if (profileName) profileName.innerText = user.name;
            if (profileRole) profileRole.innerText = user.gradeClass;
        }
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    App.loadUserProfile();
});
