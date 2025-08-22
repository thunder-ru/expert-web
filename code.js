// Мобильное меню
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Данные проектов — теперь с несколькими фото
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
      "https://i.postimg.cc/Z5xwY0mx/1.jpg",
      "https://i.postimg.cc/907v5PN1/2.jpg",
      "https://i.postimg.cc/vH5p0znZ/3.jpg",
      "https://i.postimg.cc/bwT4hw3X/image.jpg",
      "https://i.postimg.cc/26PKwb8W/5.jpg"
    ],
    caption: "Фитнес-тренер Анна — сайт с видео и программами тренировок"
  }
};

// Глобальные переменные для слайдера
let currentProject = null;
let currentIndex = 0;

// Открытие модального окна
function openModal(key) {
  currentProject = projectData[key];
  if (currentProject) {
    currentIndex = 0;
    updateModal();
    document.getElementById("imageModal").style.display = "flex";
    setTimeout(() => {
      document.querySelector('.modal-content').style.opacity = "1";
    }, 10);
  }
}

// Обновление изображения и подписи
function updateModal() {
  const img = document.getElementById("modalImage");
  img.src = currentProject.images[currentIndex];
  document.getElementById("modalCaption").textContent = 
    `${currentProject.caption} (${currentIndex + 1}/${currentProject.images.length})`;
}

// Следующее изображение
function nextImage() {
  if (currentProject && currentIndex < currentProject.images.length - 1) {
    currentIndex++;
    updateModal();
  }
}

// Предыдущее изображение
function prevImage() {
  if (currentProject && currentIndex > 0) {
    currentIndex--;
    updateModal();
  }
}

// Закрытие модального окна
function closeModal() {
  document.querySelector('.modal-content').style.opacity = "0";
  setTimeout(() => {
    document.getElementById("imageModal").style.display = "none";
  }, 300);
}

// Закрытие по клику вне и Esc
document.getElementById("imageModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("imageModal")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight" && currentProject) nextImage();
  if (e.key === "ArrowLeft" && currentProject) prevImage();
});
