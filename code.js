// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  // Мобильное меню
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Данные проектов
  const projectData = {
    travel: {
      images: [
        "https://images.unsplash.com/photo-1525766034134-8e8f6c8a7d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      ],
      caption: "Тур-агентство «Горизонт» — сайт с анимированными фонами и бронированием туров"
    },
    dentist: {
      images: [
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1598256010104-42b36f197d69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1606811972-d08b035b7c61?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      ],
      caption: "Стоматология «Улыбка+» — современный сайт с 3D-эффектами и онлайн-записью"
    },
    trainer: {
      images: [
        "https://images.unsplash.com/photo-1540497077202-7c8a9b9a0b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1518310391440-153773659315?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
      ],
      caption: "Фитнес-тренер Анна — сайт с видео и программами тренировок"
    }
  };

  // Элементы модального окна
  const modal = document.getElementById("imageModal");
  const galleryInner = document.getElementById("galleryInner");
  const modalCaption = document.getElementById("modalCaption");
  let currentProjectKey = null;
  let currentIndex = 0;

  if (!modal || !galleryInner || !modalCaption) {
    console.error("Модальные элементы не найдены");
    return;
  }

  // Открытие модального окна
  window.openModal = function (key) {
    currentProjectKey = key;
    const project = projectData[key];
    if (!project) {
      console.error("Проект не найден:", key);
      return;
    }

    // Очищаем и заполняем галерею
    galleryInner.innerHTML = '';
    project.images.forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = "Фото проекта";
      galleryInner.appendChild(img);
    });

    currentIndex = 0;
    modalCaption.textContent = `${project.caption} (1/${project.images.length})`;
    modal.style.display = "flex";

    // Анимация появления
    setTimeout(() => {
      modal.querySelector('.modal-content').style.opacity = "1";
    }, 10);

    // Прокручиваем к первому фото
    scrollToCurrent();
  };

  // Прокрутка к текущему изображению
  function scrollToCurrent() {
    const images = galleryInner.querySelectorAll('img');
    if (images[currentIndex]) {
      images[currentIndex].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  // Следующее изображение
  window.nextImage = function () {
    const project = projectData[currentProjectKey];
    if (!project || currentIndex >= project.images.length - 1) return;
    currentIndex++;
    updateCaption();
    scrollToCurrent();
  };

  // Предыдущее изображение
  window.prevImage = function () {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateCaption();
    scrollToCurrent();
  };

  // Обновление подписи
  function updateCaption() {
    const project = projectData[currentProjectKey];
    modalCaption.textContent = `${project.caption} (${currentIndex + 1}/${project.images.length})`;
  }

  // Закрытие модального окна
  window.closeModal = function () {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.opacity = "0";
    }
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  };

  // Закрытие по клику вне
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Управление стрелками
  document.addEventListener("keydown", (e) => {
    if (currentProjectKey) {
      if (e.key === "ArrowDown") nextImage();
      if (e.key === "ArrowUp") prevImage();
    }
    if (e.key === "Escape") closeModal();
  });
});
