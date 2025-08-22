// Модальное окно для просмотра проектов
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".close");

// Данные проектов
const projects = {
  travel: {
    img: "https://via.placeholder.com/800x600?text=Тур-Агентство+Горизонт",
    caption: "Тур-агентство «Горизонт» — сайт с анимированными фонами и бронированием туров"
  },
  dentist: {
    img: "https://via.placeholder.com/800x600?text=Стоматология+Улыбка+",
    caption: "Стоматология «Улыбка+» — современный сайт с 3D-эффектами и онлайн-записью"
  },
  trainer: {
    img: "https://via.placeholder.com/800x600?text=Фитнес-тренер+Анна",
    caption: "Фитнес-тренер Анна — сайт с видео и программами тренировок"
  }
};

// Открытие модального окна
function openModal(projectKey) {
  const project = projects[projectKey];
  if (project) {
    modalImg.src = project.img;
    modalCaption.textContent = project.caption;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Отключаем скролл
  }
}

// Закрытие модального окна
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = ""; // Возвращаем скролл
}

// Закрытие по клику вне изображения
modal.addEventListener("click", function(e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Закрытие по клавише Esc
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeModal();
  }
});
