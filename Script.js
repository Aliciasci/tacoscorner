function filterMenu(category) {
    console.log('🔍 Filtre appliqué:', category);
    
    // Gérer les boutons actifs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Récupérer toutes les sections
    const sections = document.querySelectorAll('.menu-category');

    if (category === 'all') {
        // Tout afficher
        sections.forEach(section => {
            section.classList.remove('hidden');
            console.log('✅ Visible:', section.getAttribute('data-category'));
        });
    } else {
        // Masquer tout
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        
        // Afficher seulement la catégorie demandée
        sections.forEach(section => {
            if (section.getAttribute('data-category') === category) {
                section.classList.remove('hidden');
                console.log('✅ Affiché:', category);
            }
        });
    }
}

// Au chargement : tout afficher
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Page chargée');
});
