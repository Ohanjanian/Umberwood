document.addEventListener('DOMContentLoaded', () => {
    // Бургер-меню
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    if (!burger || !nav) {
        console.error('Burger or nav element not found');
        return;
    }

    burger.addEventListener('click', () => {
        console.log('Burger clicked'); // Для отладки
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Модальное окно для галереи
    const modal = document.querySelector('#projectModal');
    const modalImg = document.querySelector('.modal-img');
    const modalTitle = document.querySelector('.modal-title');
    const modalDesc = document.querySelector('.modal-desc');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!modal || !modalImg || !modalTitle || !modalDesc || !modalClose || !modalPrev || !modalNext) {
        console.error('Modal elements not found');
        return;
    }

    let currentImages = [];
    let currentIndex = 0;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const images = JSON.parse(item.getAttribute('data-images'));

            currentImages = images;
            currentIndex = 0;

            modalImg.src = images[currentIndex];
            modalTitle.textContent = title;
            modalDesc.textContent = desc;

            modal.style.display = 'flex'; // Показываем модальное окно
        });
    });

    modalPrev.addEventListener('click', () => {
        if (currentImages.length > 1) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            modalImg.style.opacity = '0'; // Плавное затухание
            setTimeout(() => {
                modalImg.src = currentImages[currentIndex];
                modalImg.style.opacity = '1'; // Плавное появление
            }, 300);
        }
    });

    modalNext.addEventListener('click', () => {
        if (currentImages.length > 1) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            modalImg.style.opacity = '0'; // Плавное затухание
            setTimeout(() => {
                modalImg.src = currentImages[currentIndex];
                modalImg.style.opacity = '1'; // Плавное появление
            }, 300);
        }
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none'; // Закрываем модальное окно
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'; // Закрываем при клике на фон
        }
    });
});