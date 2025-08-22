// Простая анимация появления при скролле
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.service-card, .portfolio-item, .step, .review');
  elements.forEach(el => {
    const position = el.getBoundingClientRect();
    if (position.top < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

// Установка начального стиля
document.querySelectorAll('.service-card, .portfolio-item, .step, .review').forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "0.6s ease";
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
