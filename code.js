// Данные проектов
const projects = {
  travel: {
    title: "Тур-Агентство",
    images: [
      "https://images.unsplash.com/photo-1526098712321-5926067b7804?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1562512344-5d8a18796a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1574848022150-555739878988?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  dentist: {
    title: "Стоматология",
    images: [
      "https://images.unsplash.com/photo-1606265752835-96665d34443e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  trainer: {
    title: "Персональный тренер",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ]
  }
};

// Модальное окно
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalGallery = document.getElementById("modal-gallery");
const closeModal = document.querySelector(".close");

document.querySelectorAll(".project-card").forEach(item => {
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

// Плавное появление при скролле
const animateOnScroll = () => {
  document.querySelectorAll('.project-card, .service-item, .btn-large').forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

document.querySelectorAll('.project-card, .service-item, .btn-large').forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "0.7s cubic-bezier(0.2, 0, 0, 1)";
});

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
