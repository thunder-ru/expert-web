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

  if (currentStep === 1) {
    if (!document.querySelector('input[name="siteType"]:checked')) valid = false;
  } else if (currentStep === 2) {
    if (!document.querySelector('input[name="design"]:checked')) valid = false;
  } else if (currentStep === 3) {
    const seo = document.querySelector('input[name="seo"]:checked');
    const support = document.querySelector('input[name="support"]:checked');
    if (!seo || !support) {
      alert("Выберите SEO и техническую поддержку.");
      valid = false;
    }
  }

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
      <small style="color: #94a3b8; margin-left: 8px;">Точная цена будет после анализа вашего бизнеса</small>
    `;
  }
}

// Калькулятор → Отправка в Telegram
function requestQuote() {
  const siteTypeLabel = document.querySelector('input[name="siteType"]:checked')?.nextElementSibling?.querySelector('h4')?.innerText || '—';
  const seoLabel = document.querySelector('input[name="seo"]:checked')?.value > 0 ? 'Да' : 'Нет';
  const supportLabel = document.querySelector('input[name="support"]:checked')?.nextElementSibling?.querySelector('h4')?.innerText || '—';
  const totalEl = document.getElementById('result').querySelector('strong');
  const total = totalEl ? totalEl.innerText.match(/\d+/)?.[0] : '0';

  const message = `🎯 *ЗАЯВКА НА СМЕТУ*\n\n`;
  message += `🔹 Тип сайта: ${siteTypeLabel}\n`;
  message += `🔍 SEO: ${seoLabel}\n`;
  message += `🛠 Поддержка: ${supportLabel}\n`;
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
  document.getElementById('galleryModal').style.display = 'flex';
}

function closeGallery() {
  document.getElementById('galleryModal').style.display = 'none';
}

// Мобильное меню
function toggleMenu() {
  document.getElementById("mainNav").classList.toggle("active");
}

// Слайдер портфолио
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.portfolio-slider .slide');
const dotsContainer = document.getElementById('sliderDots');

function initSlider() {
  if (!dotsContainer || slides.length === 0) return;
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function nextSlide() {
  if (slides.length === 0) return;
  slides[currentSlideIndex].classList.remove('active');
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  slides[currentSlideIndex].classList.add('active');
  updateDots();
}

function prevSlide() {
  if (slides.length === 0) return;
  slides[currentSlideIndex].classList.remove('active');
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  slides[currentSlideIndex].classList.add('active');
  updateDots();
}

function goToSlide(index) {
  if (slides.length === 0) return;
  slides[currentSlideIndex].classList.remove('active');
  currentSlideIndex = index;
  slides[currentSlideIndex].classList.add('active');
  updateDots();
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlideIndex);
  });
}

// Форма — после отправки показываем кнопки
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

  // Сбрасываем форму
  this.reset();

  // Скрываем форму
  const form = document.getElementById('contactForm');
  form.style.display = 'none';

  // Создаем блок с кнопками
  const buttonsDiv = document.createElement('div');
  buttonsDiv.id = 'contact-buttons';
  buttonsDiv.innerHTML = `
    <p style="color: #94a3b8; font-size: 0.9rem; text-align: center; margin: 20px 0;">
      Спасибо за заявку! Выберите, как хотите связаться:
    </p>
    <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
      <button onclick="openTelegramWithMessage('${name}', '${phone}', '${email}')" class="btn primary large">💬 Написать в Telegram</button>
      <button onclick="openEmail()" class="btn secondary large">📧 Написать на почту</button>
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <button onclick="resetContactForm()" class="btn secondary">Назад</button>
    </div>
  `;

  // Вставляем после формы
  form.parentNode.insertBefore(buttonsDiv, form.nextSibling);
});

// Открытие Telegram с сообщением
function openTelegramWithMessage(name, phone, email) {
  const message = `📩 *НОВАЯ ЗАЯВКА*\n\n`;
  message += `👤 Имя: ${name}\n`;
  message += `📞 Телефон: ${phone}\n`;
  message += `📧 Email: ${email}\n`;
  message += `—\nГотов к диалогу!`;

  const encoded = encodeURIComponent(message);
  window.open(`https://t.me/overgrand?text=${encoded}`, '_blank');
}

// Открытие почты
function openEmail() {
  window.open("mailto:rosanov.danila2016@yandex.ru", '_blank');
}

// Сброс формы
function resetContactForm() {
  const form = document.getElementById('contactForm');
  const buttons = document.getElementById('contact-buttons');
  if (buttons) buttons.remove();
  form.style.display = 'block';
  form.reset();
}

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  showStep(1);
  updateTotal();
  initSlider();
});
