// Navigation mobile
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Ferme le menu lorsqu'on clique sur un lien
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });

  // Ferme le menu avec la touche Échap
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      mainNav.classList.remove('open');
    }
  });
}

// Scroll fluide pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    const headerOffset = 72;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Année dynamique dans le footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Formulaire de contact (fake submit côté front)
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const organization = (formData.get('organization') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    const emailValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);

    if (!name || !emailValid || !message) {
      formFeedback.textContent = "Merci de renseigner un nom, un email valide et un message.";
      formFeedback.style.color = '#ef4444';
      return;
    }

    const subject = encodeURIComponent(`Contact Dog Therhappy - ${name}`);
    const bodyLines = [
      `Nom: ${name}`,
      `Email: ${email}`,
      organization ? `Organisation: ${organization}` : '',
      '',
      'Message:',
      message
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join('\\n'));
    window.location.href = `mailto:dogtherhappy@gmail.com?subject=${subject}&body=${body}`;

    formFeedback.textContent =
      "Merci ! Votre application mail va s'ouvrir avec votre message pré-rempli.";
    formFeedback.style.color = '#0ca678';
  });
}

// Petits toasts "Bientôt en ligne" pour les boutons [data-soon]
document.querySelectorAll('[data-soon]').forEach(button => {
  button.addEventListener('click', () => {
    alert("Cette section sera disponible prochainement. Restez connecté·e !");
  });
});

// Bouton retour haut de page
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.setAttribute('aria-label', 'Remonter en haut de la page');
Object.assign(backToTop.style, {
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  border: 'none',
  background: 'linear-gradient(135deg, #047ccc, #0ea5e9)',
  color: '#fff',
  boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
  cursor: 'pointer',
  opacity: '0',
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  zIndex: '999'
});
document.body.appendChild(backToTop);

const toggleBackToTop = () => {
  if (window.scrollY > 400) {
    backToTop.style.opacity = '1';
    backToTop.style.pointerEvents = 'auto';
    backToTop.style.transform = 'translateY(0)';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
    backToTop.style.transform = 'translateY(12px)';
  }
};

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

toggleBackToTop();
window.addEventListener('scroll', toggleBackToTop);

// Scroll spy (active link) pour la navigation
const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
const sections = navLinks
  .map(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    return el ? { link, section: el } : null;
  })
  .filter(Boolean);

if (sections.length) {
  let ticking = false;

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120; // header offset
    let current = sections[0].link;

    for (const { link, section } of sections) {
      if (section.offsetTop <= scrollPos) {
        current = link;
      }
    }

    navLinks.forEach(l => l.classList.toggle('active', l === current));
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(setActiveLink);
      ticking = true;
    }
  });

  // init state
  setActiveLink();
}
