// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  // Мобильное меню
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

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

  // Элементы модального окна
  const modal = document.getElementById("imageModal");
  const galleryInner = document.getElementById("galleryInner");
  const modalCaption = document.getElementById("modalCaption");
  const galleryContainer = document.getElementById("galleryContainer");
  let currentProjectKey = null;
  let currentImageIndex = 0;

  if (!modal || !galleryInner || !modalCaption || !galleryContainer) {
    console.error("Модальные элементы не найдены");
    return;
  }

  // Открытие модального окна
  window.openModal = function (key) {
    currentProjectKey = key;
    const project = projectData[key];
    if (!project) {
      console.error("Проект не найден:", key);
      return;
    }

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

  // Прокрутка к текущему изображению
  function scrollToCurrent() {
    const images = galleryInner.querySelectorAll('img');
    if (images[currentImageIndex]) {
      images[currentImageIndex].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  // Следующее изображение
  window.nextImage = function () {
    const project = projectData[currentProjectKey];
    if (!project || currentImageIndex >= project.images.length - 1) return;
    currentImageIndex++;
    updateCaption();
    scrollToCurrent();
  };

  // Предыдущее изображение
  window.prevImage = function () {
    if (currentImageIndex <= 0) return;
    currentImageIndex--;
    updateCaption();
    scrollToCurrent();
  };

  // Обновление подписи
  function updateCaption() {
    const project = projectData[currentProjectKey];
    modalCaption.textContent = `${project.caption} (${currentImageIndex + 1}/${project.images.length})`;
  }

  // Закрытие модального окна
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

  // Обработчик кликов по карточкам
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function () {
      const key = this.getAttribute('data-project');
      if (key && projectData[key]) {
        openModal(key);
      }
    });
  });

  // Закрытие по клику вне
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Управление стрелками
  document.addEventListener("keydown", (e) => {
    if (currentProjectKey) {
      if (e.key === "ArrowDown") nextImage();
      if (e.key === "ArrowUp") prevImage();
    }
    if (e.key === "Escape") closeModal();
  });

  // Свайп в модальном окне
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

  // === СЧЁТЧИКИ В ТИКЕРАХ ===
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

  // === АНИМАЦИЯ ПОЯВЛЕНИЯ НАВЫКОВ ===
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

  // === ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ ===
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

  // === ИНТЕРАКТИВНЫЙ ТЕСТ ===
  let currentQuestion = 1;
  const totalQuestions = 3;
  const progressEl = document.getElementById('quizProgress');

  // Обновление прогресс-бара
  function updateProgress() {
    const progress = ((currentQuestion - 1) / totalQuestions) * 100;
    if (progressEl) {
      progressEl.style.width = `${progress}%`;
    }
  }

  window.nextQuestion = function (current, answer) {
    document.getElementById(`q${current}`).classList.remove('active');
    currentQuestion++;
    document.getElementById(`q${current}`).classList.add('active');

    if (currentQuestion > 1) {
      document.getElementById('back-btn').style.display = 'inline-block';
    }

    updateProgress();
  };

  window.prevQuestion = function () {
    if (currentQuestion > 1) {
      document.getElementById(`q${currentQuestion}`).classList.remove('active');
      currentQuestion--;
      document.getElementById(`q${currentQuestion}`).classList.add('active');
    }

    if (currentQuestion === 1) {
      document.getElementById('back-btn').style.display = 'none';
    }

    updateProgress();
  };

  window.showResult = function (budget) {
    const result = document.getElementById('result');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');

    document.getElementById('q3').classList.remove('active');
    result.style.display = 'block';

    result.scrollIntoView({ behavior: 'smooth' });

    if (budget === 'low') {
      resultTitle.textContent = 'Отлично! Есть решение.';
      resultText.textContent = 'Могу сделать лендинг или визитку за 30к. Быстро, чисто, с фокусом на результат.';
    } else if (budget === 'mid') {
      resultTitle.textContent = 'Идеальный бюджет!';
      resultText.textContent = 'Сделаю сайт под ключ за 5–7 дней: дизайн, верстка, SEO, адаптив — всё включено.';
    } else if (budget === 'high') {
      resultTitle.textContent = 'Готов к масштабу!';
      resultText.textContent = 'Создам мощный сайт с интеграциями, аналитикой и системой роста. Будет работать как бизнес.';
    } else if (budget === 'not-sure') {
      resultTitle.textContent = 'Не знаешь бюджет?';
      resultText.textContent = 'Напиши — и я предложу оптимальное решение под твои цели. Через 24 часа будет прототип.';
    }

    // Завершаем прогресс
    if (progressEl) {
      progressEl.style.width = '100%';
    }
  };

  // Инициализация прогресс-бара
  updateProgress();

  // Копирование Telegram
  document.getElementById('telegram-link').addEventListener('click', () => {
    navigator.clipboard.writeText('@overgrand').then(() => {
      alert('Никнейм Telegram скопирован! Напишу в течение часа :)');
    });
  });
});
