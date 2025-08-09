// Плавная прокрутка к секции
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Мобильное меню
function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
}

// Форма обратной связи через EmailJS
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // ← Замените на ваш EmailJS Public Key

  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'default_service';
    const templateID = 'template_contact';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        document.getElementById('contactForm').reset();
        document.getElementById('successMessage').classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('successMessage').classList.add('hidden');
        }, 5000);
      }, (err) => {
        alert('Ошибка отправки: ' + JSON.stringify(err));
      });
  });
})();
