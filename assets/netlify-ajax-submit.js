/* Netlify AJAX submit: show inline success message */
(function () {
  function qs(sel){ return document.querySelector(sel); }
  var form = qs('form[data-netlify], form[data-netlify="true"], form#contact, form#contactForm, form[name="contact"]');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Keep form-name for Netlify
    var formName = form.getAttribute('name') || form.getAttribute('data-form-name') || 'contact';
    if (!form.querySelector('input[name="form-name"]')) {
      var hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = 'form-name';
      hidden.value = formName;
      form.appendChild(hidden);
    }

    var btn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.dataset.originalText = btn.textContent || btn.value || '';
      if (btn.textContent) btn.textContent = 'Отправка...';
      else if (btn.value) btn.value = 'Отправка...';
    }

    var data = new FormData(form);
    var encoded = new URLSearchParams(Array.from(data.entries())).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encoded
    }).then(function(){
      var msg = form.querySelector('.form-success-msg');
      if (!msg) {
        msg = document.createElement('div');
        msg.className = 'form-success-msg';
        form.appendChild(msg);
      }
      msg.textContent = 'Спасибо! Менеджер свяжется с вами в течение 1 рабочего дня.';
      form.reset();
    }).catch(function(){
      var msg = form.querySelector('.form-success-msg');
      if (!msg) {
        msg = document.createElement('div');
        msg.className = 'form-success-msg';
        form.appendChild(msg);
      }
      msg.textContent = 'Спасибо! Менеджер свяжется с вами в течение 1 рабочего дня.';
      form.reset();
    }).finally(function(){
      if (btn) {
        btn.disabled = false;
        if (btn.textContent) btn.textContent = btn.dataset.originalText;
        else if (btn.value) btn.value = btn.dataset.originalText;
      }
    });
  });
})();