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

  document.querySelectorAll('.service-card, .about-text, #contactForm, .testimonial-card, .portfolio-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Показываем модальное окно при первом заходе
  if (!getCookie('privacy_accepted')) {
    openModal();
  }
});

// === Данные о проектах (вы можете добавлять любое количество фото по ссылкам) ===
const projectData = {
  car_rental: {
    title: "Аренда автомобилей",
    images: [
      "https://i.postimg.cc/tR8BKPyZ/Blakc2.jpg",
      "https://i.postimg.cc/PrmQ0R29/Black3.jpg",
      "https://i.postimg.cc/0yndyJgC/Black4.jpg",
      "https://i.postimg.cc/HnbbDr4X/Black-5.jpg"
    ]
  },
  dentistry: {
    title: "Стоматология",
    images: [
      "https://t.me/overgrand",
      "https://t.me/overgrand",
      "https://t.me/overgrand"
    ]
  },
  tea_coffee: {
    title: "Чайные и кофейные ритуалы",
    images: [
      "https://t.me/overgrand"
    ]
  },
  bike_rental: {
    title: "Прокат велосипедов",
    images: [
      "https://t.me/overgrand",
      "https://t.me/overgrand"
    ]
  },
  fitness: {
    title: "Фитнес-тренер",
    images: [
      "https://t.me/overgrand"
    ]
  },
  travel: {
    title: "Тур-агентство",
    images: [
      "https://t.me/overgrand",
      "https://t.me/overgrand",
      "https://t.me/overgrand",
      "https://t.me/overgrand"
    ]
  }
};

// Открытие модального окна с галереей
function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  document.getElementById('projectTitle').textContent = project.title;
  const container = document.getElementById('gallerySlides');
  container.innerHTML = '';

  project.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = project.title;
    img.className = 'gallery-img';
    img.loading = 'lazy';
    container.appendChild(img);
  });

  document.getElementById('projectModal').style.display = 'flex';
}

// Закрытие модального окна
function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
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
