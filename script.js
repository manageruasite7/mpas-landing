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

    // --- Логика для меню ---
    const burgerButton = document.querySelector('.burger-menu');
    const navContainer = document.querySelector('.nav-container');
    
    // Создаем контейнер для мобильного меню ОДИН РАЗ
    const mobileNavContainer = document.createElement('div');
    mobileNavContainer.classList.add('mobile-nav-container');
    if (navContainer) {
        mobileNavContainer.innerHTML = navContainer.innerHTML;
        document.body.appendChild(mobileNavContainer);
    }

    // --- Логика для десктопного переключателя языков ---
    const desktopLangSwitcher = document.querySelector('.nav-container .lang-switcher');
    if (desktopLangSwitcher) {
        const desktopLangButton = desktopLangSwitcher.querySelector('.lang-button');
        desktopLangButton.addEventListener('click', (event) => {
            event.stopPropagation();
            desktopLangSwitcher.classList.toggle('open');
        });
    }

    // --- Логика для мобильного меню ---
    if (burgerButton && mobileNavContainer) {
        burgerButton.addEventListener('click', () => {
            mobileNavContainer.classList.toggle('open');
            burgerButton.classList.toggle('open');
        });
    }
    
    const mobileLangSwitcher = mobileNavContainer.querySelector('.lang-switcher');
    if (mobileLangSwitcher) {
        const mobileLangButton = mobileLangSwitcher.querySelector('.lang-button');
        mobileLangButton.addEventListener('click', (event) => {
            event.stopPropagation();
            mobileLangSwitcher.classList.toggle('open');
        });
    }

    // --- Глобальные обработчики кликов ---
    document.addEventListener('click', (event) => {
        // Закрываем десктопный переключатель
        if (desktopLangSwitcher && desktopLangSwitcher.classList.contains('open')) {
            desktopLangSwitcher.classList.remove('open');
        }
        // Закрываем мобильный переключатель
        if (mobileLangSwitcher && mobileLangSwitcher.classList.contains('open')) {
            mobileLangSwitcher.classList.remove('open');
        }
        // Закрываем бургер-меню
        if (mobileNavContainer && mobileNavContainer.classList.contains('open') && !mobileNavContainer.contains(event.target) && !burgerButton.contains(event.target)) {
             mobileNavContainer.classList.remove('open');
             burgerButton.classList.remove('open');
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