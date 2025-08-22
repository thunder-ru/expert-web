// Модальное окно
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".close");
const clickSound = document.getElementById("clickSound");

// Данные проектов
const projects = {
  travel: {
    img: "https://images.unsplash.com/photo-1525766034134-8e8f6c8a7d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    caption: "Тур-агентство «Горизонт» — сайт с анимированными фонами и бронированием туров"
  },
  dentist: {
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    caption: "Стоматология «Улыбка+» — современный сайт с 3D-эффектами и онлайн-записью"
  },
  trainer: {
    img: "https://images.unsplash.com/photo-1540497077202-7c8a9b9a0b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
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
    playClickSound();
    setTimeout(() => {
      modal.querySelector('.modal-content').style.opacity = "1";
    }, 10);
  }
}

// Закрытие модального окна
function closeModal() {
  modal.style.display = "none";
  modal.querySelector('.modal-content').style.opacity = "0";
  playClickSound();
}

// Закрытие по клику вне изображения
modal.addEventListener("click", function(e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Закрытие по Esc
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Звук при клике (если хочешь — убери, если не нужен)
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(e => console.log("Звук отключен браузером"));
}

// Добавляем 3D-эффект наведения на карточки (параллакс)
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 10;
    const rotateX = (centerY - y) / 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) translateY(-12px)';
  });
});
