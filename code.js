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
// 6. ГАЛЕРЕЯ ПОРТФОЛИО
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
      </div>
    </div>
  </div>
`;
document.body.appendChild(modal);

// Добавляем фотографии в галерею
const galleryData = {
  wanderlux: [
    "https://images.unsplash.com/photo-1526815456743-3e55d10113da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515378791036-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  drivehive: [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507035895480-2873dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  dentacare: [
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  velox: [
    "https://images.unsplash.com/photo-1541532713592-7538ad33342e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507035895480-2873dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  fitmaster: [
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517838277536-47dd04b87a9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  teazen: [
    "https://images.unsplash.com/photo-1595425970375-6f4f6a89ae5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1570186034764-8869f3e0e807?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
};

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
      slide.innerHTML = `<img src="${img}" alt="" style="width: 100%; height: 100%; object-fit: cover;">`;
      swiperWrapper.appendChild(slide);
    });

    // Инициализируем галерею
    if (window.gallerySwiper) {
      window.gallerySwiper.destroy();
    }

    window.gallerySwiper = new Swiper('.gallery-swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    modal.style.display = 'block';
  });
});

// Закрытие модального окна
document.querySelector('.close')?.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
