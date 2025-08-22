// Прокрутка
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Telegram
function openTelegram() {
  window.open("https://t.me/overgrand", '_blank');
}

// Калькулятор
function showStep(n) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  const step = document.getElementById(`step${n}`);
  if (step) step.classList.add('active');
  updateProgress();
}

function updateProgress() {
  const step = Array.from(document.querySelectorAll('.step')).findIndex(s => s.classList.contains('active')) + 1;
  document.getElementById('progressFill').style.width = `${(step / 4) * 100}%`;
}

function validateAndNext(current, next) {
  const inputs = {
    1: 'input[name="siteType"]:checked',
    2: 'input[name="design"]:checked',
    3: 'input[name="seo"]:checked',
    4: 'input[name="support"]:checked'
  };
  if (!document.querySelector(inputs[current])) {
    alert("Выберите вариант");
    return;
  }
  showStep(next);
  updateTotal();
}

function goBack() {
  for (let i = 2; i <= 4; i++) {
    if (document.getElementById(`step${i}`).classList.contains('active')) {
      showStep(i - 1);
      return;
    }
  }
  showStep(1);
}

function updateTotal() {
  let total = 0;
  ['siteType', 'design', 'seo', 'support'].forEach(name => {
    const input = document.querySelector(`input[name="${name}"]:checked`);
    if (input) total += parseFloat(input.value) || 0;
  });
  const resultEl = document.getElementById('result');
  if (resultEl) {
    resultEl.innerHTML = `<strong>Итого: ${total.toLocaleString()} ₽</strong>`;
  }
}

function openCalculator() {
  const modal = document.getElementById('calculatorModal');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 50);
  showStep(1);
  updateTotal();
}

function closeCalculator() {
  const modal = document.getElementById('calculatorModal');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

function requestQuote() {
  const url = `https://t.me/overgrand?text=Заявка+на+сайт:+${document.getElementById('result').innerText}`;
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
    result: "ТОП-5 в Яндекс по запросам",
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
    result: "+30% трафика и 20+ заказов",
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
    result: "12+ новых клиентов",
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
    desc: "Сайт для бронирования туров.",
    result: "Удобное бронирование",
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

// Открытие галереи
function openGallery(projectId) {
  const data = galleryData[projectId];
  if (!data) return;

  document.getElementById('projectTitle').innerText = data.title;
  document.getElementById('projectDesc').innerText = data.desc;
  document.getElementById('projectResult').innerText = data.result;

  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  data.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src.trim();
    img.alt = data.title;
    img.onerror = () => img.src = "https://via.placeholder.com/800x500/333/fff?text=Ошибка";
    grid.appendChild(img);
  });

  document.getElementById('galleryModal').style.display = 'flex';
  setTimeout(() => document.getElementById('galleryModal').classList.add('show'), 50);
}

function closeGallery() {
  const modal = document.getElementById('galleryModal');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

// Наведение
let hoverTimeout;
function openGalleryOnHover(id) {
  hoverTimeout = setTimeout(() => openGallery(id), 800);
}
function closeGalleryOnHover() {
  clearTimeout(hoverTimeout);
}

// Закрытие
document.addEventListener('keydown', e => e.key === 'Escape' && closeGallery());
document.getElementById('galleryModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeGallery();
});

// Меню
function toggleMenu() {
  document.getElementById("mainNav").classList.toggle("active");
}

// Форма
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !phone || !email) {
    alert('Заполните все поля');
    return;
  }
  alert('✅ Заявка отправлена!');
  this.reset();
});

// Слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('nextSlide');

function showSlide(n) {
  if (n >= slides.length) currentSlide = 0;
  if (n < 0) currentSlide = slides.length - 1;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

slides.forEach(slide => {
  slide.addEventListener('click', () => {
    const id = slide.getAttribute('data-id');
    openGallery(id);
  });
  slide.addEventListener('mouseenter', () => {
    const id = slide.getAttribute('data-id');
    openGalleryOnHover(id);
  });
  slide.addEventListener('mouseleave', closeGalleryOnHover);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide = i;
    showSlide(i);
  });
});

nextBtn?.addEventListener('click', () => {
  currentSlide++;
  showSlide(currentSlide);
});

prevBtn?.addEventListener('click', () => {
  currentSlide--;
  showSlide(currentSlide);
});

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
});
