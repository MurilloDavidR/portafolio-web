// ================================================
// script.js — Portafolio de David
// ================================================
// Este archivo se carga al final del HTML, por eso
// puede acceder a todos los elementos de la página
// sin esperar a que carguen.
 
 
// ── 1. CONFIRMAR QUE EL JS ESTÁ ACTIVO
// Esto aparece en la consola del navegador (F12)
console.log("Portafolio activo ✓");
 
 
// ── 2. INICIALIZAR AOS (animaciones al hacer scroll)
// duration: cuántos milisegundos dura cada animación
// once: true → la animación ocurre solo la primera vez
AOS.init({
    duration: 1000,
    once: true
});
 
 
// ── 3. NAVBAR: oscurecer al bajar la página
// document.querySelector busca el primer elemento
// con la clase .navbar en el HTML
const navbar = document.querySelector(".navbar");
 
// window.addEventListener("scroll") ejecuta la función
// cada vez que el usuario hace scroll
window.addEventListener("scroll", () => {
 
    // window.scrollY = cuántos píxeles bajó el usuario
    if (window.scrollY > 50) {
        // Si bajó más de 50px → navbar más oscuro
        navbar.style.background = "rgba(0,0,0,0.95)";
    } else {
        // Si está arriba del todo → navbar semitransparente
        navbar.style.background = "rgba(0,0,0,0.7)";
    }
});
 
 
// ── 4. NAV ACTIVO: marcar el link de la sección visible
// Selecciona todas las secciones y el footer
const sections = document.querySelectorAll("section, footer");
// Selecciona todos los links del nav
const navLinks = document.querySelectorAll(".nav-links a");
 
// IntersectionObserver detecta qué elemento está
// visible en pantalla en este momento
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
 
        // entry.isIntersecting = true si la sección
        // está visible en la pantalla ahora mismo
        if (entry.isIntersecting) {
            const id = entry.target.id; // ej: "proyectos"
 
            // Recorre todos los links del nav
            navLinks.forEach(link => {
                // Si el href del link coincide con la sección
                // visible, agrega la clase "active"
                // (en el CSS esa clase lo subraya en azul)
                const isActive = link.getAttribute("href") === `#${id}`;
                link.classList.toggle("active", isActive);
            });
        }
    });
}, {
    threshold: 0.4  // la sección debe estar 40% visible
});
 
// Le decimos al observer que vigile cada sección
sections.forEach(section => sectionObserver.observe(section));
 
 
// ── 5. TYPING EFFECT en el hero
// Busca el elemento con clase .hero-subtitle
const typingTarget = document.querySelector(".hero-subtitle");
 
if (typingTarget) {
    // Guarda el texto original y lo borra del HTML
    const fullText = typingTarget.textContent.trim();
    typingTarget.textContent = "";
 
    // Agrega el cursor tipo | al costado derecho
    typingTarget.style.borderRight = "2px solid #0A45CC";
    typingTarget.style.paddingRight = "4px";
 
    let charIndex = 0; // contador de caracteres escritos
 
    // Función recursiva: se llama a sí misma cada 60ms
    function typeNextChar() {
        if (charIndex < fullText.length) {
            // Agrega el siguiente carácter al texto visible
            typingTarget.textContent += fullText[charIndex];
            charIndex++;
            // Se llama a sí misma después de 60ms
            setTimeout(typeNextChar, 60);
        } else {
            // Cuando termina de escribir, quita el cursor
            // después de 800ms
            setTimeout(() => {
                typingTarget.style.borderRight = "none";
                typingTarget.style.paddingRight = "0";
            }, 800);
        }
    }
 
    // Arranca el efecto
    typeNextChar();
}
 
 
// ── 6. PROYECTOS: aparecer en cascada al hacer scroll
// Selecciona todos los bloques de proyecto
const projectEntries = document.querySelectorAll(".project-entry");
 
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
 
            // Extrae el número del id: "proj-1" → 1
            const num = parseInt(entry.target.id.split("-")[1]);
 
            // Retraso escalonado: proj-1 = 180ms,
            // proj-2 = 360ms, proj-3 = 540ms
            const delay = num * 180;
 
            setTimeout(() => {
                // Agregar .visible activa la transición del CSS
                // (opacity 0 → 1, translateY 10px → 0)
                entry.target.classList.add("visible");
            }, delay);
 
            // Deja de observar este proyecto (ya apareció)
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
 
projectEntries.forEach(entry => projectObserver.observe(entry));
 
 
// ── 7. AÑO DINÁMICO en el footer
// Busca el elemento con id="year" en el HTML
const yearSpan = document.getElementById("year");
 
if (yearSpan) {
    // new Date().getFullYear() devuelve el año actual (ej: 2026)
    // Así no tienes que cambiarlo nunca manualmente
    yearSpan.textContent = new Date().getFullYear();
}