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
const projectEntries = document.querySelectorAll(".project-entry");

// En móvil el threshold alto puede hacer que nunca dispare
// porque el elemento ocupa casi toda la pantalla.
// Usamos 0.05 (solo necesita estar 5% visible) y un rootMargin
// generoso para que detecte antes de que entre completamente.
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const num = parseInt(entry.target.id.split("-")[1]);
            const delay = num * 180;

            setTimeout(() => {
                entry.target.classList.add("visible");
            }, delay);

            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05,         // solo necesita estar 5% visible
    rootMargin: "0px 0px -50px 0px"  // dispara 50px antes del borde inferior
});

projectEntries.forEach(entry => projectObserver.observe(entry));

// Seguro adicional: si el usuario ya está en la sección
// cuando carga la página (frecuente en móvil al recargar),
// hace visibles los proyectos directamente sin esperar scroll.
window.addEventListener("load", () => {
    projectEntries.forEach((entry, i) => {
        const rect = entry.getBoundingClientRect();
        // Si el elemento ya está en pantalla al cargar
        if (rect.top < window.innerHeight) {
            setTimeout(() => {
                entry.classList.add("visible");
            }, i * 180);
        }
    });
});


// ── 8. MODALES (certificado y diploma)
// abrirModal recibe el id del modal que debe mostrar
// Ejemplo: abrirModal('modalCertificado')
function abrirModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add("visible");
    // Bloquea el scroll de la página mientras el modal está abierto
    document.body.style.overflow = "hidden";
}

// cerrarModal recibe el id del modal que debe ocultar
function cerrarModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove("visible");
    // Restaura el scroll de la página
    document.body.style.overflow = "";
}

// Clic en el fondo oscuro → cierra ese modal
document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.addEventListener("click", (e) => {
        // Solo cierra si el clic fue en el fondo,
        // no dentro de la caja del modal
        if (e.target === modal) {
            cerrarModal(modal.id);
        }
    });
});

// Tecla Escape → cierra cualquier modal abierto
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.visible").forEach(modal => {
            cerrarModal(modal.id);
        });
    }
});
// Busca el elemento con id="year" en el HTML
const yearSpan = document.getElementById("year");

if (yearSpan) {
    // new Date().getFullYear() devuelve el año actual (ej: 2026)
    // Así no tienes que cambiarlo nunca manualmente
    yearSpan.textContent = new Date().getFullYear();
}