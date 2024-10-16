
/*------------------------------ Funcion para color sostenido en navegacion ---------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('a');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a'); // Enlaces dentro del dropdown
    const dropdownParentLink = document.querySelector('.dropdown > a'); // Enlace padre (Post Operatorios)

    // Revisa si hay un enlace previamente seleccionado en el localStorage y lo marca como activo
    const activeLink = localStorage.getItem('activeLink');
    if (activeLink) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === activeLink) {
                link.classList.add('active');
            }
        });

        // Si el enlace activo es uno dentro del dropdown, marcar también al enlace padre
        dropdownLinks.forEach(dropdownLink => {
            if (dropdownLink.getAttribute('href') === activeLink) {
                dropdownParentLink.classList.add('active');
            }
        });
    }

    // Agrega un event listener para cada enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Guarda el href del enlace en localStorage
            localStorage.setItem('activeLink', this.getAttribute('href'));

            // Remueve la clase 'active' de todos los enlaces
            navLinks.forEach(link => link.classList.remove('active'));

            // Si se selecciona un enlace dentro del dropdown, marcar el padre
            if (this.closest('.dropdown-menu')) {
                dropdownParentLink.classList.add('active');
            } else {
                // Si se selecciona otro enlace, remover la clase active del padre
                dropdownParentLink.classList.remove('active');
            }

            // Agrega la clase 'active' al enlace seleccionado
            this.classList.add('active');
        });
    });
});


/*------------------------------ Funcion para dropdown de navegacion en movil ---------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');
    const isMobileView = window.matchMedia("(max-width: 1200px)").matches; // Chequea si es móvil o tablet

    dropdowns.forEach(dropdown => {
        if (isMobileView) {
            dropdown.addEventListener('click', function (event) {
                event.stopPropagation(); 
                this.classList.toggle('open');
                const menu = this.querySelector('.dropdown-menu');
                if (menu.style.display === "block") {
                    menu.style.display = "none";
                } else {
                    menu.style.display = "block";
                }
            });
        }
    });

    // Cerrar dropdowns si se hace clic fuera de ellos
    document.addEventListener('click', function (event) {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!dropdown.contains(event.target) && menu) {
                menu.style.display = "none";
                dropdown.classList.remove('open');
            }
        });
    });
});


/*----------------------- Funcion para cambio de imagen con tamaño y color en fajas ------------------------*/

document.addEventListener('DOMContentLoaded', function () {
    const fajaSections = document.querySelectorAll('.segunda_columna-faja');

    fajaSections.forEach(fajaSection => {
        const colorElements = fajaSection.previousElementSibling.querySelectorAll('.color');
        const fajaImageBox = fajaSection.querySelector('.img-1');
        const fajaImageSecundariaBox = fajaSection.querySelector('.img-2');
        const fajaImageTerciariaBox = fajaSection.querySelector('.img-3');

        let selectedColor = 'negro'; 
        const currentCategory = window.location.pathname.split('/').pop().split('.')[0];

        function updateImage() {
            const subcategoryClass = fajaSection.querySelector('.imagenes-faja').classList[1];

            const imageUrlPrincipal = `../../../src/img/fajas/${currentCategory}/${subcategoryClass}/faja_${selectedColor}.png`;
            const imageUrlSecundaria = `../../../src/img/fajas/${currentCategory}/${subcategoryClass}/faja_secundaria_${selectedColor}.png`;
            const imageUrlTerciaria = `../../../src/img/fajas/${currentCategory}/${subcategoryClass}/faja_terciaria_${selectedColor}.png`;

            // Crear imagen principal
            setImage(fajaImageBox, imageUrlPrincipal);
            // Crear imagen secundaria
            setImage(fajaImageSecundariaBox, imageUrlSecundaria);
            // Crear imagen terciaria
            setImage(fajaImageTerciariaBox, imageUrlTerciaria);
        }

        function setImage(imageElement, imageUrl) {
            // Limpiar el contenido previo
            imageElement.style.backgroundImage = `url(${imageUrl})`;
            imageElement.textContent = ''; // Quitar texto si existe

            const img = new Image();
            img.src = imageUrl;

            // Si la imagen carga correctamente
            img.onload = function() {
                imageElement.style.backgroundImage = `url(${imageUrl})`;
            };

            // Si la imagen falla al cargar
            img.onerror = function() {
                imageElement.style.backgroundImage = 'none';
                const message = document.createElement('p');
                message.textContent = 'Color no disponible';
                imageElement.appendChild(message);
            };
        }

        // Detectar selección de color y actualizar las imágenes en la sección correspondiente
        colorElements.forEach(color => {
            color.addEventListener('click', function () {
                colorElements.forEach(el => el.classList.remove('selected'));
                this.classList.add('selected');
                selectedColor = this.getAttribute('data-color');
                updateImage();
            });
        });

        // Inicializar las imágenes por defecto al cargar la página
        updateImage();
    });
});



/* Slider */

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
