import { gsap } from "../node_modules/gsap/index.js";

// ✅ Animación de entrada en la sección Hero
document.addEventListener('DOMContentLoaded', () => {
    gsap.from('.hero h1', {
        opacity: 0,
        y: -50, // Desplazamiento hacia arriba
        duration: 1, // Duración de la animación en segundos
        ease: 'power2.out'
    });

    gsap.from('.hero p', {
        opacity: 0,
        y: 20, // Desplazamiento hacia abajo
        duration: 1,
        delay: 0.3, // Retraso después del h1
        ease: 'power2.out'
    });

    gsap.from('.hero .cta-btn', {
        opacity: 0,
        scale: 0.5, // Efecto de escala
        duration: 0.5,
        delay: 0.6, // Retraso después del párrafo
        ease: 'back.out(1.7)'
    });
});