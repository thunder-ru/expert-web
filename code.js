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
      "https://images.unsplash.com/photo-1525766034134-8e8f6c8a7d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    ],
    caption: "Тур-агентство «Горизонт» — сайт с анимированными фонами и бронированием туров"
  },
  dentist: {
    images: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1598256010104-42b36f197d69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1606811972-d08b035b7c61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    ],
    caption: "Стоматология «Улыбка+» — современный сайт с 3D-эффектами и онлайн-записью"
  },
  trainer: {
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a9b9a0b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1518310391440-153773659315?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
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
