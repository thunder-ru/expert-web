// Тема: Light / Dark Mode
const htmlRoot = document.getElementById('html-root');
const themeToggle = document.getElementById('theme-toggle');

// Проверяем сохранённую тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlRoot.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Переключение темы
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlRoot.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlRoot.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Мобильное меню
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Плавный скролл + активный пункт меню
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-list a');

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Фильтрация портфолио
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

window.addEventListener('load', () => {
  portfolioItems.forEach(item => {
    item.style.display = 'block';
    item.classList.add('loaded');
  });
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => item.classList.add('loaded'), 50);
      } else {
        item.style.display = 'none';
        item.classList.remove('loaded');
      }
    });
  });
});

// Улучшенная анимация прокрутки (scroll reveal)
const animateOnScroll = () => {
  document.querySelectorAll('.about, .portfolio, .how-to-order, .testimonials, .contact').forEach(el => {
    const pos = el.getBoundingClientRect().top;
    const delay = el.dataset.delay || 0;
    
    if (pos < window.innerHeight - 100 && !el.classList.contains('animated')) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
      el.style.transition = `all 0.8s ease ${delay}s`;
      
      setTimeout(() => {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        el.classList.add('animated');
      }, 100 + (delay * 1000));
    }
  });
};

// Добавим delay для эффекта "поочерёдного появления"
document.querySelector('.how-to-order').dataset.delay = 0.1;
document.querySelector('.testimonials').dataset.delay = 0.2;
document.querySelector('.contact').dataset.delay = 0.3;

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Форма
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('✅ Спасибо! Я свяжусь с тобой в течение 24 часов.');
  e.target.reset();
});
