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

  document.querySelectorAll('.service-card, .about-text, #contactForm, .testimonial-card, .slider-item').forEach(el => {
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

// === Слайдер портфолио ===
let sliderIndex = 0;
const track = document.getElementById('sliderTrack');
const container = document.getElementById('sliderContainer');

if (track && container) {
  const items = document.querySelectorAll('.slider-item');
  const totalItems = items.length;

  // Перемещение слайдера
  function moveSlider(direction) {
    sliderIndex += direction;

    if (sliderIndex < 0) sliderIndex = totalItems - 1;
    if (sliderIndex >= totalItems) sliderIndex = 0;

    track.style.transform = `translateX(${-sliderIndex * 100}%)`;
  }

  // Автопрокрутка
  let autoSlide = setInterval(() => moveSlider(1), 7000);

  // Остановка при наведении
  container.addEventListener('mouseenter', () => clearInterval(autoSlide));
  container.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => moveSlider(1), 7000);
  });

  // Листание мышкой
  let isDragging = false, startX, startTranslate;
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startTranslate = -sliderIndex * 100;
    track.style.transition = 'none';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = (e.pageX - startX) / window.innerWidth * 100;
    track.style.transform = `translateX(${startTranslate + diff}%)`;
  });

  container.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.pageX - startX;
    if (Math.abs(diff) > 50) moveSlider(diff > 0 ? -1 : 1);
    else moveSlider(0);
    track.style.transition = 'transform 0.6s ease';
  });

  container.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      moveSlider(0);
      track.style.transition = 'transform 0.6s ease';
    }
  });

  // Инициализация
  document.addEventListener('DOMContentLoaded', () => {
    track.style.transition = 'transform 0.6s ease';
    moveSlider(0);
  });
} else {
  console.error('Элементы слайдера не найдены');
}

// === Данные о проектах (галерея) ===
const projectData = {
  car_rental: {
    title: "Аренда автомобилей",
    images: [
  "https://i.postimg.cc/pdkWMT84/Black1.jpg",
  "https://i.postimg.cc/tR8BKPyZ/Blakc2.jpg",
  "https://i.postimg.cc/PrmQ0R29/Black3.jpg",
  "https://i.postimg.cc/0yndyJgC/Black4.jpg",
  "https://i.postimg.cc/HnbbDr4X/Black-5.jpg"
]
  },
  dentistry: {
  title: "Стоматология",
  images: [
    "https://i.postimg.cc/GmFkPfSL/1.jpg",
    "https://i.postimg.cc/5tgJdxjX/2.jpg",
    "https://i.postimg.cc/D0J3XL6G/3.jpg",
    "https://i.postimg.cc/8k9SVXkm/4.jpg",
    "https://i.postimg.cc/zf0s20PW/6.jpg",
    "https://i.postimg.cc/g2dcft4B/7.jpg",
    "https://i.postimg.cc/vm2QxYyp/8.jpg",
    "https://i.postimg.cc/DfX2m3MM/9.jpg"
  ]
},
  tea_coffee: {
  title: "Чай и кофе",
  images: [
    "https://i.postimg.cc/xC4HTVqR/1.jpg",
    "https://i.postimg.cc/GmSbdtS8/2.jpg",
    "https://i.postimg.cc/tCTfyk0k/3.jpg",
    "https://i.postimg.cc/MpfFfGpj/4.jpg",
    "https://i.postimg.cc/d08NnSds/5.jpg",
    "https://i.postimg.cc/nz2Rfj0N/6.jpg",
    "https://i.postimg.cc/zf10LSQ9/7.jpg"
  ]
}
  bike_rental: {
    title: "Прокат велосипедов",
    images: ["https://via.placeholder.com/800x600/0a0a14/ccccff?text=Кейс+4"]
  },
  fitness: {
    title: "Фитнес-тренер",
    images: ["https://via.placeholder.com/800x600/4CAF50/ffffff?text=Кейс+5"]
  },
  travel: {
    title: "Тур-агентство",
    images: ["https://via.placeholder.com/800x600/ff6b35/ffffff?text=Кейс+6"]
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
