document.addEventListener('DOMContentLoaded', function () {
  // Мобильное меню
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Карусель проектов
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const cards = document.querySelectorAll('.project-card');
  const cardWidth = cards[0].offsetWidth + 32; // ширина + gap

  let currentIndex = 0;

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  });

  // Свайп по карусели
  let touchStartX = 0;
  track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) nextBtn.click();
    if (diff < -50) prevBtn.click();
  }, { passive: true });

  // Данные проектов
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
    project.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src.trim();
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
    const imgs = galleryInner.querySelectorAll('img');
    if (imgs[currentImageIndex]) {
      imgs[currentImageIndex].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  window.nextImage = () => {
    const project = projectData[currentProjectKey];
    if (!project || currentImageIndex >= project.images.length - 1) return;
    currentImageIndex++;
    updateCaption();
    scrollToCurrent();
  };

  window.prevImage = () => {
    if (currentImageIndex <= 0) return;
    currentImageIndex--;
    updateCaption();
    scrollToCurrent();
  };

  function updateCaption() {
    const project = projectData[currentProjectKey];
    modalCaption.textContent = `${project.caption} (${currentImageIndex + 1}/${project.images.length})`;
  }

  window.closeModal = () => {
    const content = modal.querySelector('.modal-content');
    if (content) content.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
      document.body.classList.remove('modal-open');
    }, 300);
  };

  // Свайп в модалке
  let startY = 0;
  galleryContainer.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  galleryContainer.addEventListener('touchend', e => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    if (diff > 50) nextImage();
    if (diff < -50) prevImage();
  }, { passive: true });

  // Обработчики карточек
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      if (key && projectData[key]) openModal(key);
    });
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (currentProjectKey) {
      if (e.key === "ArrowDown") nextImage();
      if (e.key === "ArrowUp") prevImage();
    }
    if (e.key === "Escape") closeModal();
  });

  // Счётчик проектов
  const counter = document.getElementById('projectCounter');
  let count = 0;
  const target = 15;
  const duration = 1500;
  const stepTime = duration / target;

  const timer = setInterval(() => {
    count++;
    counter.textContent = count;
    if (count === target) clearInterval(timer);
  }, stepTime);

  // Плавное появление
  const fadeElements = document.querySelectorAll('.section-title, .service-card, .project-card, .quotes blockquote, .about-content, .contact p');
  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  // Копирование Telegram
  document.getElementById('telegram-link').addEventListener('click', () => {
    navigator.clipboard.writeText('@overgrand').then(() => {
      alert('Никнейм Telegram скопирован! Напишу в течение часа :)');
    });
  });

  // Тема
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = '🌞';
  } else {
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '🌙';
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌞';
    }
  });
});
