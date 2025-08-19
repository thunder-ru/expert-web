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
  alert('Спасибо за доверие!');
  closeModal();
}

// Данные для проектов
const projectData = {
  car_rental: {
    title: "Автомойка",
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
  },
  bike_rental: {
    title: "Прокат велосипедов",
    images: [
      "https://i.postimg.cc/J7S6P9KZ/image.jpg",
      "https://i.postimg.cc/MG02XYWL/2.jpg",
      "https://i.postimg.cc/zfr4mRnF/3.jpg",
      "https://i.postimg.cc/dQxXsf21/4.jpg",
      "https://i.postimg.cc/rFRHK9j9/5.jpg",
      "https://i.postimg.cc/wjKGJsbY/6.jpg",
      "https://i.postimg.cc/DwqYcytJ/7.jpg"
    ]
  },
  fitness: {
    title: "Фитнес-тренер",
    images: [
      "https://i.postimg.cc/Z5xwY0mx/1.jpg",
      "https://i.postimg.cc/907v5PN1/2.jpg",
      "https://i.postimg.cc/vH5p0znZ/3.jpg",
      "https://i.postimg.cc/bwT4hw3X/image.jpg",
      "https://i.postimg.cc/26PKwb8W/5.jpg"
    ]
  },
  travel: {
    title: "Тур-агентство",
    images: [
      "https://i.postimg.cc/8kvBPsBf/1.jpg",
      "https://i.postimg.cc/zG02QPG8/2.jpg",
      "https://i.postimg.cc/xdB5DrDD/3.jpg",
      "https://i.postimg.cc/9FcpjtSM/4.jpg",
      "https://i.postimg.cc/bwBHkXvD/5.jpg",
      "https://i.postimg.cc/MGf0Yscs/6.jpg"
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
    message: formData.get('message')
  };

  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(() => {
      document.getElementById('successMessage').classList.remove('hidden');
      this.reset();
      setTimeout(() => {
        document.getElementById('successMessage').classList.add('hidden');
      }, 5000);
    })
    .catch((error) => {
      alert('Ошибка отправки: ' + JSON.stringify(error));
    });
});
