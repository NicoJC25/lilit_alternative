
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
    const colorElements = document.querySelectorAll('.color');
    const tallaElements = document.querySelectorAll('.talla');
    const fajaImageBox = document.querySelector('.imagen-faja'); // Selecciona la caja principal
    const fajaImageSecundariaBox = document.querySelector('.imagen-secundaria-faja'); // Selecciona la caja secundaria

    let selectedColor = 'negro'; // Color por defecto
    let selectedTalla = 'S'; // Talla por defecto

    // Función para actualizar las imágenes como background-image
    function updateImage() {
        // Imagen principal
        const imageUrlPrincipal = `../../../src/img/faja_${selectedColor}_${selectedTalla}.png`;
        fajaImageBox.style.backgroundImage = `url(${imageUrlPrincipal})`; // Cambia el fondo de la caja principal

        // Imagen secundaria
        const imageUrlSecundaria = `../../../src/img/faja_secundaria_${selectedColor}_${selectedTalla}.png`; // Sufijo "secundaria"
        fajaImageSecundariaBox.style.backgroundImage = `url(${imageUrlSecundaria})`; // Cambia el fondo de la caja secundaria
    }

    // Llamar a updateImage() inmediatamente para mostrar una imagen por defecto al cargar la página
    updateImage(); // Imagen por defecto al cargar la página

    // Detectar selección de color
    colorElements.forEach(color => {
        color.addEventListener('click', function () {
            colorElements.forEach(el => el.classList.remove('selected')); // Remueve la selección previa
            this.classList.add('selected'); // Marca como seleccionado
            selectedColor = this.getAttribute('data-color'); // Obtener el color seleccionado
            updateImage(); // Actualizar las imágenes
        });
    });

    // Detectar selección de talla
    tallaElements.forEach(talla => {
        talla.addEventListener('click', function () {
            tallaElements.forEach(el => el.classList.remove('selected')); // Remueve la selección previa
            this.classList.add('selected'); // Marca como seleccionado
            selectedTalla = this.getAttribute('data-talla'); // Obtener la talla seleccionada
            updateImage(); // Actualizar las imágenes
        });
    });
});
