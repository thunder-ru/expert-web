// Открытие Telegram
function openTelegram() {
  window.open("https://t.me/overgrand", '_blank');
}

// Прокрутка к секции
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Калькулятор
function calculate() {
  let total = 0;

  // Тип сайта
  total += parseFloat(document.getElementById("siteType").value) || 0;

  // Дизайн
  total += parseFloat(document.getElementById("design").value) || 0;

  // Страницы (кроме лендинга)
  const siteType = parseFloat(document.getElementById("siteType").value);
  if (siteType !== 20000) {
    const pages = parseInt(document.getElementById("pages").value) || 1;
    total += pages * 1500;
  }

  // Функционал
  document.querySelectorAll('#calcForm input[type="checkbox"]:checked').forEach(cb => {
    total += parseFloat(cb.value);
  });

  // SEO
  total += parseFloat(document.getElementById("seo").value) || 0;

  // Поддержка
  total += parseFloat(document.getElementById("support").value) || 0;

  // Вывод
  document.getElementById("result").innerText = `Примерная стоимость: ${total.toLocaleString()} ₽`;
}

// Отправка сметы
function sendCalcResult() {
  const result = document.getElementById("result").innerText;
  const msg = `Новая заявка!\n${result}\nПожалуйста, свяжитесь со мной.`;
  const url = `https://t.me/overgrand?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// Форма обратной связи
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  const text = `Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}`;
  const url = `https://t.me/overgrand?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  alert('Заявка отправлена! Свяжемся в ближайшее время.');
});

// Портфолио слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');

// Создаём точки
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.onclick = () => goToSlide(index);
  dotsContainer.appendChild(dot);
});

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));

  if (n >= slides.length) currentSlide = 0;
  if (n < 0) currentSlide = slides.length - 1;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() { currentSlide++; showSlide(currentSlide); }
function prevSlide() { currentSlide--; showSlide(currentSlide); }
function goToSlide(n) { currentSlide = n; showSlide(currentSlide); }

// Галерея
function openGallery(images) {
  const galleryGrid = document.getElementById('galleryGrid');
  galleryGrid.innerHTML = ''; // Очистка

  images.forEach(imgUrl => {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Проект';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
    galleryGrid.appendChild(img);
  });

  // Заголовок и описание (пример)
  document.getElementById('projectTitle').innerText = "Проект";
  document.getElementById('projectDesc').innerText = "Описание проекта.";
  document.getElementById('projectResult').innerText = "Результат: +100% трафик";

  document.getElementById('galleryModal').style.display = 'flex';
}

function closeGallery() {
  document.getElementById('galleryModal').style.display = 'none';
}

// Мобильное меню
function toggleMenu() {
  document.getElementById("mainNav").classList.toggle("active");
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  calculate(); // Первый расчёт
  showSlide(0); // Первый слайд
});
