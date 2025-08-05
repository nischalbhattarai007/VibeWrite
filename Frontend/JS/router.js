class Router {
    constructor() {
        this.routes = {
            '#home': 'pages/home.html',
            '#my-posts': 'pages/my-posts.html',
            '#create-post': 'pages/create-post.html',
            '#followers': 'pages/followers.html',
            '#profile': 'pages/profile.html'
        };
        
        this.init();
    }
    
    init() {
        window.addEventListener('hashchange', () => this.loadContent());
        window.addEventListener('load', () => this.loadContent());
    }
    
    async loadContent() {
        const hash = window.location.hash || '#home';
        const path = this.routes[hash] || this.routes['#home'];
        
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error('Page not found');
            
            const html = await response.text();
            document.getElementById('app-content').innerHTML = html;
            document.getElementById('app-content').classList.add('fade-in');
            
            // Update active link in sidebar
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.classList.remove('bg-purple-50', 'text-purple-600');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('bg-purple-50', 'text-purple-600');
                }
            });
            
            // Update page title
            const pageTitle = this.getPageTitle(hash);
            document.getElementById('page-title').textContent = pageTitle;
            
            // Load any page-specific JS
            this.loadPageScript(hash);
            
            setTimeout(() => {
                document.getElementById('app-content').classList.remove('fade-in');
            }, 300);
            
        } catch (error) {
            console.error('Error loading page:', error);
            document.getElementById('app-content').innerHTML = `
                <div class="text-center py-10">
                    <h2 class="text-2xl font-bold text-gray-700">Page not found</h2>
                    <p class="mt-2 text-gray-500">The requested page could not be loaded.</p>
                    <a href="#home" class="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Go to Home</a>
                </div>
            `;
        }
    }
    
    getPageTitle(hash) {
        const titles = {
            '#home': 'Home Feed',
            '#my-posts': 'My Posts',
            '#create-post': 'Create Post',
            '#followers': 'Followers & Following',
            '#profile': 'Profile Settings'
        };
        return titles[hash] || 'Dashboard';
    }
    
    loadPageScript(hash) {
        // You can add page-specific JS loading here if needed
        if (hash === '#create-post') {
            this.loadRichTextEditor();
        }
    }
    
    loadRichTextEditor() {
        // This would be replaced with actual rich text editor initialization
        console.log('Loading rich text editor...');
    }
}

new Router();