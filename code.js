// === Переключение темы ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') body.classList.add('light-theme');
updateIcon();

function updateIcon() {
  const icon = themeToggle.querySelector('i');
  icon.className = body.classList.contains('light-theme') ? 'fas fa-moon' : 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateIcon();
});

// === Плавная прокрутка и активная ссылка ===
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    scrollToSection(targetId);
  });
});

function scrollToSection(id) {
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  document.querySelectorAll('.section').forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      const id = section.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
      });
    }
  });
});

// === Модальное окно "Заказать сайт" ===
const orderModal = document.getElementById('order-modal');

function openOrderModal() {
  orderModal.style.display = 'flex';
}

function closeOrderModal() {
  orderModal.style.display = 'none';
}

window.onclick = function(e) {
  if (e.target === orderModal) {
    closeOrderModal();
  }
};

// === Telegram Bot API ===
const BOT_TOKEN = '7386843105:AAEj2578692ZjKj56321234567890123456'; // Замени на свой
const CHAT_ID = '123456789'; // Замени на свой ID

async function sendToTelegram(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const contact = form.contact.value;
  const project = form.project.value;

  const message = `
  📩 <b>Новая заявка!</b>
  👤 <b>Имя:</b> ${name}
  📱 <b>Контакт:</b> ${contact}
  💼 <b>Проект:</b> ${project}
  `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'HTML'
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    alert('Заявка отправлена! Я свяжусь с вами в течение 15 минут.');
    closeOrderModal();
    form.reset();
  } catch (error) {
    alert('Ошибка отправки. Напишите мне в Telegram: @overgrand');
  }
}

// === Чат ===
const chatToggle = document.getElementById('chat-toggle');
const chatModal = document.getElementById('chat-modal');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');

function openChat() {
  chatModal.style.display = 'block';
  setTimeout(() => chatBody.scrollTop = chatBody.scrollHeight, 100);
}

function closeChat() {
  chatModal.style.display = 'none';
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);

  const botMsg = document.createElement('div');
  botMsg.className = 'message bot';
  botMsg.textContent = getBotResponse(text.toLowerCase());
  chatBody.appendChild(botMsg);

  userInput.value = '';
  setTimeout(() => chatBody.scrollTop = chatBody.scrollHeight, 100);
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

function getBotResponse(input) {
  if (input.includes('стоит') || input.includes('цена')) {
    return 'Сайт от 15 000 руб. Но! Если запуститесь в ближайшие 3 дня — сделаю за 12 000.';
  } else if (input.includes('срок') || input.includes('длительность')) {
    return '5–7 дней. Готовый сайт уже через неделю. Без задержек.';
  } else if (input.includes('магазин') || input.includes('интернет-магазин')) {
    return 'Да. Сделаю интернет-магазин на React + Firebase. С корзиной, оплатой, админкой.';
  } else if (input.includes('лендинг') || input.includes('одностраничник')) {
    return 'Лендинг — от 10 000 руб. Адаптивный, с формой, анимациями и высокой конверсией.';
  } else if (input.includes('предоплат') || input.includes('оплата')) {
    return 'Никакой предоплаты. Оплата — только после того, как сайт готов и вам нравится.';
  } else {
    return 'Спасибо за вопрос! Я передал его Данилу — он свяжется с вами в ближайшее время.';
  }
}

chatToggle.addEventListener('click', () => {
  chatModal.style.display === 'block' ? closeChat() : openChat();
});

// === Карусель отзывов ===
const reviews = document.querySelectorAll('.review-item');
const prevBtn = document.getElementById('prev-review');
const nextBtn = document.getElementById('next-review');
let currentIndex = 0;

function showReview(index) {
  reviews.forEach(r => r.classList.remove('active'));
  reviews[index].classList.add('active');
}

showReview(0);

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % reviews.length;
  showReview(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  showReview(currentIndex);
});
