// Прокрутка к секции
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// Открытие Telegram
function openTelegram() {
  window.open("https://t.me/overgrand", '_blank');
}

// Показать шаг калькулятора
function showStep(n) {
  const steps = document.querySelectorAll('.step');
  if (steps.length === 0) return;
  steps.forEach(step => step.classList.remove('active'));
  const target = document.getElementById(`step${n}`);
  if (target) target.classList.add('active');
}

// Проверка и переход
function validateAndNext(currentStep, nextStepNum) {
  let selected = false;

  if (currentStep === 1) {
    selected = document.querySelector('input[name="siteType"]:checked');
  } else if (currentStep === 2) {
    selected = document.querySelector('input[name="design"]:checked');
  } else if (currentStep === 3) {
    selected = true;
  } else if (currentStep === 4) {
    selected = document.querySelector('input[name="seo"]:checked') && 
               document.querySelector('input[name="support"]:checked');
  }

  if (!selected && currentStep !== 3) {
    alert("Пожалуйста, выберите вариант.");
    return;
  }

  showStep(nextStepNum);
  updateTotal();
}

// Назад
function goBack() {
  for (let i = 4; i >= 1; i--) {
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

  document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
    total += parseFloat(cb.value) || 0;
  });

  const seo = document.querySelector('input[name="seo"]:checked');
  if (seo) total += parseFloat(seo.value) || 0;

  const support = document.querySelector('input[name="support"]:checked');
  if (support) total += parseFloat(support.value) || 0;

  const resultEl = document.getElementById('result');
  if (resultEl) {
    resultEl.innerHTML = `
      <strong>Примерная стоимость: ${total.toLocaleString()} ₽</strong><br>
      <small style="color: #94a3b8;">Точная цена будет после анализа вашего бизнеса</small>
    `;
  }
}

// Получить точную смету
function requestQuote() {
  const resultEl = document.getElementById('result');
  const total = resultEl ? resultEl.innerText : 'неизвестно';

  const message = `🎯 *Заявка на смету*\n\nИтоговая сумма: *${total}*\n\nСвяжитесь со мной для уточнения деталей.`;
  const url = `https://t.me/overgrand?text=${encodeURIComponent(message)}`;
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
  const modal = document.getElementById('galleryModal');
  if (modal) modal.style.display = 'none';
}

// Мобильное меню
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  if (nav) nav.classList.toggle("active");
}

// Слайдер портфолио
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.portfolio-slider .slide');
const dotsContainer = document.getElementById('sliderDots');

function initSlider() {
  if (!dotsContainer || slides.length === 0) return;

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

// Форма — улучшенная версия
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !phone || !email) {
        alert('Заполните все обязательные поля.');
        return;
      }

      if (!/^\+?[\d\-\s\(\)]{10,}$/.test(phone)) {
        alert('Введите корректный номер телефона.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Введите корректный email.');
        return;
      }

      const message = `📩 *Новая заявка*\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}`;
      const url = `https://t.me/overgrand?text=${encodeURIComponent(message)}`;

      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ Отправлено!';
      btn.disabled = true;

      setTimeout(() => {
        window.open(url, '_blank');
        setTimeout(() => {
          form.reset();
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 1000);
      }, 1000);
    });
  }

  // Инициализация
  showStep(1);
  updateTotal();
  initSlider();
});
