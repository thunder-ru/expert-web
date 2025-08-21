// Прокрутка к секции
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Открытие Telegram
function openTelegram() {
  window.open("https://t.me/overgrand", '_blank');
}

// Показать шаг
function showStep(n) {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  const step = document.getElementById(`step${n}`);
  if (step) step.classList.add('active');
}

// Проверка выбора и переход
function validateAndNext(currentStep, nextStepNum) {
  let valid = true;
  if (currentStep === 1 && !document.querySelector('input[name="siteType"]:checked')) valid = false;
  else if (currentStep === 2 && !document.querySelector('input[name="design"]:checked')) valid = false;
  else if (currentStep === 3 && !document.querySelector('input[name="seo"]:checked')) valid = false;
  else if (currentStep === 4 && !document.querySelector('input[name="support"]:checked')) valid = false;

  if (!valid) {
    alert("Пожалуйста, выберите вариант.");
    return;
  }
  showStep(nextStepNum);
  updateTotal();
}

// Назад
function goBack() {
  for (let i = 2; i <= 4; i++) {
    const step = document.getElementById(`step${i}`);
    if (step && step.classList.contains('active')) {
      showStep(i - 1);
      return;
    }
  }
  showStep(1);
}

// Обновление итога
function updateTotal() {
  let total = 0;
  const siteType = document.querySelector('input[name="siteType"]:checked');
  if (siteType) total += parseFloat(siteType.value) || 0;
  const design = document.querySelector('input[name="design"]:checked');
  if (design) total += parseFloat(design.value) || 0;
  const seo = document.querySelector('input[name="seo"]:checked');
  if (seo) total += parseFloat(seo.value) || 0;
  const support = document.querySelector('input[name="support"]:checked');
  if (support) total += parseFloat(support.value) || 0;

  const resultEl = document.getElementById('result');
  if (resultEl) {
    resultEl.innerHTML = `
      <strong>Примерная стоимость: ${total.toLocaleString()}&nbsp;₽</strong>
      <br>
      <small style="color: #94a3b8;">Точная цена будет после анализа вашего бизнеса</small>
    `;
  }
}

// Открытие калькулятора
function openCalculator() {
  const modal = document.getElementById('calculatorModal');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  showStep(1);
  updateTotal();
}

