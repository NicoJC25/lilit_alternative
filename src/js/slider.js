/*-------------------------------------------------- Slider --------------------------------------------------*/

let currentIndex = 0;
const slides = document.querySelector('.carrusel');
const totalSlides = document.querySelectorAll('.slider-section').length;

function showNextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    // Asegurarse de que se desplace por el 100% de cada imagen (ancho total de la pantalla)
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
}

setInterval(showNextSlide, 3000); // Cambiar cada 3 segundos
