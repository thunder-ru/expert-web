// ===================================
// 1. АНИМАЦИЯ ПОЯВЛЕНИЯ
// ===================================
function isInView(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight * 0.85;
}

function animateOnScroll() {
  document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
    if (isInView(el) && !el.classList.contains('animated')) {
      el.classList.add('animated');
      el.style.opacity = '1';
      if (el.classList.contains('slide-left')) el.style.transform = 'translateX(0)';
      if (el.classList.contains('slide-right')) el.style.transform = 'translateX(0)';
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===================================
// 2. ФОН С ЧАСТИЦАМИ
// ===================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let width, height;

function setupCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
setupCanvas();
window.addEventListener('resize', setupCanvas);

const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.6 + 0.3,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 238, 255, ${p.alpha})`;
    ctx.fill();
  });
  if (Math.random() < 0.005) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.6;
    ctx.beginPath(); ctx.moveTo(x, y);
    for (let i = 0; i < 6; i++) { x += (Math.random()-0.5)*40; y += 20 + Math.random()*10; ctx.lineTo(x, y); }
    ctx.strokeStyle = 'rgba(0, 238, 255, 0.8)'; ctx.lineWidth = 2; ctx.stroke();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===================================
// 3. МОБИЛЬНОЕ МЕНЮ
// ===================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// ===================================
// 4. SWIPER ПОРТФОЛИО
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.portfolio-swiper', {
    loop: true,
    spaceBetween: 40,
    slidesPerView: 1,
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 2.5 }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});

// ===================================
// 5. ФОРМА ОБРАТНОЙ СВЯЗИ
// ===================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const channelOptions = document.querySelectorAll('.channel-option');

// Выбор канала
channelOptions.forEach(option => {
  option.addEventListener('click', () => {
    channelOptions.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
  });
});

contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  formStatus.className = 'status';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const channel = document.querySelector('input[name="channel"]:checked').value;

  if (!name || !email || !message) {
    formStatus.textContent = 'Заполните все поля';
    formStatus.className = 'status error';
    return;
  }

  const body = `Имя: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AСообщение: ${encodeURIComponent(message)}`;
  const url = channel === 'telegram'
    ? `https://t.me/overgrand?text=${body}`
    : `mailto:rosanov.danila2016@yandex.ru?subject=Запрос с web-thunder.ru&body=${body}`;

  formStatus.textContent = 'Переходим к связи...';
  formStatus.className = 'status success';

  setTimeout(() => {
    window.open(url, '_blank');
    formStatus.textContent = 'Готово! Открываем Telegram/email...';
  }, 1000);
});

// ===================================
// 6. ГАЛЕРЕЯ ПОРТФОЛИО (вертикальная, модально)
// ===================================
const portfolioLinks = document.querySelectorAll('.portfolio-link');
const modal = document.createElement('div');
modal.id = 'galleryModal';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="gallery-slider">
      <div class="swiper gallery-swiper">
        <div class="swiper-wrapper"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(modal);

// УБИРАЕМ ПРОБЕЛЫ В ССЫЛКАХ
const galleryData = {
  wanderlux: [
    "https://i.postimg.cc/8kvBPsBf/1.jpg",
    "https://i.postimg.cc/zG02QPG8/2.jpg",
    "https://i.postimg.cc/xdB5DrDD/3.jpg",
    "https://i.postimg.cc/9FcpjtSM/4.jpg",
    "https://i.postimg.cc/bwBHkXvD/5.jpg",
    "https://i.postimg.cc/MGf0Yscs/6.jpg"
  ],
  drivehive: [
    "https://i.postimg.cc/pdkWMT84/Black1.jpg",
    "https://i.postimg.cc/tR8BKPyZ/Blakc2.jpg",
    "https://i.postimg.cc/PrmQ0R29/Black3.jpg",
    "https://i.postimg.cc/0yndyJgC/Black4.jpg",
    "https://i.postimg.cc/HnbbDr4X/Black-5.jpg"
  ],
  dentacare: [
    "https://i.postimg.cc/GmFkPfSL/1.jpg",
    "https://i.postimg.cc/5tgJdxjX/2.jpg",
    "https://i.postimg.cc/D0J3XL6G/3.jpg",
    "https://i.postimg.cc/8k9SVXkm/4.jpg",
    "https://i.postimg.cc/zf0s20PW/6.jpg",
    "https://i.postimg.cc/g2dcft4B/7.jpg",
    "https://i.postimg.cc/vm2QxYyp/8.jpg",
    "https://i.postimg.cc/DfX2m3MM/9.jpg"
  ],
  velox: [
    "https://i.postimg.cc/J7S6P9KZ/image.jpg",
    "https://i.postimg.cc/MG02XYWL/2.jpg",
    "https://i.postimg.cc/zfr4mRnF/3.jpg",
    "https://i.postimg.cc/dQxXsf21/4.jpg",
    "https://i.postimg.cc/rFRHK9j9/5.jpg",
    "https://i.postimg.cc/wjKGJsbY/6.jpg",
    "https://i.postimg.cc/DwqYcytJ/7.jpg"
  ],
  fitmaster: [
    "https://i.postimg.cc/Z5xwY0mx/1.jpg",
    "https://i.postimg.cc/907v5PN1/2.jpg",
    "https://i.postimg.cc/vH5p0znZ/3.jpg",
    "https://i.postimg.cc/bwT4hw3X/image.jpg",
    "https://i.postimg.cc/26PKwb8W/5.jpg"
  ],
  teazen: [
    "https://i.postimg.cc/xC4HTVqR/1.jpg",
    "https://i.postimg.cc/GmSbdtS8/2.jpg",
    "https://i.postimg.cc/tCTfyk0k/3.jpg",
    "https://i.postimg.cc/MpfFfGpj/4.jpg",
    "https://i.postimg.cc/d08NnSds/5.jpg",
    "https://i.postimg.cc/nz2Rfj0N/6.jpg",
    "https://i.postimg.cc/zf10LSQ9/7.jpg"
  ]
};

// Открытие галереи
portfolioLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const project = link.getAttribute('data-project');
    const images = galleryData[project] || [];

    const swiperWrapper = document.querySelector('.gallery-swiper .swiper-wrapper');
    swiperWrapper.innerHTML = '';
    images.forEach(img => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${img}" alt="Фото проекта">`;
      swiperWrapper.appendChild(slide);
    });

    // Уничтожаем старый Swiper
    if (window.gallerySwiper) {
      window.gallerySwiper.destroy(true, true);
    }

    // Инициализируем новый — вертикальный
    window.gallerySwiper = new Swiper('.gallery-swiper', {
      direction: 'vertical',
      loop: true,
      mousewheel: {
        invert: false,
        sensitivity: 1,
      },
      keyboard: {
        enabled: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: function () {
          console.log('Слайд изменён');
        }
      }
    });

    modal.style.display = 'flex'; // Используем flex, чтобы центрировать
  });
});

// Закрытие модального окна
document.querySelector('.close')?.addEventListener('click', () => {
  modal.style.display = 'none';
  if (window.gallerySwiper) {
    window.gallerySwiper.destroy(true, true);
  }
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    if (window.gallerySwiper) {
      window.gallerySwiper.destroy(true, true);
    }
  }
});
