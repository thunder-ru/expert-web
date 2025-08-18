// Плавная прокрутка
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Мобильное меню
function toggleMenu() {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('active');
}

// Прогресс-бар
window.onscroll = function() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
};

// Анимации при прокрутке
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  document.querySelectorAll('.service-card, .about-text, #contactForm, .testimonial-card, .portfolio-slide').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Инициализация Swiper (портфолио)
  initPortfolioSwiper();

  // Показываем модальное окно при первом заходе
  if (!getCookie('privacy_accepted')) {
    openModal();
  }
});

// === Swiper для портфолио ===
let portfolioSwiper;
function initPortfolioSwiper() {
  portfolioSwiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    on: {
      init: function () {
        const swiper = this;
        const container = swiper.el;
        container.addEventListener('mouseenter', () => swiper.autoplay.stop());
        container.addEventListener('mouseleave', () => swiper.autoplay.start());
      }
    }
  });
}

// === Модальное окно проекта ===
let gallerySwiper;

const projectData = {
  velodrayv: {
    title: "Интернет-магазин велосипедов",
    images: [
      "https://example.com/velodrayv1.jpg",
      "https://example.com/velodrayv2.jpg",
      "https://example.com/velodrayv3.jpg"
    ]
  },
  project2: {
    title: "Лендинг для стартапа",
    images: [
      "https://example.com/project2-1.jpg",
      "https://example.com/project2-2.jpg"
    ]
  },
  project3: {
    title: "Корпоративный сайт",
    images: [
      "https://example.com/project3-1.jpg",
      "https://example.com/project3-2.jpg",
      "https://example.com/project3-3.jpg"
    ]
  },
  project4: {
    title: "CRM-система",
    images: [
      "https://example.com/project4-1.jpg",
      "https://example.com/project4-2.jpg"
    ]
  },
  project5: {
    title: "Сервис бронирования",
    images: [
      "https://example.com/project5-1.jpg",
      "https://example.com/project5-2.jpg"
    ]
  },
  project6: {
    title: "Агрегатор услуг",
    images: [
      "https://example.com/project6-1.jpg",
      "https://example.com/project6-2.jpg",
      "https://example.com/project6-3.jpg"
    ]
  }
};

function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  document.getElementById('projectTitle').textContent = project.title;
  const container = document.getElementById('gallerySlides');
  container.innerHTML = '';

  project.images.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<img src="${src}" alt="Фото проекта" class="gallery-img" loading="lazy">`;
    container.appendChild(slide);
  });

  document.getElementById('projectModal').style.display = 'flex';

  // Инициализация галереи
  if (gallerySwiper) gallerySwiper.destroy();
  gallerySwiper = new Swiper('.swiper-gallery-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  });
}

function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
  if (gallerySwiper) {
    gallerySwiper.destroy();
    gallerySwiper = null;
  }
}

// Модальное окно политики
function openModal() {
  document.getElementById('privacyModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('privacyModal').style.display = 'none';
}

function acceptPolicy() {
  setCookie('privacy_accepted', 'true', 365);
  closeModal();
}

// Cookie-функции
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}

// EmailJS
(function() {
  emailjs.init("YOUR_PUBLIC_KEY");

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      emailjs.sendForm('default_service', 'template_contact', this)
        .then(() => {
          form.reset();
          const success = document.getElementById('successMessage');
          success.classList.remove('hidden');
          setTimeout(() => success.classList.add('hidden'), 5000);
        }, (err) => {
          alert('Ошибка отправки: ' + JSON.stringify(err));
        });
    });
  }
})();
