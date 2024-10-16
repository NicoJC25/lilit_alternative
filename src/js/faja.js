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
