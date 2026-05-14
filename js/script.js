console.log("Portafolio activo");

// Inicializar AOS
AOS.init({
    duration: 1000, // Duración de la animación en milisegundos
    once: true // Animar solo una vez al hacer scroll
});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.style.background =
        "rgba(0,0,0,0.95)";

    } else {

        navbar.style.background =
        "rgba(0,0,0,0.7)";
    }
});