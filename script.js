// Mark JS as available (enables scroll-reveal styles)
document.documentElement.classList.add('js');

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const links = navLinks.querySelectorAll('a');

/* ---------- Mobile menu ---------- */
function closeMenu() {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
    const open = menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
});

links.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

/* ---------- Navbar + back-to-top on scroll ---------- */
function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
    // Small stagger for sibling cards
    el.style.transitionDelay = `${(i % 5) * 70}ms`;
    revealObserver.observe(el);
});

/* ---------- Active nav link highlight ---------- */
const sections = document.querySelectorAll('main section[id], header[id]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ---------- Typing effect ---------- */
const roles = ['Data Analyst', 'Python & SQL Developer', 'BCom Accounting Graduate'];
const typedEl = document.getElementById('typed');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typedEl && !reduceMotion) {
    let role = 0, char = roles[0].length, deleting = true;

    function type() {
        const word = roles[role];
        typedEl.textContent = word.slice(0, char);

        let delay = deleting ? 45 : 90;

        if (!deleting && char === word.length) {
            deleting = true;
            delay = 1800;
        } else if (deleting && char === 0) {
            deleting = false;
            role = (role + 1) % roles.length;
            delay = 350;
        } else {
            char += deleting ? -1 : 1;
        }
        setTimeout(type, delay);
    }
    setTimeout(type, 1800);
} else if (typedEl) {
    typedEl.textContent = roles.join(' | ');
}
