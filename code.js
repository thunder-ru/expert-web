// Данные проектов (галереи)
const projects = {
  travel: {
    title: "Тур-Агентство",
    images: [
      "https://via.placeholder.com/800x600?text=Тур-Агентство+1",
      "https://via.placeholder.com/800x600?text=Тур-Агентство+2",
      "https://via.placeholder.com/800x600?text=Тур-Агентство+3"
    ]
  },
  dentist: {
    title: "Стоматология",
    images: [
      "https://via.placeholder.com/800x600?text=Стоматология+1",
      "https://via.placeholder.com/800x600?text=Стоматология+2",
      "https://via.placeholder.com/800x600?text=Стоматология+3"
    ]
  },
  trainer: {
    title: "Персональный тренер",
    images: [
      "https://via.placeholder.com/800x600?text=Тренер+1",
      "https://via.placeholder.com/800x600?text=Тренер+2",
      "https://via.placeholder.com/800x600?text=Тренер+3"
    ]
  }
};

// Модальное окно
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalGallery = document.getElementById("modal-gallery");
const closeModal = document.querySelector(".close");

// Открытие модального окна
document.querySelectorAll(".portfolio-item").forEach(item => {
  item.addEventListener("click", () => {
    const projectKey = item.dataset.project;
    const project = projects[projectKey];

    modalTitle.textContent = project.title;
    modalGallery.innerHTML = "";

    project.images.forEach(imgSrc => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = project.title;
      modalGallery.appendChild(img);
    });

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

// Закрытие модального окна
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Анимация появления при скролле
const animateOnScroll = () => {
  document.querySelectorAll(".portfolio-item, .service-card").forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

document.querySelectorAll(".portfolio-item, .service-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "0.7s cubic-bezier(0.2, 0, 0, 1)";
});

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
