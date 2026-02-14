// ================================================
// GESTION DES FILTRES PAR CATÉGORIE (TACOS, BURGERS, ETC.)
// ================================================

const filterButtons = document.querySelectorAll('.filter-btn');
const menuCategories = document.querySelectorAll('.menu-category');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('🔍 Filtre appliqué:', button.dataset.filter);
        
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        // Récupérer la catégorie à filtrer
        const filterValue = button.dataset.filter;
        
        // Afficher/masquer les catégories
        menuCategories.forEach(category => {
            if (filterValue === 'all') {
                category.classList.add('active');
                category.classList.remove('hidden');
                console.log('✅ Visible:', category.getAttribute('data-category'));
            } else if (category.dataset.category === filterValue) {
                category.classList.add('active');
                category.classList.remove('hidden');
                console.log('✅ Affiché:', filterValue);
            } else {
                category.classList.remove('active');
                category.classList.add('hidden');
            }
        });
        
        // Réappliquer les filtres alimentaires si actifs
        if (activeDietFilters.length > 0) {
            filterMenuByDiet();
        }
        
        // Scroll smooth vers le haut du contenu
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ================================================
// GESTION DES FILTRES ALIMENTAIRES (VÉGÉTARIEN, SANS LACTOSE)
// ================================================

const dietFilters = document.querySelectorAll('.diet-filter-btn');
const activeFiltersBadge = document.querySelector('.active-filters-badge');
const badgeCount = document.querySelector('.badge-count');
const clearFiltersBtn = document.querySelector('.clear-filters-btn');

let activeDietFilters = [];

// Clic sur un filtre alimentaire
dietFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        const diet = btn.dataset.diet;
        console.log('🍽️ Filtre alimentaire:', diet);
        
        // Toggle active
        btn.classList.toggle('active');
        
        // Ajouter ou retirer du tableau
        if (btn.classList.contains('active')) {
            activeDietFilters.push(diet);
            console.log('➕ Ajouté:', diet);
        } else {
            activeDietFilters = activeDietFilters.filter(d => d !== diet);
            console.log('➖ Retiré:', diet);
        }
        
        console.log('📋 Filtres actifs:', activeDietFilters);
        
        // Mettre à jour l'affichage
        updateFilterBadge();
        filterMenuByDiet();
    });
});

// Bouton effacer tous les filtres alimentaires
clearFiltersBtn.addEventListener('click', () => {
    console.log('🗑️ Effacer tous les filtres alimentaires');
    
    // Retirer tous les filtres actifs
    dietFilters.forEach(btn => btn.classList.remove('active'));
    activeDietFilters = [];
    
    // Mettre à jour l'affichage
    updateFilterBadge();
    filterMenuByDiet();
});

// Mettre à jour le badge de compteur
function updateFilterBadge() {
    if (activeDietFilters.length > 0) {
        activeFiltersBadge.style.display = 'flex';
        badgeCount.textContent = activeDietFilters.length;
        console.log('🏷️ Badge affiché:', activeDietFilters.length, 'filtre(s)');
    } else {
        activeFiltersBadge.style.display = 'none';
        console.log('🏷️ Badge masqué');
    }
}

// Filtrer les plats selon les régimes sélectionnés
function filterMenuByDiet() {
    // Récupérer uniquement les cartes des sections visibles
    const visibleSections = document.querySelectorAll('.menu-category.active, .menu-category:not(.hidden)');
    const allCards = document.querySelectorAll('.menu-card');
    
    console.log('🔎 Filtrage des plats...');
    
    if (activeDietFilters.length === 0) {
        // Afficher toutes les cartes des sections visibles
        allCards.forEach(card => {
            const parentSection = card.closest('.menu-category');
            if (parentSection && (parentSection.classList.contains('active') || !parentSection.classList.contains('hidden'))) {
                card.style.display = 'block';
            }
        });
        console.log('✅ Tous les plats affichés');
        return;
    }
    
    // Filtrer les cartes
    let visibleCount = 0;
    allCards.forEach(card => {
        const parentSection = card.closest('.menu-category');
        
        // Ne traiter que les cartes des sections visibles
        if (!parentSection || (!parentSection.classList.contains('active') && parentSection.classList.contains('hidden'))) {
            card.style.display = 'none';
            return;
        }
        
        const cardDiets = card.dataset.diets ? card.dataset.diets.split(',').map(d => d.trim()) : [];
        const matches = activeDietFilters.every(diet => cardDiets.includes(diet));
        
        if (matches) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
            visibleCount++;
            console.log('✅ Plat visible:', card.querySelector('h3').textContent);
        } else {
            card.style.display = 'none';
            console.log('❌ Plat masqué:', card.querySelector('h3').textContent);
        }
    });
    
    console.log('📊 Résultat:', visibleCount, 'plat(s) affiché(s)');
}

// ================================================
// ANIMATION FADE IN
// ================================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hidden {
        display: none !important;
    }
`;
document.head.appendChild(style);

// ================================================
// AU CHARGEMENT DE LA PAGE
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Page chargée');
    console.log('📦 Sections trouvées:', menuCategories.length);
    console.log('🔘 Boutons de filtre trouvés:', filterButtons.length);
    console.log('🍽️ Boutons alimentaires trouvés:', dietFilters.length);
    
    // Afficher toutes les sections par défaut
    menuCategories.forEach(section => {
        section.classList.add('active');
        section.classList.remove('hidden');
    });
});
