// ===================================
// 1. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ
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
// 2. ФОН С ЧАСТИЦАМИ И МОЛНИЯМИ
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
const numParticles = 100;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: Math.random() * 1.8 + 0.3,
    alpha: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.5 + 0.1
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height));
  gradient.addColorStop(0, 'rgba(10, 14, 42, 0.2)');
  gradient.addColorStop(1, 'rgba(6, 9, 26, 0.6)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  particles.forEach(p => {
    p.x += p.vx * p.speed;
    p.y += p.vy * p.speed;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 238, 255, ${p.alpha})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 238, 255, ${p.alpha * 0.2})`;
    ctx.fill();
  });

  if (Math.random() < 0.004) {
    const x = Math.random() * width * 0.8 + width * 0.1;
    const y = Math.random() * height * 0.5 + 50;
    drawLightning(x, y);
  }

  requestAnimationFrame(animateParticles);
}

function drawLightning(x, y) {
  ctx.save();
  ctx.strokeStyle = `hsla(${Math.random() * 60 + 180}, 100%, 65%, 0.8)`;
  ctx.lineWidth = Math.random() * 2 + 1.5;
  ctx.lineCap = 'round';
  ctx.shadowColor = 'rgba(0, 238, 255, 0.7)';
  ctx.shadowBlur = 15;

  ctx.beginPath();
  ctx.moveTo(x, y);
  let lastX = x, lastY = y;
  for (let i = 0; i < 6; i++) {
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = 15 + Math.random() * 10;
    lastX += offsetX;
    lastY += offsetY;
    ctx.lineTo(lastX, lastY);
  }
  ctx.stroke();
  ctx.restore();
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

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// ===================================
// 4. ФИЛЬТР ПОРТФОЛИО
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 50);
        }, 100);
      } else {
        item.style.opacity = '0';
        setTimeout(() => item.style.display = 'none', 300);
      }
    });
  });
});

if (filterBtns[0]) filterBtns[0].click();

// ===================================
// 5. КАЛЬКУЛЯТОР
// ===================================
const siteType = document.getElementById('siteType');
const adaptive = document.getElementById('adaptive');
const animations = document.getElementById('animations');
const seo = document.getElementById('seo');
const crm = document.getElementById('crm');
const total = document.getElementById('total');

function loadCalc() {
  const saved = JSON.parse(localStorage.getItem('thunderCalc')) || {};
  if (siteType) siteType.value = saved.type || siteType.value;
  if (adaptive) adaptive.checked = saved.adaptive || false;
  if (animations) animations.checked = saved.animations || false;
  if (seo) seo.checked = saved.seo || false;
  if (crm) crm.checked = saved.crm || false;
  updateCalc();
}

function saveCalc() {
  const data = {
    type: siteType?.value || '',
    adaptive: adaptive?.checked || false,
    animations: animations?.checked || false,
    seo: seo?.checked || false,
    crm: crm?.checked || false,
  };
  localStorage.setItem('thunderCalc', JSON.stringify(data));
}

function updateCalc() {
  let price = parseInt(siteType?.value || 0);
  if (adaptive?.checked) price += 3000;
  if (animations?.checked) price += 4000;
  if (seo?.checked) price += 5000;
  if (crm?.checked) price += 7000;
  total.textContent = price.toLocaleString();
  saveCalc();
}

[siteType, adaptive, animations, seo, crm].forEach(el => {
  if (el) el.addEventListener('change', updateCalc);
});

if (total) loadCalc();

// ===================================
// 6. ЧАТ-БОТ
// ===================================
const chatToggle = document.getElementById('chatBotToggle');
const chatWindow = document.getElementById('chatBotWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const sendChat = document.getElementById('sendChat');

const botResponses = {
  привет|здравствуйте|hello: "Привет! Я — Thunder Bot. Чем могу помочь?",
  цена|стоимость|сколько: "Отлично! Откройте калькулятор выше — и получите точную оценку за 10 секунд.",
  сайт|лендинг|магазин|визитка: "Я создаю сайты любой сложности: от лендингов до интернет-магазинов. Хотите пример?",
  сроки|срок|дедлайн: "Средний срок — 5–7 дней. Срочные проекты — за 3 дня. Готовы начать?",
  примеры|портфолио|работы: "Смотрите раздел «Портфолио» — все проекты реальные и уже приносят деньги.",
  telegram|телеграм: "Отлично! Пишите @overgrand — отвечаю в течение 30 минут.",
  default: "Не совсем понял. Напишите 'Цена', 'Сроки', 'Примеры' или 'Telegram'."
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

closeChat?.addEventListener('click', () => {
  chatWindow.style.display = 'none';
});

function handleUserMessage() {
  const text = (chatInput?.value || '').trim();
  if (!text) return;

  addMessage(text, 'user');
  chatInput.value = '';

  const lowerText = text.toLowerCase();
  let response = botResponses.default;

  for (const [keys, reply] of Object.entries(botResponses)) {
    if (keys === 'default') continue;
    if (keys.split('|').some(k => lowerText.includes(k))) {
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
// 7. ФОРМА
// ===================================
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();
  const channel = document.querySelector('input[name="channel"]:checked')?.value;

  if (!name || !email || !message) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  const body = `Имя: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AСообщение: ${encodeURIComponent(message)}`;
  const url = channel === 'telegram'
    ? `https://t.me/overgrand?text=${body}`
    : `mailto:rosanov.danila2016@yandex.ru?subject=Запрос с сайта Thunder-Web&body=${body}`;

  window.open(url, '_blank');
});