// Закрытие калькулятора
function closeCalculator() {
  const modal = document.getElementById('calculatorModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Отправка заявки
function requestQuote() {
  const siteTypeLabel = document.querySelector('input[name="siteType"]:checked')?.nextElementSibling?.querySelector('h4')?.innerText || '—';
  const designLabel = document.querySelector('input[name="design"]:checked')?.nextElementSibling?.querySelector('h4')?.innerText || '—';
  const seoLabel = document.querySelector('input[name="seo"]:checked')?.value > 0 ? 'Да' : 'Нет';
  const supportLabel = document.querySelector('input[name="support"]:checked')?.nextElementSibling?.querySelector('h4')?.innerText || '—';
  const totalEl = document.getElementById('result').querySelector('strong');
  const total = totalEl ? totalEl.innerText.match(/\d+/)?.[0] : '0';

  let message = `🚀 *ЗАЯВКА НА СМЕТУ*\n\n`;
  message += `🔹 Тип сайта: ${siteTypeLabel}\n`;
  message += `🔹 Дизайн: ${designLabel}\n`;
  message += `🔹 SEO: ${seoLabel}\n`;
  message += `🔹 Поддержка: ${supportLabel}\n\n`;
  message += `💰 Итого: ${total} ₽\n\n`;
  message += `—\nГотов обсудить детали!`;

  const encoded = encodeURIComponent(message);
  const url = `https://t.me/overgrand?text=${encoded}`;
  window.open(url, '_blank');
}

// Галерея
const galleryData = {
  auto: {
    title: "Аренда автомобилей",
    desc: "Сайт для аренды автомобилей с онлайн-бронированием.",
    result: "+30% заявок за 2 месяца",
    images: [
      "https://i.postimg.cc/pdkWMT84/Black1.jpg",
      "https://i.postimg.cc/tR8BKPyZ/Blakc2.jpg",
      "https://i.postimg.cc/PrmQ0R29/Black3.jpg",
      "https://i.postimg.cc/0yndyJgC/Black4.jpg",
      "https://i.postimg.cc/HnbbDr4X/Black-5.jpg"
    ]
  },
  dentist: {
    title: "Стоматология",
    desc: "Сайт-визитка с записью на приём и отзывами.",
    result: "ТОП-5 в Яндекс по ключевым запросам",
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
  tea: {
    title: "Онлайн магазин чая и кофе",
    desc: "Интернет-магазин с каталогом и корзиной.",
    result: "Окупился за 1.5 недели",
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
  bike: {
    title: "Магазин велосипедов",
    desc: "Сайт с каталогом, фильтрами и оплатой.",
    result: "+30% трафика и 20+ заказов в месяц",
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
    desc: "Сайт для персонального тренера",
    result: "12+ новых клиентов за месяц",
    images: [
      "https://i.postimg.cc/Z5xwY0mx/1.jpg",
      "https://i.postimg.cc/907v5PN1/2.jpg",
      "https://i.postimg.cc/vH5p0znZ/3.jpg",
      "https://i.postimg.cc/bwT4hw3X/image.jpg",
      "https://i.postimg.cc/26PKwb8W/5.jpg"
    ]
  },
  travel: {
    title: "Турагентство",
    desc: "Сайт для бронирования туров с фильтрами и онлайн-оплатой.",
    result: "Удобное бронирование туров онлайн",
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

function openGallery(projectId) {
  const data = galleryData[projectId];
  if (!data) return;
  document.getElementById('projectTitle').innerText = data.title;
  document.getElementById('projectDesc').innerText = data.desc;
  document.getElementById('projectResult').innerText = data.result;
  const galleryGrid = document.getElementById('galleryGrid');
  galleryGrid.innerHTML = '';
  data.images.forEach(imgUrl => {
    const img = document.createElement('img');
    img.src = imgUrl.trim();
    img.alt = data.title;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
    img.onerror = () => {
      img.src = "https://via.placeholder.com/300x200/ff0000/ffffff?text=Ошибка+загрузки";
    };
    galleryGrid.appendChild(img);
  });
  const modal = document.getElementById('galleryModal');
  modal.style.display = 'flex';
}

function closeGallery() {
  document.getElementById('galleryModal').style.display = 'none';
}

// Мобильное меню
function toggleMenu() {
  document.getElementById("mainNav").classList.toggle("active");
}

// Форма — отправка в Telegram
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !phone || !email) {
    alert('Заполните все обязательные поля.');
    return;
  }

  let text = `📩 *НОВАЯ ЗАЯВКА*\n\n`;
  text += `👤 Имя: ${name}\n`;
  text += `📞 Телефон: ${phone}\n`;
  text += `✉️ Email: ${email}\n`;
  if (message) text += `💬 Сообщение: ${message}\n\n`;
  text += `—\nГотов к диалогу!`;

  const encoded = encodeURIComponent(text);
  const url = `https://t.me/overgrand?text=${encoded}`;
  window.open(url, '_blank');
  alert('✅ Заявка отправлена! Свяжемся в ближайшее время.');
  this.reset();
});

// Портфолио слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');

function showSlide(n) {
  if (n >= slides.length) currentSlide = 0;
  if (n < 0) currentSlide = slides.length - 1;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  showSlide(currentSlide);
}

function goToSlide(n) {
  currentSlide = n;
  showSlide(currentSlide);
}

// Автопрокрутка
let slideInterval = setInterval(nextSlide, 5000);

// Остановить при наведении
document.querySelector('.portfolio-slider').addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

// Возобновить
document.querySelector('.portfolio-slider').addEventListener('mouseleave', () => {
  slideInterval = setInterval(nextSlide, 5000);
});

// Обработчики событий
if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(slideInterval); nextSlide(); });
if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(slideInterval); prevSlide(); });
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideInterval);
    goToSlide(i);
  });
});

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  if (slides.length > 0) {
    showSlide(0);
  }
});
