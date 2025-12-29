/**
 * TARASOV.PRO — Core Engine
 * Интерактивная логика для Cyber-Luxury интерфейса
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Плавное появление (Reveal) для всех секций
  // Это критически важная часть: она убирает невидимость элементов
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Добавляем класс видимости
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // 2. Интеллектуальный 3D-Tilt для карточек товаров
  const pCards = document.querySelectorAll('.p-card');
  pCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10; // Наклон по вертикали
      const rotateY = ((x - centerX) / centerX) * 10;  // Наклон по горизонтали

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'; // Сброс наклона
    });
  });

  // 3. Кастомное свечение (Glow) курсора
  const cursor = document.getElementById('cursor');
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('pointermove', (e) => {
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; // Движение свечения за мышью
      }
    }, { passive: true });
  }

  // 4. Индикатор прогресса чтения
  const progressBar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight); // Расчет процента скролла
    if (progressBar) {
      progressBar.style.width = (scrolled * 100) + '%';
    }
  }, { passive: true });

  // 5. Мобильное меню (Бургер)
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isFlex = nav.style.display === 'flex';
      nav.style.display = isFlex ? 'none' : 'flex'; // Переключение видимости меню
      nav.classList.toggle('active');
    });
  }

  // 6. Плавный скролл по якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Закрываем мобильное меню после перехода
        if (window.innerWidth < 860 && nav) nav.style.display = 'none';
      }
    });
  });
});