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
// 4. ЧАТ-БОТ
// ===================================
const chatToggle = document.getElementById('chatBotToggle');
const chatWindow = document.getElementById('chatBotWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const sendChat = document.getElementById('sendChat');

const responses = {
  привет: "Привет! Готовы запустить сайт за 5 дней?",
  запуск: "Отлично! Напишите мне в Telegram — и через 24 часа будет прототип.",
  сайт: "Создаю сайты, которые приносят заявки с первого дня.",
  default: "Напишите 'Запуск', чтобы начать."
};

function addMsg(text, type) {
  const msg = document.createElement('div');
  msg.classList.add('msg', type);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatToggle?.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
  if (chatWindow.style.display === 'block' && chatMessages.children.length <= 1) {
    setTimeout(() => addMsg("Рад вас видеть! Какой проект вы хотите запустить?", 'bot'), 500);
  }
});

closeChat?.addEventListener('click', () => chatWindow.style.display = 'none');

sendChat?.addEventListener('click', () => {
  const text = chatInput.value.trim().toLowerCase();
  if (!text) return;
  addMsg(chatInput.value, 'user');
  chatInput.value = '';
  const reply = Object.keys(responses).find(k => text.includes(k)) ? responses[text.split(' ')[0]] : responses.default;
  setTimeout(() => addMsg(reply, 'bot'), 600);
});

chatInput?.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendChat.click();
});

// ===================================
// 5. ФОРМА
// ===================================
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const channel = document.querySelector('input[name="channel"]:checked').value;

  if (!name || !email || !message) {
    alert('Заполните все поля');
    return;
  }

  const body = `Имя: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AСообщение: ${encodeURIComponent(message)}`;
  const url = channel === 'telegram'
    ? `https://t.me/overgrand?text=${body}`
    : `mailto:rosanov.danila2016@yandex.ru?subject=Запрос с web-thunder.ru&body=${body}`;

  window.open(url, '_blank');
});
