// Инициализация EmailJS
(function () {
  emailjs.init("YOUR_PUBLIC_KEY"); // ← Вставьте ваш Public Key
})();

// Прогресс-бар
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
});

// Анимация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('heroText').style.animation = 'fadeInUp 1s ease forwards';
  document.getElementById('aboutText').style.animation = 'fadeInUp 1s ease 0.3s forwards';
  initSlider();
  updateTotal();
});

// Мобильное меню
function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
}

// Плавный скролл
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  if (document.querySelector('.nav').classList.contains('active')) {
    document.querySelector('.nav').classList.remove('active');
  }
}

// === КАЛЬКУЛЯТОР СТОИМОСТИ ===
function updateTotal() {
  const siteType = parseFloat(document.getElementById('siteType').value) || 0;
  const needSEO = parseFloat(document.getElementById('needSEO').value) || 0;
  const urgency = parseFloat(document.getElementById('urgency').value) || 0;
  const total = siteType + needSEO + urgency;
  document.getElementById('totalPrice').textContent = total.toLocaleString('ru-RU') + ' ₽';
}

document.getElementById('siteType').addEventListener('change', updateTotal);
document.getElementById('needSEO').addEventListener('change', updateTotal);
document.getElementById('urgency').addEventListener('change', updateTotal);

// === СЛАЙДЕР ПОРТФОЛИО ===
let currentSlide = 0;
const sliderTrack = document.getElementById('sliderTrack');
const sliderItems = document.querySelectorAll('.slider-item');
const dotsContainer = document.getElementById('sliderDots');
const totalSlides = sliderItems.length;

// Создание точек
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

function updateSlider() {
  const itemWidth = 280;
  const gap = 20;
  sliderTrack.style.transform = `translateX(-${currentSlide * (itemWidth + gap)}px)`;
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function moveSlider(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function initSlider() {
  updateSlider();
}

// === МОДАЛЬНЫЕ ОКНА ===
function openModal() {
  document.getElementById('privacyModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('privacyModal').style.display = 'none';
}

function acceptPolicy() {
  alert('Спасибо за доверие! Политика принята.');
  closeModal();
}

// Данные для проектов
const projectData = {
  car_rental: {
    title: "Автомойка",
    images: [
      "https://i.postimg.cc/pdkWMT84/Black1.jpg",
      "https://via.placeholder.com/800x600/1a1a2e/ffffff?text=Скрин+2"
    ]
  },
  dentistry: {
    title: "Стоматология",
    images: [
      "https://i.postimg.cc/GmFkPfSL/1.jpg",
      "https://via.placeholder.com/800x600/1a1a2e/ffffff?text=Скрин+2"
    ]
  },
  tea_coffee: {
    title: "Чай и кофе",
    images: [
      "https://i.postimg.cc/xC4HTVqR/1.jpg",
      "https://via.placeholder.com/800x600/1a1a2e/ffffff?text=Скрин+2"
    ]
  },
  bike_rental: {
    title: "Прокат велосипедов",
    images: [
      "https://i.postimg.cc/J7S6P9KZ/image.jpg",
      "https://via.placeholder.com/800x600/1a1a2e/ffffff?text=Скрин+2"
    ]
  },
  fitness: {
    title: "Фитнес-клуб",
    images: [
      "https://i.postimg.cc/Z5xwY0mx/1.jpg",
      "https://via.placeholder.com/800x600/1a1a2e/ffffff?text=Скрин+2"
    ]
  },
  travel: {
    title: "Турагентство",
    images: [
      "https://i.postimg.cc/8kvBPsBf/1.jpg",
      "https://via.placeholder.com/800x600/1a1a2e/ffffff?text=Скрин+2"
    ]
  }
};

function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  document.getElementById('projectTitle').textContent = data.title;
  const gallery = document.getElementById('gallerySlides');
  gallery.innerHTML = '';
  data.images.forEach(imgSrc => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.classList.add('gallery-img');
    gallery.appendChild(img);
  });

  document.getElementById('projectModal').style.display = 'flex';
}

function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}

// === ФОРМА ===
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const templateParams = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData
