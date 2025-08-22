// Данные проектов
const projects = {
  travel: {
    title: "Тур-Агентство",
    images: [
      "https://via.placeholder.com/1000x700?text=Тур-Агентство+1",
      "https://via.placeholder.com/1000x700?text=Тур-Агентство+2",
      "https://via.placeholder.com/1000x700?text=Тур-Агентство+3"
    ]
  },
  dentist: {
    title: "Стоматология",
    images: [
      "https://via.placeholder.com/1000x700?text=Стоматология+1",
      "https://via.placeholder.com/1000x700?text=Стоматология+2",
      "https://via.placeholder.com/1000x700?text=Стоматология+3"
    ]
  },
  trainer: {
    title: "Персональный тренер",
    images: [
      "https://via.placeholder.com/1000x700?text=Персональный+тренер+1",
      "https://via.placeholder.com/1000x700?text=Персональный+тренер+2",
      "https://via.placeholder.com/1000x700?text=Персональный+тренер+3"
    ]
  }
};

// Модальное окно
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalGallery = document.getElementById("modal-gallery");
const closeModal = document.querySelector(".close");

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

// Прозрачная шапка при скролле
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
