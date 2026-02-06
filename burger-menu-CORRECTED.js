// Menu Burger Toggle - Version corrigée pour structure HTML avec bouton devis séparé
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const body = document.body;
    
    if (burgerMenu) {
        // Créer le wrapper du menu mobile
        const mobileMenuWrapper = document.createElement('div');
        mobileMenuWrapper.className = 'mobile-menu-wrapper';
        
        // Cloner les éléments de navigation
        const navLinks = document.querySelector('.nav-links');
        const btnDevis = document.querySelector('nav > .btn-primary');
        
        if (navLinks) {
            const clonedNavLinks = navLinks.cloneNode(true);
            mobileMenuWrapper.appendChild(clonedNavLinks);
        }
        
        if (btnDevis) {
            const clonedBtn = btnDevis.cloneNode(true);
            mobileMenuWrapper.appendChild(clonedBtn);
        }
        
        // Ajouter le wrapper au body
        document.body.appendChild(mobileMenuWrapper);
        
        // Toggle du menu
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            mobileMenuWrapper.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Fermer le menu quand on clique sur un lien
        const links = mobileMenuWrapper.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileMenuWrapper.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(e) {
            if (!burgerMenu.contains(e.target) && !mobileMenuWrapper.contains(e.target)) {
                burgerMenu.classList.remove('active');
                mobileMenuWrapper.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Empêcher la propagation des clics à l'intérieur du menu
        mobileMenuWrapper.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
