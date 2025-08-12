// ============================
// Helpers & configuración
// ============================

// Tema: respeta preferencia del usuario y permite toggle
(function themeSetup() {
    const root = document.documentElement; // Obtiene el elemento raíz HTML
    const saved = localStorage.getItem('theme'); // Busca tema guardado

    if (saved) {
        root.className = saved; // Aplica tema guardado (dark o light)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark'); // Si no hay tema guardado, usa prederencia del sistema (oscuro)
    } else {
        root.classList.add('light'); // Por defecto usa tema claro
    }
    // Configuración del botón de alternancia
    const btn = document.getElementById('themeBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            // Determina el tema opuesto al actual
            const next = root.classList.contains('dark') ? 'light' : 'dark';

            // Limpia clases y aplica la nueva
            root.classList.remove('dark', 'light');
            root.classList.add(next);

            // Guarda la prederencia
            localStorage.setItem('theme', next);
        });
    }
})();

// Flags para animaciones
const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; // Si el usuario prefiere menos movimiento
// Verifica si GSAP y ScrollTrigger están disponibles
const hasGSAP = typeof gsap !== 'undefined';
const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
// Registra ScrollTrigger si está disponible
if (hasGSAP && hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

// Utilidad: revelar elementos al entrar en viewport (fallback si no hay GSAP)
function setupIntersectionReveal() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                // quitar visibilidad oculta si viene del CSS
                e.target.style.visibility = 'visible';
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .project-card').forEach(el => {
        // aseguramos estadio inicial sólo si no hay GSAP o si reduce motion
        if (!hasGSAP || reducedMotion) {
            el.classList.add('reveal');
            el.style.visibility = 'hidden';
            io.observe(el);
        }
    });
}

// ============================
// Animaciones (GSAP o fallback)
// ============================
(function animations() {
    if (reducedMotion) {
        setupIntersectionReveal();
        return; // No animaciones si el usuario prefiere menos movimiento
    }

    if (hasGSAP) {
        // HERO
        if (document.querySelector('.hero h1')) {
            gsap.from('.hero h1', {
                opacity: 0, y: -50, duration: 1, ease: 'power2.out',
                scrollTrigger: hasScrollTrigger ? {
                    trigger: '.hero h1', start: 'top 80%', toggleActions: 'play none none none'
                } : undefined
            });
        }
        if (document.querySelector('.hero p')) {
            gsap.from('.hero p', {
                opacity: 0, y: 20, duration: 1, delay: 0.3, ease: 'power2.out',
                scrollTrigger: hasScrollTrigger ? {
                    trigger: '.hero p', start: 'top 80%', toggleActions: 'play none none none'
                } : undefined
            });
        }
        if (document.querySelector('.hero .cta-btn')) {
            gsap.from('.hero .cta-btn', {
                opacity: 0, scale: 0.5, duration: 0.5, delay: 0.6, ease: 'back.out(1.7)',
                scrollTrigger: hasScrollTrigger ? {
                    trigger: '.hero .cta-btn', start: 'top 80%', toggleActions: 'play none none none'
                } : undefined
            });
        }
        if (document.querySelector('.hero-illustration')) {
            gsap.from('.hero-illustration', {
                opacity: 0, y: 50, duration: 1, delay: 0.8, ease: 'power2.out',
                scrollTrigger: hasScrollTrigger ? {
                    trigger: '.hero-illustration', start: 'top 90%', toggleActions: 'play none none none'
                } : undefined
            });
        }

        // PROYECTOS (cards)
        document.querySelectorAll('.project-card').forEach((card, index) => {
            gsap.fromTo(card,
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1, y: 0, duration: 1, delay: index * 0.2, ease: 'power2.out',
                    scrollTrigger: hasScrollTrigger ? {
                        trigger: card, start: 'top 80%', toggleActions: 'play none none none',
                        once: true
                    } : undefined
                }
            );
        });

        // ABOUT
        if (document.querySelector('#about .about-image img')) {
            gsap.from("#about .about-image img", {
                opacity: 0, scale: 0.8, duration: 1, delay: 0.2, ease: "power2.out",
                scrollTrigger: hasScrollTrigger ? {
                    trigger: "#about", start: "top 80%", toggleActions: "play none none none"
                } : undefined
            });
        }
        if (document.querySelector('#about .about-content')) {
            gsap.from("#about .about-content", {
                opacity: 0, x: 100, duration: 1, ease: "power2.out",
                scrollTrigger: hasScrollTrigger ? {
                    trigger: "#about", start: "top 80%", toggleActions: "play none none none"
                } : undefined
            });
        }

        // CONTACTO
        if (document.querySelector('#contact')) {
            gsap.from("#contact h2", {
                opacity: 0, y: 40, duration: 1,
                scrollTrigger: hasScrollTrigger ? {
                    trigger: "#contact", start: "top 80%", toggleActions: "play none none none"
                } : undefined
            });
            gsap.from("#contact p", {
                opacity: 0, y: 20, duration: 1, delay: 0.2, ease: "power2.out",
                scrollTrigger: hasScrollTrigger ? {
                    trigger: "#contact", start: "top 80%", toggleActions: "play none none none"
                } : undefined
            });
            gsap.from("#contact .contact-form input, #contact .contact-form textarea, #contact .contact-form button", {
                opacity: 0, y: 30, duration: 1, delay: 0.4, stagger: 0.2, ease: "power2.out",
                scrollTrigger: hasScrollTrigger ? {
                    trigger: "#contact .contact-form", start: "top 85%", toggleActions: "play none none none"
                } : undefined
            });
            gsap.from("#contact .contact-links a", {
                opacity: 0, y: 20, duration: 0.8, stagger: 0.2, delay: 0.6, ease: "power2.out",
                scrollTrigger: hasScrollTrigger ? {
                    trigger: "#contact .contact-links", start: "top 90%", toggleActions: "play none none none"
                } : undefined
            });
        }
    } else {
        // Fallback sin GSAP
        setupIntersectionReveal();
    }
})();

// ============================
// Filtros de proyectos
// ============================
(function filters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    if (!buttons.length || !cards.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.toggle('active', b === btn));
            const tech = btn.dataset.tech;
            cards.forEach(card => {
                const tags = (card.dataset.tech || '').toLowerCase();
                card.style.display = (tech === 'all' || tags.includes(tech)) ? '' : 'none';
            });
        });
    });
})();

// ============================
// Formulario de contacto
// ============================
(function contact() {
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.querySelector('.form-success');
    const formNote = document.querySelector('.form-note');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            });
            if (!res.ok) throw new Error('Formspree error');
            // Con GSAP -> animado; sin GSAP -> directo
            if (hasGSAP) {
                gsap.to([contactForm, formNote], {
                    opacity: 0, y: -20, duration: 0.5, onComplete: () => {
                        if (formNote) formNote.style.display = 'none';
                        contactForm.style.display = 'none';
                        if (successMessage) {
                            successMessage.style.display = 'block';
                            gsap.fromTo(successMessage, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
                        }
                    }
                });
            } else {
                if (formNote) formNote.style.display = 'none';
                contactForm.style.display = 'none';
                if (successMessage) successMessage.style.display = 'block';
            }
            contactForm.reset();
        } catch {
            alert('No se pudo enviar el formulario. Intenta más tarde.');
        }
    });
})();

// ============================
// PWA: registrar Service Worker
// ============================
(function pwa() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => { });
    }
})();