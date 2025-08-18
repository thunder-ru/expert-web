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

  // Инициализация Swiper
  initSwiper();

  // Показываем модальное окно при первом заходе
  if (!getCookie('privacy_accepted')) {
    openModal();
  }
});

// === Swiper Инициализация ===
function initSwiper() {
  if (document.getElementById('portfolioSwiper')) {
    new Swiper('.swiper-container', {
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
        640: {
          slidesPerView: 1.2,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      on: {
        init: function () {
          const swiper = this;
          const container = swiper.el;

          container.addEventListener('mouseenter', () => {
            swiper.autoplay.stop();
          });

          container.addEventListener('mouseleave', () => {
            swiper.autoplay.start();
          });
        }
      }
    });
  }
}

// Модальное окно
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
  emailjs.init("YOUR_PUBLIC_KEY"); // ← Замените на ваш ключ

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
