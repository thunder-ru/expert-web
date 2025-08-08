// === Переключение темы ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.toggle('light-theme', savedTheme === 'light');
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

// === Навигация с плавной прокруткой ===
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

// === Чат GPT ===
const chatToggle = document.getElementById('chat-toggle');
const chatModal = document.getElementById('chat-modal');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');

function openChat() {
  chatModal.style.display = 'block';
  chatBody.scrollTop = chatBody.scrollHeight;
}

function closeChat() {
  chatModal.style.display = 'none';
}

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Сообщение пользователя
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);

  // Ответ бота
  const botMsg = document.createElement('div');
  botMsg.className = 'message bot';
  botMsg.textContent = getBotResponse(text.toLowerCase());
  chatBody.appendChild(botMsg);

  userInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

function getBotResponse(input) {
  if (input.includes('стоит') || input.includes('цена')) {
    return 'Сайт от 15 000 руб. Точный расчёт после обсуждения задачи.';
  } else if (input.includes('срок') || input.includes('длительность')) {
    return 'Срок — от 5 до 14 дней. Всё зависит от сложности и ваших пожеланий.';
  } else if (input.includes('магазин') || input.includes('интернет-магазин')) {
    return 'Да, могу создать интернет-магазин на React + Firebase или другом стеке.';
  } else if (input.includes('лендинг') || input.includes('одностраничник')) {
    return 'Лендинг — от 10 000 руб. Полностью адаптивный, с формой и анимациями.';
  } else if (input.includes('технологии') || input.includes('stack')) {
    return 'Работаю с HTML, CSS, JavaScript, React, Git, Figma. Все сайты — адаптивные и быстрые.';
  } else {
    return 'Спасибо за вопрос! Я передал его Данилу — он свяжется с вами в ближайшее время.';
  }
}

// Открытие/закрытие чата
chatToggle.addEventListener('click', () => {
  chatModal.style.display === 'block' ? closeChat() : openChat();
});

// Обновление активной ссылки при скролле
window.addEventListener('scroll', () => {
  document.querySelectorAll('.section').forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      const id = section.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
});
