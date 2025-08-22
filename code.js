// Мобильное меню
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Модальное окно
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");

const projects = {
  travel: {
    img: "https://images.unsplash.com/photo-1525766034134-8e8f6c8a7d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    caption: "Тур-агентство «Горизонт» — сайт с анимированными фонами и бронированием туров"
  },
  dentist: {
    img: "https://i.postimg.cc/hPNcYjvK/image.jpg",
    caption: "Стоматология «Улыбка+» — современный сайт с 3D-эффектами и онлайн-записью"
  },
  trainer: {
    img: "https://images.unsplash.com/photo-1540497077202-7c8a9b9a0b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    caption: "Фитнес-тренер Анна — сайт с видео и программами тренировок"
  }
};

function openModal(key) {
  const project = projects[key];
  if (project) {
    modalImg.src = project.img;
    modalCaption.textContent = project.caption;
    modal.style.display = "flex";
    setTimeout(() => {
      modal.querySelector('.modal-content').style.opacity = "1";
    }, 10);
  }
}

function closeModal() {
  modal.querySelector('.modal-content').style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Закрытие по клику вне
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Закрытие по Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
