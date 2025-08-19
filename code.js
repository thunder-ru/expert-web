// Прокрутка к секции
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Открытие Telegram
function openTelegram() {
  window.open("https://t.me/overgrand", '_blank');
}

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
      "https://i.postimg.cc/tR8BKPyZ/Blakc2.jpg",
      "https://i.postimg.cc/pdkWMT84/Black1.jpg"
    ]
  },
  tea: {
    title: "Онлайн магазин чая и кофе",
    desc: "Интернет-магазин с каталогом и корзиной.",
    result: "Окупился за 6 недель",
    images: [
      "https://i.postimg.cc/PrmQ0R29/Black3.jpg",
      "https://i.postimg.cc/0yndyJgC/Black4.jpg"
    ]
  },
  bike: {
    title: "Магазин велосипедов",
    desc: "Сайт с каталогом, фильтрами и оплатой.",
    result: "+90% трафика и 200+ заказов в месяц",
    images: [
      "https://i.postimg.cc/0yndyJgC/Black4.jpg",
      "https://i.postimg.cc/HnbbDr4X/Black-5.jpg"
    ]
  },
  fitness: {
    title: "Фитнес-тренер",
    desc: "Сайт для персонального тренера с записью на тренировки.",
    result: "30+ новых клиентов за месяц",
    images: [
      "https://i.postimg.cc/HnbbDr4X/Black-5.jpg",
      "https://i.postimg.cc/pdkWMT84/Black1.jpg"
    ]
  },
  travel: {
    title: "Турагентство \"Горизонт\"",
    desc: "Сайт для бронирования туров с фильтрами и онлайн-оплатой.",
    result: "Удобное бронирование туров онлайн",
    images: [
      "https://i.postimg.cc/pdkWMT84/Black1.jpg",
      "https://i.postimg.cc/tR8BKPyZ/Blakc2.jpg",
      "https://i.postimg.cc/PrmQ0R29/Black3.jpg"
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

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  showSlide(0); // Запускаем слайдер
});
