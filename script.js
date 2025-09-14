// Плавное появление элементов при прокрутке

document.addEventListener("DOMContentLoaded", function() {
    // Находим все элементы, которые хотим анимировать
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item');

    // Настройки для Intersection Observer
    const observerOptions = {
        root: null, // отслеживаем относительно вьюпорта
        rootMargin: '0px',
        threshold: 0.1 // элемент считается видимым, если виден хотя бы на 10%
    };

    // Функция, которая будет вызываться, когда элемент появляется или исчезает
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Если элемент появился в области видимости
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Отключаем наблюдение за этим элементом после того, как он появился
                observer.unobserve(entry.target);
            }
        });
    };

    // Создаем и запускаем наблюдатель
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => observer.observe(el));
});

// --- Логика для выпадающего меню языков ---
const langSwitcher = document.querySelector('.lang-switcher');
const langButton = document.querySelector('.lang-button');

if (langButton) {
    langButton.addEventListener('click', (event) => {
        // Предотвращаем "всплытие" события, чтобы клик по кнопке не закрывал меню сразу
        event.stopPropagation(); 
        langSwitcher.classList.toggle('open');
    });
}

// Закрываем меню, если кликнуть в любом другом месте на странице
document.addEventListener('click', () => {
    if (langSwitcher && langSwitcher.classList.contains('open')) {
        langSwitcher.classList.remove('open');
    }
});

// --- Логика для мобильного бургер-меню ---
const burgerButton = document.querySelector('.burger-menu');
// Создаем контейнер для мобильного меню динамически
const mobileNavContainer = document.createElement('div');
mobileNavContainer.classList.add('nav-mobile-container');

// Клонируем навигацию и переключатель языков в мобильный контейнер
const mainNav = document.querySelector('.main-nav');
const langSwitcherDesktop = document.querySelector('.lang-switcher');

if (mainNav) {
    mobileNavContainer.appendChild(mainNav.cloneNode(true));
}
if (langSwitcherDesktop) {
    mobileNavContainer.appendChild(langSwitcherDesktop.cloneNode(true));
}

// Добавляем созданный контейнер в body
document.body.appendChild(mobileNavContainer);

// Логика открытия/закрытия
if (burgerButton) {
    burgerButton.addEventListener('click', () => {
        mobileNavContainer.classList.toggle('open');
        burgerButton.classList.toggle('open');
    });
}

// Логика для выпадающего меню языков ВНУТРИ мобильного меню
const mobileLangSwitcher = mobileNavContainer.querySelector('.lang-switcher');
const mobileLangButton = mobileNavContainer.querySelector('.lang-button');

if (mobileLangButton) {
    mobileLangButton.addEventListener('click', (event) => {
        event.stopPropagation();
        mobileLangSwitcher.classList.toggle('open');
    });
}

// Закрываем мобильное меню при клике на ссылку
mobileNavContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNavContainer.classList.remove('open');
        burgerButton.classList.remove('open');
    });
});