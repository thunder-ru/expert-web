// Плавная прокрутка
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Мобильное меню
function toggleMenu() {
  document.querySelector('.nav').classList.toggle('active');
}

// Анимации при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .about-text, .portfolio-grid, #contactForm').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// EmailJS
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // ← Заменить на реальный ключ

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('default_service', 'template_contact', this)
      .then(() => {
        form.reset();
        document.getElementById('successMessage').classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('successMessage').classList.add('hidden');
        }, 5000);
      }, (err) => {
        alert('Ошибка: ' + JSON.stringify(err));
      });
  });
})();
