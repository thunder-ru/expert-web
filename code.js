document.addEventListener('DOMContentLoaded', function () {
  // === МОЛНИИ И ГРОМ ===
  const thunderSound = document.getElementById('thunderSound');
  function playThunder() {
    if (thunderSound) {
      thunderSound.currentTime = 0;
      thunderSound.volume = 0.3;
      thunderSound.play().catch(() => {});
    }
  }

  setInterval(() => {
    if (Math.random() < 0.3) {
      playThunder();
    }
  }, 5000);

  // === МОБИЛЬНАЯ НАВИГАЦИЯ ПО ПОРТФОЛИО ===
  const slider = document.getElementById('projectsSlider');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const cardWidth = 320 + 32;

  prevBtn.addEventListener('click', () => {
    slider.scrollLeft -= cardWidth;
  });

  nextBtn.addEventListener('click', () => {
    slider.scrollLeft += cardWidth;
  });

  // === МОБИЛЬНОЕ МЕНЮ ===
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // === ДАННЫЕ ПРОЕКТОВ ===
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

  // === МОДАЛЬНОЕ ОКНО ===
  const modal = document.getElementById("imageModal");
  const galleryInner = document.getElementById("galleryInner");
  const modalCaption = document.getElementById("modalCaption");
  const galleryContainer = document.getElementById("galleryContainer");
  let currentProjectKey = null;
  let currentImageIndex = 0;

  window.openModal = function (key) {
    currentProjectKey = key;
    const project = projectData[key];
    if (!project) return;

    galleryInner.innerHTML = '';
    project.images.forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc.trim();
      img.alt = "Фото проекта";
      galleryInner.appendChild(img);
    });

    currentImageIndex = 0;
    modalCaption.textContent = `${project.caption} (1/${project.images.length})`;
    modal.style.display = "flex";
    document.body.classList.add('modal-open');

    setTimeout(() => {
      modal.querySelector('.modal-content').style.opacity = "1";
    }, 10);

    scrollToCurrent();
  };

  function scrollToCurrent() {
    const images = galleryInner.querySelectorAll('img');
    if (images[currentImageIndex]) {
      images[currentImageIndex].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  window.nextImage = function () {
    const project = projectData[currentProjectKey];
    if (!project || currentImageIndex >= project.images.length - 1) return;
    currentImageIndex++;
    updateCaption();
    scrollToCurrent();
  };

  window.prevImage = function () {
    if (currentImageIndex <= 0) return;
    currentImageIndex--;
    updateCaption();
    scrollToCurrent();
  };

  function updateCaption() {
    const project = projectData[currentProjectKey];
    modalCaption.textContent = `${project.caption} (${currentImageIndex + 1}/${project.images.length})`;
  }

  window.closeModal = function () {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.opacity = "0";
    }
    setTimeout(() => {
      modal.style.display = "none";
      document.body.classList.remove('modal-open');
    }, 300);
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function () {
      const key = this.getAttribute('data-project');
      if (key && projectData[key]) {
        openModal(key);
      }
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (currentProjectKey) {
      if (e.key === "ArrowDown") nextImage();
      if (e.key === "ArrowUp") prevImage();
    }
    if (e.key === "Escape") closeModal();
  });

  let startY = 0;
  galleryContainer.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  galleryContainer.addEventListener('touchend', e => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    if (diff > 50) nextImage();
    if (diff < -50) prevImage();
  }, { passive: true });

  // === СЧЁТЧИКИ ===
  const counters = {
    clients: { el: document.getElementById('clientsCounter'), target: 25 },
    projects: { el: document.getElementById('projectsCounter'), target: 15 },
    conversion: { el: document.getElementById('conversionCounter'), target: 70 },
    speed: { el: document.getElementById('speedCounter'), target: 0.8 }
  };

  Object.keys(counters).forEach(key => {
    const counter = counters[key];
    if (!counter.el) return;

    let count = 0;
    const target = counter.target;
    const duration = 1500;
    const stepTime = duration / (target * 10);

    const timer = setInterval(() => {
      count += target / (target * 10);
      if (key === 'speed') {
        counter.el.textContent = count.toFixed(1);
      } else {
        counter.el.textContent = Math.floor(count);
      }
      if (count >= target) {
        clearInterval(timer);
        if (key === 'speed') {
          counter.el.textContent = target.toFixed(1);
        } else {
          counter.el.textContent = target;
        }
      }
    }, stepTime);
  });

  const projectCounterEl = document.getElementById('projectCounter');
  if (projectCounterEl) {
    let count = 0;
    const target = 15;
    const duration = 1500;
    const stepTime = duration / (target * 10);

    const timer = setInterval(() => {
      count += 1;
      projectCounterEl.textContent = Math.floor(count);
      if (count >= target) {
        clearInterval(timer);
        projectCounterEl.textContent = target;
      }
    }, stepTime);
  }

  // === 3D ПОВОРОТ КАРТОЧЕК ===
  document.querySelectorAll('.mistake-card-t').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (x - centerX) / 10;
      const rotateX = (centerY - y) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // === АНИМАЦИЯ НАВЫКОВ ===
  const skillCards = document.querySelectorAll('.neon-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  skillCards.forEach(card => {
    skillObserver.observe(card);
  });

  // === ПЛАВНОЕ ПОЯВЛЕНИЕ ===
  const fadeElements = document.querySelectorAll('.section-title, .service-card, .project-card, .quotes blockquote, .about-content, .contact p');
  fadeElements.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // === КОПИРОВАНИЕ TELEGRAM ===
  document.getElementById('telegram-link').addEventListener('click', () => {
    navigator.clipboard.writeText('@overgrand').then(() => {
      alert('Никнейм Telegram скопирован! Напишу в течение часа :)');
    });
  });
});
