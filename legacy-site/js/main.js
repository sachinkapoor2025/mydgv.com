document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = document.getElementById('submitBtn');

  // Highlight active nav link on multi-page site
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    const linkPage = href.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && linkPage === 'index.html') {
      link.classList.add('active');
    }
  });

  // Single-page scroll spy (if sections exist)
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 100) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formMessage.className = 'form-message';
      formMessage.style.display = 'none';

      const payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      const apiUrl = form.dataset.apiUrl;

      try {
        if (apiUrl) {
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (res.ok && data.success) {
            formMessage.textContent = data.message;
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            form.reset();
          } else {
            throw new Error(data.error || 'Failed to send');
          }
        } else {
          const res = await fetch('https://formsubmit.co/ajax/dgv@mydgv.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              subject: payload.subject,
              message: payload.message,
              _subject: '[mydgv.com] ' + payload.subject
            })
          });
          const data = await res.json();
          if (data.success === 'true' || data.success === true) {
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            form.reset();
          } else {
            throw new Error('Failed to send');
          }
        }
      } catch (err) {
        formMessage.textContent = 'Unable to send message. Please email us directly at dgv@mydgv.com';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  }
});
