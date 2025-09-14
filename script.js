document.addEventListener("DOMContentLoaded", function() {
    // --- Анимация при прокрутке (без изменений) ---
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

    // --- НОВАЯ, ИСПРАВЛЕННАЯ ЛОГИКА ДЛЯ МЕНЮ ---

    const burgerButton = document.querySelector('.burger-menu');
    
    // Создаем контейнер для мобильного меню динамически
    const mobileNavContainer = document.createElement('div');
    mobileNavContainer.classList.add('nav-mobile-container');
    document.body.appendChild(mobileNavContainer);

    // Находим оригинальные элементы на странице
    const mainNav = document.querySelector('.main-nav');
    const langSwitcher = document.querySelector('.lang-switcher');

    // Клонируем их в мобильный контейнер
    if (mainNav) {
        mobileNavContainer.appendChild(mainNav.cloneNode(true));
    }
    if (langSwitcher) {
        mobileNavContainer.appendChild(langSwitcher.cloneNode(true));
    }

    // Логика открытия/закрытия бургер-меню
    if (burgerButton) {
        burgerButton.addEventListener('click', () => {
            mobileNavContainer.classList.toggle('open');
            burgerButton.classList.toggle('open');
        });
    }

    // Логика для выпадающего меню языков ВНУТРИ мобильного меню
    const mobileLangSwitcher = mobileNavContainer.querySelector('.lang-switcher');
    if (mobileLangSwitcher) {
        const mobileLangButton = mobileLangSwitcher.querySelector('.lang-button');
        mobileLangButton.addEventListener('click', (event) => {
            event.stopPropagation();
            mobileLangSwitcher.classList.toggle('open');
        });
    }
    
    // Логика для выпадающего меню языков на ДЕСКТОПЕ
    if (langSwitcher) {
        const desktopLangButton = langSwitcher.querySelector('.lang-button');
        desktopLangButton.addEventListener('click', (event) => {
            event.stopPropagation();
            langSwitcher.classList.toggle('open');
        });
    }

    // Закрываем ОБА выпадающих меню при клике вне их
    document.addEventListener('click', () => {
        if (langSwitcher && langSwitcher.classList.contains('open')) {
            langSwitcher.classList.remove('open');
        }
        if (mobileLangSwitcher && mobileLangSwitcher.classList.contains('open')) {
            mobileLangSwitcher.classList.remove('open');
        }
    });

    // Закрываем бургер-меню при клике на любую ссылку внутри него
    mobileNavContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavContainer.classList.contains('open')) {
                mobileNavContainer.classList.remove('open');
                burgerButton.classList.remove('open');
            }
        });
    });
});