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

  // Базовая цена
  const basePrice = parseFloat(document.getElementById("siteType").value) || 0;
  total += basePrice;

  // Дизайн
  total += parseFloat(document.getElementById("design").value) || 0;

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

// Динамические опции в калькуляторе
function updateCalculator() {
  const type = document.getElementById("siteType").value;
  const optionsDiv = document.getElementById("dynamicOptions");
  optionsDiv.innerHTML = '';

  const options = {
    landing: {
      title: "Лендинг",
      base: 20000,
      features: [
        { text: "Одна страница", price: 0 },
        { text: "Форма заявки", price: 2000 },
        { text: "Онлайн-чат", price: 3000 },
        { text: "Анимации", price: 5000 },
        { text: "Интеграция с CRM", price: 15000 }
      ]
    },
    visiting: {
      title: "Сайт-визитка",
      base: 15000,
      features: [
        { text: "3–5 страниц", price: 0 },
        { text: "Форма", price: 2000 },
        { text: "Чат", price: 3000 },
        { text: "SEO", price: 5000 },
        { text: "Фотогалерея", price: 8000 }
      ]
    },
    corporate: {
      title: "Корпоративный сайт",
      base: 30000,
      features: [
        { text: "5–10 страниц", price: 0 },
        { text: "Блог", price: 5000 },
        { text: "Чат", price: 3000 },
        { text: "SEO", price: 15000 },
        { text: "CRM", price: 15000 }
      ]
    },
    shop: {
      title: "Интернет-магазин",
      base: 45000,
      features: [
        { text: "Каталог", price: 0 },
        { text: "Корзина", price: 10000 },
        { text: "Оплата", price: 10000 },
        { text: "Личный кабинет", price: 12000 },
        { text: "CRM", price: 15000 }
      ]
    }
  };

  if (type && options[type]) {
    const data = options[type];
    optionsDiv.innerHTML = `
      <p><strong>Что входит:</strong></p>
      <div class="checkbox-group">
        ${data.features.map(f => `
          <label>
            <input type="checkbox" value="${f.price}" onchange="calculate()">
            ${f.text} ${f.price > 0 ? `(+${f.price.toLocaleString()} ₽)` : ''}
          </label>
        `).join('')}
      </div>
    `;
  }

  calculate();
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
const galleryData = {
  auto: {
    title: "Аренда автомобилей",
    desc: "Сайт для аренды автомобилей с онлайн-бронированием.",
    result: "+110% заявок за 2 месяца",
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
    result: "ТОП-3 в Яндекс по ключевым запросам",
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
    result: "Окупился за 6 недель",
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
    result: "+90% трафика и 200+ заказов в месяц",
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
    title: "Персональный тренер",
    desc: "Лендинг с формой записи и видео.",
    result: "30+ новых клиентов за месяц",
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
    desc: "Сайт с удобным бронированием туров.",
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
  document.getElementById('projectTitle').innerText = data.title;
  document.getElementById('projectDesc').innerText = data.desc;
  document.getElementById('projectResult').innerText = data.result;

  const galleryGrid = document.getElementById('galleryGrid');
  galleryGrid.innerHTML = ''; // Очистка

  data.images.forEach(imgUrl => {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = 'Проект';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
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

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  updateCalculator(); // Инициализация калькулятора
  showSlide(0); // Первый слайд
});
