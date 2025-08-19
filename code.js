// === Слайдер портфолио ===
let sliderIndex = 0;
const track = document.getElementById('sliderTrack');
const container = document.getElementById('sliderContainer');
const items = document.querySelectorAll('.slider-item');
const totalItems = items.length;

// Перемещение слайдера
function moveSlider(direction) {
  sliderIndex += direction;

  // Зацикливание
  if (sliderIndex < 0) {
    sliderIndex = totalItems - 1;
  } else if (sliderIndex >= totalItems) {
    sliderIndex = 0;
  }

  updateSlider();
}

// Обновление позиции слайдера
function updateSlider() {
  const itemWidth = 100; // 100% ширина слайда
  track.style.transform = `translateX(${-sliderIndex * itemWidth}%)`;
}

// Автопрокрутка каждые 7 секунд
let autoSlide = setInterval(() => {
  moveSlider(1);
}, 7000);

// Остановка автопрокрутки при наведении
container.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});
container.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    moveSlider(1);
  }, 7000);
});

// Листание мышкой (drag & drop)
let isDragging = false;
let startX, startScrollLeft;

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - container.offsetLeft;
  startScrollLeft = track.scrollLeft;
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = startScrollLeft - walk;
});

container.addEventListener('mouseup', () => {
  isDragging = false;
});

container.addEventListener('mouseleave', () => {
  isDragging = false;
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  track.style.transition = 'transform 0.6s ease';
  updateSlider();
});

// === Данные о проектах (галерея) ===
const projectData = {
  car_rental: {
    title: "Аренда автомобилей",
    images: [
      "https://t.me/overgrand"
    ]
  },
  dentistry: {
    title: "Стоматология",
    images: [
      "https://t.me/overgrand"
    ]
  },
  tea_coffee: {
    title: "Чайные и кофейные ритуалы",
    images: [
      "https://t.me/overgrand"
    ]
  },
  bike_rental: {
    title: "Прокат велосипедов",
    images: [
      "https://t.me/overgrand"
    ]
  },
  fitness: {
    title: "Фитнес-тренер",
    images: [
      "https://t.me/overgrand"
    ]
  },
  travel: {
    title: "Тур-агентство",
    images: [
      "https://t.me/overgrand"
    ]
  }
};

// Открытие модального окна с галереей
function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  document.getElementById('projectTitle').textContent = project.title;
  const container = document.getElementById('gallerySlides');
  container.innerHTML = '';

  project.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = project.title;
    img.className = 'gallery-img';
    img.loading = 'lazy';
    container.appendChild(img);
  });

  document.getElementById('projectModal').style.display = 'flex';
}

// Закрытие модального окна
function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}
