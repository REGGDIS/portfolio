const contactForm = document.querySelector(".contact-form");
const successMessage = document.querySelector(".form-success");
const formNote = document.querySelector(".form-note");

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

// ✅ Animación de la sección Contacto
gsap.from("#contact h2", {
    opacity: 0,
    y: 40,
    duration: 1,
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from("#contact p", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from("#contact .contact-form input, #contact .contact-form textarea, #contact .contact-form button", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.4,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#contact .contact-form",
        start: "top 85%",
        toggleActions: "play none none none"
    }
});

gsap.from("#contact .contact-links a", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.6,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#contact .contact-links",
        start: "top 90%",
        toggleActions: "play none none none"
    }
});

// ✅ Lógica del formulario de contacto
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // evita recarga

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                // Oculta el formulario y el mensaje previo
                gsap.to([contactForm, formNote], {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => {
                        contactForm.style.display = "none";
                        formNote.style.display = "none";

                        // Muestra el mensaje de éxito
                        successMessage.style.display = "block";
                        gsap.fromTo(successMessage, {
                            opacity: 0,
                            y: 30
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out"
                        });
                    }
                });
            } else {
                alert("Hubo un error. Intenta nuevamente.");
            }
        }).catch(() => {
            alert("No se pudo enviar el formulario. Intenta más tarde.");
        });
    });
}
