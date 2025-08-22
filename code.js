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
// 4. МОДАЛЬНЫЕ ОКНА ПОРТФОЛИО
// ===================================
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalGallery = document.getElementById('modalGallery');
const closeModal = document.querySelector('.close');

// Галереи проектов (ты потом заменишь ссылки)
const galleries = {
  travel: [
    "https://images.unsplash.com/photo-1526815456743-3e55d10113da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  auto: [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1548624070-9b36d59862e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  health: [
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  bike: [
    "https://images.unsplash.com/photo-1541532713592-7538ad33342e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507035895480-2b3156c32a33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  trainer: [
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517838277536-47dd04b87a9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  tea: [
    "https://images.unsplash.com/photo-1595425970375-6f4f6a89ae5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1570186034764-8869f3e0e807?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]
};

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const project = item.getAttribute('data-project');
    const title = item.querySelector('h3').textContent;
    const images = galleries[project] || [];

    modalTitle.textContent = title;
    modalGallery.innerHTML = '';
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      modalGallery.appendChild(img);
    });

    modal.style.display = 'block';
  });
});

closeModal?.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// ===================================
// 5. УМНЫЙ ЧАТ-БОТ (как ИИ)
// ===================================
const chatToggle = document.getElementById('chatBotToggle');
const chatWindow = document.getElementById('chatBotWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const sendChat = document.getElementById('sendChat');

// База знаний
const aiResponses = {
  привет|здравствуйте: "Привет! Я — Thunder AI. Чем могу помочь?",
  запуск|старт|начать: "Отлично! Напишите @overgrand — и через 24 часа будет прототип.",
  сайт|лендинг|магазин: "Создаю сайты, которые приносят заявки с первого дня.",
  сроки|дедлайн: "Средний срок — 5–7 дней. Срочные — за 3 дня.",
  цена|стоимость: "Зависит от задачи. От 8 000 ₽. Напишите — и я пришлю точную оценку.",
  примеры|портфолио: "Смотрите раздел «Портфолио» — все проекты реальные.",
  default: "Не совсем понял. Напишите 'Запуск', 'Сроки' или 'Примеры'."
};

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.classList.add('msg', type);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatToggle?.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
  if (chatWindow.style.display === 'block' && chatMessages.children.length <= 1) {
    setTimeout(() => addMessage("Рад вас видеть! Какой проект вы хотите запустить?", 'bot'), 500);
  }
});

closeChat?.addEventListener('click', () => chatWindow.style.display = 'none');

function handleUserMessage() {
  const text = (chatInput?.value || '').trim().toLowerCase();
  if (!text) return;

  addMessage(chatInput.value, 'user');
  chatInput.value = '';

  let response = aiResponses.default;
  for (const [keys, reply] of Object.entries(aiResponses)) {
    if (keys === 'default') continue;
    if (keys.split('|').some(k => text.includes(k))) {
      response = reply;
      break;
    }
  }

  setTimeout(() => addMessage(response, 'bot'), 800);
}

sendChat?.addEventListener('click', handleUserMessage);
chatInput?.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleUserMessage();
});

// ===================================
// 6. УЛУЧШЕННАЯ ФОРМА
// ===================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

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
