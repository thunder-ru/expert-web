document.addEventListener('DOMContentLoaded', function () {
  const thunderSound = document.getElementById('thunderSound');
  const navbar = document.querySelector('.navbar');
  const cursorGlow = document.querySelector('.cursor-glow');
  const secretOffer = document.getElementById('secretOffer');
  // === Меню при скролле ===
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // === Плавное появление блоков при скролле ===
    document.querySelectorAll('.about-content, .service-card, .project-card, .quotes blockquote').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8 && !el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    });
  });
  // === Молнии и гром ===
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
  // === Луч молнии за курсором ===
  document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    }
  });
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
  });
  // === СЕКРЕТНОЕ ПРЕДЛОЖЕНИЕ ПРИ НАВЕДЕНИИ НА @overgrand ===
  document.getElementById('telegram-link')?.addEventListener('mouseenter', () => {
    if (secretOffer) {
      secretOffer.classList.add('show');
      setTimeout(() => {
        secretOffer.classList.remove('show');
      }, 4000);
    }
  });
  // === УНИВЕРСАЛЬНАЯ НАВИГАЦИЯ ПО ПОРТФОЛИО (ПК + МОБИЛЬНЫЕ) ===
  const slider = document.getElementById('projectsSlider');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  function getCardWidth() {
    if (slider && slider.children.length > 0) {
      const firstCard = slider.children[0];
      const style = window.getComputedStyle(firstCard);
      return firstCard.offsetWidth + parseInt(style.marginRight) + parseInt(style.marginLeft) || 352;
    }
    return 352; // fallback
  }
  if (prevBtn && nextBtn && slider) {
    prevBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      slider.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    });
    nextBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      slider.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    });
  }
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
    },
    // === НОВЫЕ ПРОЕКТЫ ===
    beauty: {
      images: [
        "https://i.postimg.cc/QdBJN5Yj/1.png",
        "https://i.postimg.cc/4Njh50wT/2.png",
        "https://i.postimg.cc/1zQVxNLC/3.png",
        "https://i.postimg.cc/DZfW03f1/4.png",
        "https://i.postimg.cc/9QGzBQrG/5.png",
        "https://i.postimg.cc/TPf1NvDB/6.png"
      ],
      caption: "Салон красоты «Aura Beauty» — сайт с онлайн-записью и каталогом услуг"
    },
    camp: {
      images: [
        "https://i.postimg.cc/pdCTgcQr/1.png",
        "https://i.postimg.cc/yxg83VM3/2.png",
        "https://i.postimg.cc/cCp4QpW9/3.png",
        "https://i.postimg.cc/y8z8WCvW/4.png",
        "https://i.postimg.cc/sg9DhHNm/5.png",
        "https://i.postimg.cc/Ss5yhBnS/6.png",
        "https://i.postimg.cc/Wb0J5nyF/7.png",
        "https://i.postimg.cc/qvL6T74p/8.png",
        "https://i.postimg.cc/QtRHb9kJ/9.png"
      ],
      caption: "Детский лагерь «HappyKids» — яркий сайт с формой бронирования смен"
    },
    webinar: {
      images: [
        "https://i.postimg.cc/FH91DQc8/image.png"
      ],
      caption: "Визитка для вебинара «Онлайн-профессии» — лендинг с формой регистрации"
    },
    furniture: {
      images: [
        "https://i.postimg.cc/Y9xsNYwJ/1.png",
        "https://i.postimg.cc/Kjqpwbjf/2.png",
        "https://i.postimg.cc/v83Kcrhn/3.png",
        "https://i.postimg.cc/kXGp82Yp/4.png",
        "https://i.postimg.cc/g26tSfWy/5.png",
        "https://i.postimg.cc/fbc2ZmkJ/6.png"
      ],
      caption: "Интернет-магазин мебели «Havel» — каталог с фильтрами и корзиной"
    },
    manicure: {
      images: [
        "https://i.postimg.cc/KY2f9jQF/12.png",
        "https://i.postimg.cc/nrCGsDVK/2.png",
        "https://i.postimg.cc/Y9y1wCNv/3.png",
        "https://i.postimg.cc/WpCMWtbK/4.png",
        "https://i.postimg.cc/YCwQ7VFz/5.png",
        "https://i.postimg.cc/k5J86bfV/6.png",
        "https://i.postimg.cc/1zvFp3jv/7.png",
        "https://i.postimg.cc/j5C7vrVt/8.png"
      ],
      caption: "Салон маникюра «Beauty Oasis» — сайт лендинг и онлайн-записью"
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
  // === 3D ПОВОРОТ КАРТОЧЕК ОШИБОК ===
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
});
