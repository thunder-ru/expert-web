// Показ/скрытие мобильного меню
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Фильтр портфолио
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Калькулятор стоимости
const siteType = document.getElementById('siteType');
const adaptive = document.getElementById('adaptive');
const animations = document.getElementById('animations');
const seo = document.getElementById('seo');
const total = document.getElementById('total');

function updateCalc() {
  let price = parseInt(siteType.value);
  if (adaptive.checked) price += 3000;
  if (animations.checked) price += 2000;
  if (seo.checked) price += 5000;
  total.textContent = price.toLocaleString();
}

siteType.addEventListener('change', updateCalc);
adaptive.addEventListener('change', updateCalc);
animations.addEventListener('change', updateCalc);
seo.addEventListener('change', updateCalc);
updateCalc();

// Форма обратной связи
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const channel = document.querySelector('input[name="channel"]:checked').value;

  const text = `Имя: ${name}%0AEmail: ${email}%0AСообщение: ${message}`;
  const url = channel === 'telegram'
    ? `https://t.me/overgrand?text=${text}`
    : `mailto:rosanov.danila2016@yandex.ru?subject=Запрос с сайта Thunder-Web&body=${text}`;

  window.open(url, '_blank');
});

// Отзывы
document.getElementById('addReviewBtn').addEventListener('click', () => {
  document.getElementById('reviewForm').classList.toggle('hidden');
});

document.getElementById('submitReview').addEventListener('click', () => {
  alert('Спасибо! Ваш отзыв отправлен на модерацию.');
  document.getElementById('reviewForm').classList.add('hidden');
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';
});

// Чат-бот
const chatToggle = document.getElementById('chatBotToggle');
const chatWindow = document.getElementById('chatBotWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const sendChat = document.getElementById('sendChat');

chatToggle.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'block' ? 'none' : 'block';
});

closeChat.addEventListener('click', () => {
  chatWindow.style.display = 'none';
});

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.classList.add('msg', type);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendChat.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (text) {
    addMessage(text, 'user');
    // Простой ответ
    setTimeout(() => {
      addMessage("Спасибо за сообщение! Для подробной консультации лучше напишите мне в Telegram: @overgrand", 'bot');
    }, 500);
    chatInput.value = '';
  }
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendChat.click();
});
