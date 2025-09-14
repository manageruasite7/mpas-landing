document.addEventListener("DOMContentLoaded", function() {
    // --- Анимация при прокрутке ---
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => observer.observe(el));

    // --- Логика для меню (десктоп + мобильная) ---

    // --- Элементы на странице ---
    const burgerButton = document.querySelector('.burger-menu');
    const navContainer = document.querySelector('.nav-container'); // Находим существующий контейнер
    const langSwitcher = document.querySelector('.lang-switcher');

    // --- Логика для бургер-меню ---
    if (burgerButton && navContainer) {
        burgerButton.addEventListener('click', () => {
            navContainer.classList.toggle('open');
            burgerButton.classList.toggle('open');
        });
    }
    
    // --- Логика для выпадающего меню языков (работает и на десктопе, и в мобильной версии) ---
    if (langSwitcher) {
        const langButton = langSwitcher.querySelector('.lang-button');
        langButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Предотвращаем закрытие бургер-меню
            langSwitcher.classList.toggle('open');
        });
    }

    // --- Глобальные обработчики кликов ---
    document.addEventListener('click', (event) => {
        // Закрываем выпадающее меню языков, если клик был вне его
        if (langSwitcher && langSwitcher.classList.contains('open') && !langSwitcher.contains(event.target)) {
            langSwitcher.classList.remove('open');
        }
        
        // Закрываем бургер-меню, если клик был вне его и вне кнопки-бургера
        if (navContainer && navContainer.classList.contains('open') && !navContainer.contains(event.target) && !burgerButton.contains(event.target)) {
             navContainer.classList.remove('open');
             burgerButton.classList.remove('open');
        }
    });

    // Закрываем бургер-меню при клике на любую ссылку внутри него
    if (navContainer) {
        navContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navContainer.classList.contains('open')) {
                    navContainer.classList.remove('open');
                    burgerButton.classList.remove('open');
                }
            });
        });
    }
});