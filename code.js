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
  document.getElementById(`step${n}`).classList.add('active');
}

// Проверка выбора и переход
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
  const steps = ['step1', 'step2', 'step3', 'step4'];
  for (let i = 1; i < 4; i++) {
    if (document.getElementById(`step${i}`).classList.contains('active')) {
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
  if (siteType) total += parseFloat(siteType.value);
  const design = document.querySelector('input[name="design"]:checked');
  if (design) total += parseFloat(design.value);
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
    total += parseFloat(cb.value);
  });
  const seo = document.querySelector('input[name="seo"]:checked');
  if (seo) total += parseFloat(seo.value);
  const support = document.querySelector('input[name="support"]:checked');
  if (support) total += parseFloat(support.value);
  document.getElementById('result').innerHTML = `
    <strong>Примерная стоимость: ${total.toLocaleString()} ₽</strong><br>
    <small style="color: #94a3b8;">Точная цена будет после анализа вашего бизнеса</small>
  `;
}

// Получить точную смету — отправка в Telegram с деталями
function requestQuote() {
  const siteType = document.querySelector('input[name="siteType"]:checked');
  const design = document.querySelector('input[name="design"]:checked');
  const seo = document.querySelector('input[name="seo"]:checked');
  const support = document.querySelector('input[name="support"]:checked');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  const siteTypeLabel = siteType ? siteType.nextElementSibling.querySelector('h4').innerText : 'Не выбрано';
  const designLabel = design ? design.nextElementSibling.querySelector('h4').innerText : 'Не выбрано';
  const seoLabel = seo ? seo.value > 0 ? 'SEO (+6 000 ₽)' : 'Без SEO' : '—';
  const supportLabel = support ? support.nextElementSibling.querySelector('h4').innerText : '—';

  let extras = [];
  checkboxes.forEach(cb => {
    extras.push(cb.nextElementSibling.textContent.trim());
  });

  const total = document.getElementById('result').innerText;

  let message = `🎯 *Заявка на смету через калькулятор*\n\n`;
  message += `🔹 Тип сайта: *${siteTypeLabel}*\n`;
  message += `🎨 Дизайн: *${designLabel}*\n`;
  message += `🔍 SEO: *${seoLabel}*\n`;
  message += `🛠 Поддержка: *${supportLabel}*\n`;
  if (extras.length > 0) message += `✨ Допы: ${extras.join(', ')}\n`;
  message += `\n${total}\n`;
  message += `—\nСвяжитесь со мной, чтобы обсудить детали!`;

  const encodedMessage = encodeURIComponent(message);
  const telegramUrl = `https://t.me/overgrand?text=${encodedMessage}`;
  window.open(telegramUrl, '_blank');
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

// Мобильное меню — улучшенная версия
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("active");
}

// Форма — улучшенная версия с валидацией и состоянием
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const submitBtn = this.querySelector('button[type="submit"]');

  // Валидация
  if (!name || !phone || !email) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return;
  }

  if (!/^\+?[\d\-\s\(\)]{10,}$/.test(phone)) {
    alert('Введите корректный номер телефона (например, +7 999 123-45-67).');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Введите корректный email.');
    return;
  }

  // Подготовка сообщения
  const text = `📩 *Новая заявка с сайта*\n\n`;
  text += `👤 Имя: ${name}\n`;
  text += `📞 Телефон: ${phone}\n`;
  text += `📧 Email: ${email}\n`;
  text += `💬 Сообщение: ${message || 'не указано'}`;

  const url = `https://t.me/overgrand?text=${encodeURIComponent(text)}`;

  // Меняем состояние кнопки
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '✅ Отправлено!';
  submitBtn.disabled = true;

  setTimeout(() => {
    window.open(url, '_blank');
    setTimeout(() => {
      document.getElementById('contactForm').reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1000);
  }, 1000);
});

// Инициализация
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("mainNav");

  // Закрытие меню при клике на ссылку
  nav.addEventListener("click", function(e) {
    if (e.target.tagName === "A" && nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  });

  showStep(1);
  updateTotal();
});
