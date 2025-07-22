// ✅ Registrar ScrollTrigger si está disponible
if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ✅ Animación de entrada en la sección Hero
gsap.from('.hero h1', {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.hero h1',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

gsap.from('.hero p', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.hero p',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

gsap.from('.hero .cta-btn', {
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    delay: 0.6,
    ease: 'back.out(1.7)',
    scrollTrigger: {
        trigger: '.hero .cta-btn',
        start: 'top 80%',
        toggleActions: 'play none none none'
    }
});

gsap.from('.hero-illustration', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.hero-illustration',
        start: 'top 90%',
        toggleActions: 'play none none none'
    }
});

// ✅ Animación de entrada en las tarjetas de Proyectos
document.querySelectorAll('.project-card').forEach((card, index) => {
    gsap.fromTo(
        card,
        {
            autoAlpha: 0, // ✅ Oculta y controla opacity + visibility
            y: 50
        },
        {
            autoAlpha: 1, // ✅ Aparece suavemente
            y: 0,
            duration: 1,
            delay: index * 0.2, // ✅ Efecto en cascada
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            }
        }
    );
});

// ✅ Animación de la sección Sobre mí
gsap.from("#about .about-image img", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from("#about .about-content", {
    opacity: 0,
    x: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

