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
        "https://i.postimg.cc/8kvBPsBf/1.jpg",
        "https://i.postimg.cc/zG02QPG8/2.jpg",
        "https://i.postimg.cc/xdB5DrDD/3.jpg",
        "https://i.postimg.cc/9FcpjtSM/4.jpg",
        "https://i.postimg.cc/bwBHkXvD/5.jpg",
        "https://i.postimg.cc/MGf0Yscs/6.jpg"
      ],
      caption: "Тур-агентство «Горизонт» — сайт с анимированными фонами и бронированием туров"
    },
    dentist: {
      images: [
        "https://i.postimg.cc/GmFkPfSL/1.jpg",
        "https://i.postimg.cc/5tgJdxjX/2.jpg",
        "https://i.postimg.cc/D0J3XL6G/3.jpg",
        "https://i.postimg.cc/8k9SVXkm/4.jpg",
        "https://i.postimg.cc/zf0s20PW/6.jpg",
        "https://i.postimg.cc/g2dcft4B/7.jpg",
        "https://i.postimg.cc/vm2QxYyp/8.jpg",
        "https://i.postimg.cc/DfX2m3MM/9.jpg"
      ],
      caption: "Стоматология «Улыбка+» — современный сайт с 3D-эффектами и онлайн-записью"
    },
    trainer: {
      images: [
        "https://i.postimg.cc/qvP8vZHV/1.jpg",
        "https://i.postimg.cc/YSQQGft4/2.jpg",
        "https://i.postimg.cc/fLZmxtb8/3.jpg",
        "https://i.postimg.cc/MTDRt6Mq/5.jpg",
        "https://i.postimg.cc/8PsWBV1g/image.jpg"
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

    setTimeout(() => {
      modal.querySelector('.modal-content').style.opacity = "1";
    }, 10);

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

  // Обработчик кликов по карточкам
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function () {
      const key = this.getAttribute('data-project');
      if (key && projectData[key]) {
        openModal(key);
      }
    });
  });

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
